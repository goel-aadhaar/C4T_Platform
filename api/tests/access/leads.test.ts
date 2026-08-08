import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { LeadStatus } from '@prisma/client'
import { prisma } from '../../src/lib/prisma.js'
import { resetDatabase, seedWorld, type World } from '../helpers/fixtures.js'
import { Client, testApp } from '../helpers/client.js'

/**
 * `POST /v1/leads` — the only unauthenticated write on the API.
 *
 * The tests that matter here are not "does it insert a row". They are the
 * properties that stop a public write endpoint being a liability:
 *
 *   - it accepts a stranger, and ONLY for creating;
 *   - reading leads requires authentication AND the permission;
 *   - a tester or customer cannot read the sales pipeline;
 *   - the honeypot files a bot as SPAM and tells it nothing;
 *   - spam does not appear in the default admin list;
 *   - oversized input is rejected at the boundary, not by the database.
 *
 * Rate limiting is deliberately NOT asserted. `leadLimiter` counts per IP across
 * the process, so a test that exhausts it makes every later test in the file
 * flaky depending on execution order. It is verified by inspection of
 * middleware/rateLimit.ts; a test would cost more than it protects.
 */

let world: World
let admin: Client
let customerA: Client
let testerActive: Client

beforeAll(async () => {
  await resetDatabase()
  world = await seedWorld()
  ;[admin, customerA, testerActive] = await Promise.all([
    Client.signIn(world.admin.email),
    Client.signIn(world.customerA.email),
    Client.signIn(world.testerActive.email),
  ])
}, 60_000)

afterAll(async () => {
  await prisma.$disconnect()
})

const validLead = {
  firstName: 'Ranganadh',
  lastName: 'Damera',
  email: 'Ranganadh@Example.COM',
  company: 'Example Ltd',
  teamSize: '51–500',
  message: 'We ship an LLM assistant and need help testing it.',
  marketingConsent: true,
  sourcePath: '/contact',
}

describe('POST /v1/leads — public submission', () => {
  it('accepts an unauthenticated submission', async () => {
    const res = await supertest(testApp()).post('/v1/leads').send(validLead)

    expect(res.status).toBe(201)
    expect(res.body.data.id).toBeTruthy()
    // The submitter is told nothing about what was stored.
    expect(Object.keys(res.body.data).sort()).toEqual(['createdAt', 'id'])

    const stored = await prisma.lead.findUnique({ where: { id: res.body.data.id as string } })
    expect(stored?.status).toBe(LeadStatus.NEW)
    expect(stored?.company).toBe('Example Ltd')
    // Lower-cased on write, so duplicate detection is not case-sensitive.
    expect(stored?.email).toBe('ranganadh@example.com')
    expect(stored?.marketingConsent).toBe(true)
  })

  it('files a honeypot hit as SPAM and responds exactly as it does to a human', async () => {
    const human = await supertest(testApp())
      .post('/v1/leads')
      .send({ ...validLead, email: 'human@example.com' })
    const bot = await supertest(testApp())
      .post('/v1/leads')
      .send({ ...validLead, email: 'bot@example.com', honeypot: 'gotcha' })

    // Identical status and identical response shape — a bot learns nothing.
    expect(bot.status).toBe(human.status)
    expect(Object.keys(bot.body.data).sort()).toEqual(Object.keys(human.body.data).sort())

    const stored = await prisma.lead.findUnique({ where: { id: bot.body.data.id as string } })
    expect(stored?.status).toBe(LeadStatus.SPAM)
  })

  it('rejects a malformed email and an oversized message at the boundary', async () => {
    const badEmail = await supertest(testApp())
      .post('/v1/leads')
      .send({ ...validLead, email: 'not-an-email' })
    expect(badEmail.status).toBe(400)

    const hugeMessage = await supertest(testApp())
      .post('/v1/leads')
      .send({ ...validLead, email: 'huge@example.com', message: 'x'.repeat(4001) })
    expect(hugeMessage.status).toBe(400)

    // Neither reached the database.
    expect(await prisma.lead.count({ where: { email: 'huge@example.com' } })).toBe(0)
  })

  it('requires the fields a salesperson needs to make contact', async () => {
    for (const missing of ['firstName', 'lastName', 'email', 'company']) {
      const body: Record<string, unknown> = { ...validLead, email: `m-${missing}@example.com` }
      delete body[missing]
      const res = await supertest(testApp()).post('/v1/leads').send(body)
      expect(res.status, `missing ${missing} should be rejected`).toBe(400)
    }
  })
})

describe('GET /v1/leads — admin only', () => {
  it('refuses an unauthenticated read', async () => {
    const res = await supertest(testApp()).get('/v1/leads')
    expect(res.status).toBe(401)
  })

  it('refuses a customer and a tester', async () => {
    // The pipeline names other prospects. A customer reading it would be a data
    // leak between clients; a tester has no business case for it at all.
    for (const client of [customerA, testerActive]) {
      const res = await supertest(testApp())
        .get('/v1/leads')
        .set('authorization', `Bearer ${client.token}`)
      expect([401, 403]).toContain(res.status)
    }
  })

  it('lets an admin read, and hides spam by default', async () => {
    const res = await supertest(testApp())
      .get('/v1/leads')
      .set('authorization', `Bearer ${admin.token}`)

    expect(res.status).toBe(200)
    const emails = (res.body.data as { email: string; status: string }[]).map((l) => l.email)
    expect(emails).toContain('ranganadh@example.com')
    expect(emails).not.toContain('bot@example.com')

    // Spam is retained, just filtered — so the honeypot can be tuned later.
    const spam = await supertest(testApp())
      .get('/v1/leads?status=SPAM')
      .set('authorization', `Bearer ${admin.token}`)
    expect((spam.body.data as { email: string }[]).map((l) => l.email)).toContain('bot@example.com')
  })
})

describe('PATCH /v1/leads/:id — triage', () => {
  it('moves status and records who did it', async () => {
    const created = await supertest(testApp())
      .post('/v1/leads')
      .send({ ...validLead, email: 'triage@example.com' })
    const id = created.body.data.id as string

    const res = await supertest(testApp())
      .patch(`/v1/leads/${id}`)
      .set('authorization', `Bearer ${admin.token}`)
      .send({ status: LeadStatus.QUALIFIED, notes: 'Scoping call booked.' })

    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe(LeadStatus.QUALIFIED)

    const audit = await prisma.auditLog.findFirst({
      where: { entityType: 'Lead', entityId: id, action: 'lead.updated' },
    })
    expect(audit, 'a status change must be attributable').toBeTruthy()
    expect(audit?.actorId).toBe(admin.userId)
  })

  it('refuses a customer', async () => {
    const created = await supertest(testApp())
      .post('/v1/leads')
      .send({ ...validLead, email: 'nope@example.com' })

    const res = await supertest(testApp())
      .patch(`/v1/leads/${created.body.data.id as string}`)
      .set('authorization', `Bearer ${customerA.token}`)
      .send({ status: LeadStatus.WON })

    expect([401, 403]).toContain(res.status)
  })

  it('404s an unknown id rather than leaking existence', async () => {
    const res = await supertest(testApp())
      .patch('/v1/leads/clzzzzzzzzzzzzzzzzzzzzzzz')
      .set('authorization', `Bearer ${admin.token}`)
      .send({ status: LeadStatus.LOST })

    expect(res.status).toBe(404)
  })
})
