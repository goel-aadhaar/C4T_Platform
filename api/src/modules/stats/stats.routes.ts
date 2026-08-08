import { Router } from 'express'
import {
  ProjectStatus,
  BugStatus,
  BugSeverity,
  TesterStatus,
  OrganisationStatus,
  Role,
  TransactionType,
  TransactionStatus,
} from '@prisma/client'
import { prisma } from '../../lib/prisma.js'
import { authenticate } from '../../middleware/authenticate.js'
import { requirePermission, isAdminSide } from '../../middleware/authorize.js'
import { PERMISSIONS } from '../../config/permissions.js'
import { visibilityFilter } from '../projects/projects.service.js'

/**
 * §2.2 — the centralised Admin dashboard summary, plus lighter per-role
 * dashboards for the Customer and Tester portals.
 */
export const statsRouter = Router()

statsRouter.use(authenticate)

statsRouter.get('/admin', requirePermission(PERMISSIONS.STATS_READ), async (_req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [
    projectsByStatus,
    bugsByStatus,
    bugsBySeverity,
    testersByStatus,
    orgsByStatus,
    usersByRole,
    openCritical,
    newBugs30d,
    newProjects30d,
    revenue,
    payouts,
  ] = await Promise.all([
    prisma.project.groupBy({ by: ['status'], where: { deletedAt: null }, _count: true }),
    prisma.bug.groupBy({ by: ['status'], where: { deletedAt: null }, _count: true }),
    prisma.bug.groupBy({ by: ['severity'], where: { deletedAt: null }, _count: true }),
    prisma.testerProfile.groupBy({ by: ['status'], _count: true }),
    prisma.organisation.groupBy({ by: ['status'], where: { deletedAt: null }, _count: true }),
    prisma.user.groupBy({ by: ['role'], where: { deletedAt: null }, _count: true }),
    prisma.bug.count({
      where: {
        deletedAt: null,
        severity: BugSeverity.CRITICAL,
        status: { in: [BugStatus.NEW, BugStatus.TRIAGED, BugStatus.CONFIRMED, BugStatus.REOPENED] },
      },
    }),
    prisma.bug.count({ where: { deletedAt: null, createdAt: { gte: thirtyDaysAgo } } }),
    prisma.project.count({ where: { deletedAt: null, createdAt: { gte: thirtyDaysAgo } } }),
    prisma.transaction.aggregate({
      where: { type: TransactionType.CUSTOMER_PAYMENT, status: TransactionStatus.PAID },
      _sum: { amountMinor: true },
    }),
    prisma.transaction.aggregate({
      where: { type: TransactionType.TESTER_PAYOUT, status: TransactionStatus.PAID },
      _sum: { amountMinor: true },
    }),
  ])

  const tally = <T extends string>(
    rows: ({ _count: number } & Record<string, unknown>)[],
    key: string,
    all: readonly T[],
  ): Record<T, number> => {
    const out = Object.fromEntries(all.map((k) => [k, 0])) as Record<T, number>
    for (const row of rows) out[row[key] as T] = row._count
    return out
  }

  res.json({
    data: {
      projects: {
        byStatus: tally(projectsByStatus, 'status', Object.values(ProjectStatus)),
        newLast30Days: newProjects30d,
      },
      bugs: {
        byStatus: tally(bugsByStatus, 'status', Object.values(BugStatus)),
        bySeverity: tally(bugsBySeverity, 'severity', Object.values(BugSeverity)),
        openCritical,
        newLast30Days: newBugs30d,
      },
      testers: { byStatus: tally(testersByStatus, 'status', Object.values(TesterStatus)) },
      organisations: { byStatus: tally(orgsByStatus, 'status', Object.values(OrganisationStatus)) },
      users: { byRole: tally(usersByRole, 'role', Object.values(Role)) },
      finance: {
        currency: 'INR',
        collectedMinor: (revenue._sum.amountMinor ?? 0n).toString(),
        paidOutMinor: (payouts._sum.amountMinor ?? 0n).toString(),
      },
    },
  })
})

/** §2.4 — the Customer portal summary, scoped to their organisations. */
statsRouter.get('/customer', async (req, res) => {
  if (isAdminSide(req.user!)) {
    res.json({ data: null, meta: { message: 'Use /stats/admin for the admin dashboard' } })
    return
  }

  const scope = visibilityFilter(req.user!)

  const [projectsByStatus, bugsByStatus, openCritical, activeTesters] = await Promise.all([
    prisma.project.groupBy({ by: ['status'], where: { deletedAt: null, ...scope }, _count: true }),
    prisma.bug.groupBy({
      by: ['status'],
      where: { deletedAt: null, project: { deletedAt: null, ...scope } },
      _count: true,
    }),
    prisma.bug.count({
      where: {
        deletedAt: null,
        project: { deletedAt: null, ...scope },
        severity: BugSeverity.CRITICAL,
        status: { in: [BugStatus.NEW, BugStatus.TRIAGED, BugStatus.CONFIRMED, BugStatus.REOPENED] },
      },
    }),
    prisma.projectAssignment.count({
      where: { status: 'ACTIVE', project: { deletedAt: null, ...scope } },
    }),
  ])

  res.json({
    data: {
      projects: Object.fromEntries(projectsByStatus.map((p) => [p.status, p._count])),
      bugs: Object.fromEntries(bugsByStatus.map((b) => [b.status, b._count])),
      openCriticalBugs: openCritical,
      activeTestersOnMyProjects: activeTesters,
    },
  })
})

/** §2.3 — the Tester portal summary. */
statsRouter.get('/tester', async (req, res) => {
  const userId = req.user!.id

  const [assignments, bugsByStatus, profile, earnings] = await Promise.all([
    prisma.projectAssignment.groupBy({ by: ['status'], where: { testerId: userId }, _count: true }),
    prisma.bug.groupBy({
      by: ['status'],
      where: { reportedById: userId, deletedAt: null },
      _count: true,
    }),
    prisma.testerProfile.findUnique({
      where: { userId },
      select: {
        status: true,
        ratingAverage: true,
        ratingCount: true,
        bugsReportedCount: true,
        bugsAcceptedCount: true,
        projectsCompletedCount: true,
      },
    }),
    prisma.transaction.aggregate({
      where: { counterpartyId: userId, type: TransactionType.TESTER_EARNING },
      _sum: { amountMinor: true },
    }),
  ])

  res.json({
    data: {
      assignments: Object.fromEntries(assignments.map((a) => [a.status, a._count])),
      bugs: Object.fromEntries(bugsByStatus.map((b) => [b.status, b._count])),
      profile,
      earnings: {
        currency: 'INR',
        totalMinor: (earnings._sum.amountMinor ?? 0n).toString(),
      },
    },
  })
})

/** §2.2 Platform — the audit trail. */
statsRouter.get('/audit', requirePermission(PERMISSIONS.AUDIT_READ), async (req, res) => {
  const page = Math.max(1, Number(req.query.page ?? 1))
  const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 50)))

  const where = {
    ...(typeof req.query.entityType === 'string' ? { entityType: req.query.entityType } : {}),
    ...(typeof req.query.entityId === 'string' ? { entityId: req.query.entityId } : {}),
    ...(typeof req.query.actorId === 'string' ? { actorId: req.query.actorId } : {}),
  }

  const [items, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      select: {
        id: true,
        action: true,
        entityType: true,
        entityId: true,
        before: true,
        after: true,
        ipAddress: true,
        createdAt: true,
        actor: { select: { id: true, firstName: true, lastName: true, email: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ])

  res.json({
    data: items,
    meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
  })
})
