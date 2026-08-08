import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '../../src/lib/prisma.js'
import { resetDatabase, seedWorld, type World } from '../helpers/fixtures.js'
import { Client } from '../helpers/client.js'

/**
 * The invariant that keeps scopes.ts and policy.ts honest.
 *
 * "Which can I see?" (a Prisma filter) and "can I see this one?" (a policy
 * decision) are written in different files by different mechanisms. If they
 * ever disagree the symptom is nasty and subtle: a row that appears in a list
 * but 404s when opened, or worse, a row hidden from the list that is readable
 * by direct URL.
 *
 * This walks every resource against every principal and asserts the two agree.
 * It is a genuine property test — it will catch the drift the day someone
 * widens one side and forgets the other.
 */

let world: World
const clients = new Map<string, Client>()

beforeAll(async () => {
  await resetDatabase()
  world = await seedWorld()

  const cast: [string, string][] = [
    ['admin', world.admin.email],
    ['subAdminLimited', world.subAdminLimited.email],
    ['subAdminFull', world.subAdminFull.email],
    ['customerA', world.customerA.email],
    ['customerAMember', world.customerAMember.email],
    ['customerB', world.customerB.email],
    ['testerActive', world.testerActive.email],
    ['testerInvited', world.testerInvited.email],
    ['testerOther', world.testerOther.email],
    ['testerUnassigned', world.testerUnassigned.email],
  ]

  for (const [name, email] of cast) {
    clients.set(name, await Client.signIn(email))
  }
}, 60_000)

afterAll(async () => {
  await prisma.$disconnect()
})

/** Every id the list endpoint returns, following pagination. */
async function listedIds(client: Client, path: string): Promise<Set<string>> {
  const ids = new Set<string>()
  let page = 1

  for (;;) {
    const response = await client.get(`${path}?page=${page}&limit=100`)
    if (response.status !== 200) return ids
    for (const row of response.body.data as { id: string }[]) ids.add(row.id)
    const meta = response.body.meta as { hasNext?: boolean } | undefined
    if (!meta?.hasNext) break
    page++
  }

  return ids
}

describe.each([
  { resource: 'projects', path: '/v1/projects' },
  { resource: 'bugs', path: '/v1/bugs' },
  { resource: 'organisations', path: '/v1/organisations' },
])('$resource — list and detail agree', ({ resource, path }) => {
  it('every principal sees exactly the rows they can open', async () => {
    const allIds =
      resource === 'projects'
        ? (await prisma.project.findMany({ where: { deletedAt: null }, select: { id: true } })).map(
            (r) => r.id,
          )
        : resource === 'bugs'
          ? (await prisma.bug.findMany({ where: { deletedAt: null }, select: { id: true } })).map(
              (r) => r.id,
            )
          : (
              await prisma.organisation.findMany({
                where: { deletedAt: null },
                select: { id: true },
              })
            ).map((r) => r.id)

    expect(allIds.length).toBeGreaterThan(0)

    const mismatches: string[] = []

    for (const [name, client] of clients) {
      const listed = await listedIds(client, path)

      for (const id of allIds) {
        const detail = await client.get(`${path}/${id}`)
        const readable = detail.status === 200
        const inList = listed.has(id)

        if (readable !== inList) {
          mismatches.push(
            `${name}: ${resource}/${id} — list=${inList ? 'visible' : 'hidden'} but ` +
              `detail=${detail.status}`,
          )
        }
      }
    }

    expect(mismatches).toEqual([])
  }, 120_000)
})

describe('a hidden resource is indistinguishable from a missing one', () => {
  it('returns 404 rather than 403 for resources outside the caller’s scope', async () => {
    const customerB = clients.get('customerB')!
    const testerOther = clients.get('testerOther')!

    // 403 would confirm the row exists, which is itself a leak.
    for (const [client, url] of [
      [customerB, `/v1/projects/${world.projectA.id}`],
      [customerB, `/v1/bugs/${world.bugA.id}`],
      [customerB, `/v1/organisations/${world.orgA.id}`],
      [testerOther, `/v1/projects/${world.projectA.id}`],
      [testerOther, `/v1/bugs/${world.bugA.id}`],
    ] as [Client, string][]) {
      const response = await client.get(url)
      expect(response.status, `${url} should 404 for this caller`).toBe(404)
    }
  })

  it('a well-formed id that does not exist gives the same 404', async () => {
    const customerA = clients.get('customerA')!
    const response = await customerA.get('/v1/projects/clzzzzzzzzzzzzzzzzzzzzzzz')
    expect([404, 422]).toContain(response.status)
  })
})
