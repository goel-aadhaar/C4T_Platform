import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '../../src/lib/prisma.js'
import { resetDatabase, seedWorld, type World } from '../helpers/fixtures.js'
import { Client, anon } from '../helpers/client.js'

/**
 * Relationship-based access control, end to end over HTTP.
 *
 * The assertions that matter most here are the NEGATIVE ones. It is easy to
 * write a system where the right people can do the right things; the bug that
 * ends an engagement is the one where a customer can read another customer's
 * defect reports.
 */

let world: World
let admin: Client
let subLimited: Client
let subFull: Client
let customerA: Client
let customerAMember: Client
let customerB: Client
let testerActive: Client
let testerInvited: Client
let testerOther: Client

beforeAll(async () => {
  await resetDatabase()
  world = await seedWorld()
  ;[
    admin,
    subLimited,
    subFull,
    customerA,
    customerAMember,
    customerB,
    testerActive,
    testerInvited,
    testerOther,
  ] = await Promise.all([
    Client.signIn(world.admin.email),
    Client.signIn(world.subAdminLimited.email),
    Client.signIn(world.subAdminFull.email),
    Client.signIn(world.customerA.email),
    Client.signIn(world.customerAMember.email),
    Client.signIn(world.customerB.email),
    Client.signIn(world.testerActive.email),
    Client.signIn(world.testerInvited.email),
    Client.signIn(world.testerOther.email),
  ])
}, 60_000)

afterAll(async () => {
  await prisma.$disconnect()
})

describe('authentication', () => {
  it('rejects an unauthenticated request', async () => {
    await anon().get('/v1/projects').expect(401)
  })

  it('rejects a garbage token', async () => {
    await anon().get('/v1/projects').set('authorization', 'Bearer not-a-token').expect(401)
  })
})

describe('project visibility', () => {
  it('an assigned tester can read the project they are on', async () => {
    const response = await testerActive.get(`/v1/projects/${world.projectA.id}`).expect(200)
    expect(response.body.data.title).toBe('Project A')
  })

  it('an active tester receives the confidential brief and materials', async () => {
    const response = await testerActive.get(`/v1/projects/${world.projectA.id}`).expect(200)
    expect(response.body.data.instructions).toBe('CONFIDENTIAL BRIEF A')
    expect(response.body.data.materials).toHaveLength(1)
    expect(response.body.data.capabilities.canReadBrief).toBe(true)
  })

  it('an INVITED tester sees the project but NOT the brief', async () => {
    const response = await testerInvited.get(`/v1/projects/${world.projectA.id}`).expect(200)
    expect(response.body.data.title).toBe('Project A')
    expect(response.body.data.instructions).toBeNull()
    expect(response.body.data.materials).toEqual([])
    expect(response.body.data.capabilities.canReadBrief).toBe(false)
  })

  it('a tester never sees the rest of the crowd', async () => {
    const response = await testerActive.get(`/v1/projects/${world.projectA.id}`).expect(200)
    const testerIds = response.body.data.assignments.map(
      (a: { tester: { id: string } }) => a.tester.id,
    )
    expect(testerIds).toEqual([world.testerActive.id])
    expect(response.body.data.assignments).toHaveLength(1)
  })

  it('an active tester DOES get named contacts to raise questions with', async () => {
    const response = await testerActive.get(`/v1/projects/${world.projectA.id}`).expect(200)
    const contacts = response.body.data.contacts as { id: string; kind: string; email?: string }[]
    expect(contacts.length).toBeGreaterThan(0)
    expect(contacts.some((c) => c.id === world.customerA.id)).toBe(true)
    // …but not their email addresses.
    expect(contacts.every((c) => c.email === undefined)).toBe(true)
  })

  it('the customer sees the full team and contact emails', async () => {
    const response = await customerA.get(`/v1/projects/${world.projectA.id}`).expect(200)
    expect(response.body.data.assignments).toHaveLength(2)
    const contacts = response.body.data.contacts as { email?: string }[]
    expect(contacts.some((c) => typeof c.email === 'string')).toBe(true)
  })

  it('a tester on another project cannot see this one — 404, not 403', async () => {
    await testerOther.get(`/v1/projects/${world.projectA.id}`).expect(404)
  })

  it("a customer cannot see another organisation's project", async () => {
    await customerB.get(`/v1/projects/${world.projectA.id}`).expect(404)
  })

  it('list endpoints agree with detail endpoints', async () => {
    const list = await testerOther.get('/v1/projects').expect(200)
    const ids = list.body.data.map((p: { id: string }) => p.id)
    expect(ids).not.toContain(world.projectA.id)
    expect(ids).toContain(world.projectB.id)
  })

  it('an admin sees every project', async () => {
    const response = await admin.get('/v1/projects').expect(200)
    const ids = response.body.data.map((p: { id: string }) => p.id)
    expect(ids).toContain(world.projectA.id)
    expect(ids).toContain(world.projectB.id)
  })
})

describe('bug visibility', () => {
  it('the reporting tester can read their own bug', async () => {
    const response = await testerActive.get(`/v1/bugs/${world.bugA.id}`).expect(200)
    expect(response.body.data.reference).toBe(world.bugA.reference)
  })

  it("the customer whose project it is can read the tester's bug", async () => {
    const response = await customerA.get(`/v1/bugs/${world.bugA.id}`).expect(200)
    expect(response.body.data.title).toBe('Checkout fails on UPI')
  })

  it('a non-owner member of the same organisation can also read it', async () => {
    await customerAMember.get(`/v1/bugs/${world.bugA.id}`).expect(200)
  })

  it('a different customer cannot read it', async () => {
    await customerB.get(`/v1/bugs/${world.bugA.id}`).expect(404)
  })

  it("a tester on another project cannot read another tester's bug", async () => {
    await testerOther.get(`/v1/bugs/${world.bugA.id}`).expect(404)
  })

  it('an invited-but-not-active tester on the same project cannot read it', async () => {
    await testerInvited.get(`/v1/bugs/${world.bugA.id}`).expect(404)
  })

  it('bug lists are scoped the same way as bug detail', async () => {
    const forCustomerB = await customerB.get('/v1/bugs').expect(200)
    expect(forCustomerB.body.data).toHaveLength(0)

    const forCustomerA = await customerA.get('/v1/bugs').expect(200)
    expect(forCustomerA.body.data.map((b: { id: string }) => b.id)).toContain(world.bugA.id)
  })
})

describe('internal comments', () => {
  it('are visible to admins but hidden from the customer and the reporter', async () => {
    await admin
      .post(`/v1/bugs/${world.bugA.id}/comments`, {
        body: 'INTERNAL: tester has a history of false positives',
        isInternal: true,
      })
      .expect(201)

    const asAdmin = await admin.get(`/v1/bugs/${world.bugA.id}`).expect(200)
    expect(asAdmin.body.data.comments.some((c: { isInternal: boolean }) => c.isInternal)).toBe(true)

    for (const client of [customerA, testerActive]) {
      const response = await client.get(`/v1/bugs/${world.bugA.id}`).expect(200)
      const bodies = response.body.data.comments.map((c: { body: string }) => c.body)
      expect(bodies.every((b: string) => !b.startsWith('INTERNAL:'))).toBe(true)
    }
  })

  it('a customer cannot post an internal comment', async () => {
    await customerA
      .post(`/v1/bugs/${world.bugA.id}/comments`, { body: 'sneaky', isInternal: true })
      .expect(403)
  })
})

describe('organisation isolation', () => {
  it("internal admin notes are hidden from the organisation's own owner", async () => {
    const response = await customerA.get(`/v1/organisations/${world.orgA.id}`).expect(200)
    expect(response.body.data.notes).toBeUndefined()
  })

  it('an admin sees the internal notes', async () => {
    const response = await admin.get(`/v1/organisations/${world.orgA.id}`).expect(200)
    expect(response.body.data.notes).toBe('INTERNAL ADMIN NOTE A')
  })

  it('a customer cannot read another organisation', async () => {
    await customerB.get(`/v1/organisations/${world.orgA.id}`).expect(404)
  })

  it('a tester cannot read a customer organisation at all', async () => {
    await testerActive.get(`/v1/organisations/${world.orgA.id}`).expect(404)
  })
})

describe('sub-admin permissions', () => {
  it('a sub-admin with only read permissions can list the tester pool', async () => {
    await subLimited.get('/v1/testers').expect(200)
  })

  it('but cannot verify a tester', async () => {
    const profile = await prisma.testerProfile.findFirstOrThrow({
      where: { userId: world.testerUnassigned.id },
      select: { id: true },
    })
    await subLimited.patch(`/v1/testers/${profile.id}/status`, { status: 'SUSPENDED' }).expect(403)
  })

  it('a fully-granted sub-admin can', async () => {
    const profile = await prisma.testerProfile.findFirstOrThrow({
      where: { userId: world.testerUnassigned.id },
      select: { id: true },
    })
    await subFull.patch(`/v1/testers/${profile.id}/status`, { status: 'SUSPENDED' }).expect(200)
  })

  it('a customer cannot reach the tester pool at all', async () => {
    await customerA.get('/v1/testers').expect(403)
  })
})

describe('privilege escalation', () => {
  it('a customer cannot create an admin account', async () => {
    await customerA
      .post('/v1/users', {
        email: 'evil@test.local',
        password: 'LongEnoughPassword1',
        role: 'ADMIN',
        firstName: 'Evil',
      })
      .expect(403)
  })

  it('self-registration cannot mint an ADMIN', async () => {
    await anon()
      .post('/v1/auth/register')
      .send({
        email: 'selfadmin@test.local',
        password: 'LongEnoughPassword1',
        firstName: 'Self',
        intendedRole: 'ADMIN',
        acceptedTerms: true,
      })
      .expect(422)
  })

  it('a tester cannot assign themselves to a project', async () => {
    await testerOther
      .post(`/v1/projects/${world.projectA.id}/assignments`, { testerIds: [world.testerOther.id] })
      .expect(403)
  })
})
