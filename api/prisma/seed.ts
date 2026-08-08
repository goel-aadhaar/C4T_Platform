import {
  PrismaClient,
  Role,
  UserStatus,
  TesterStatus,
  OrganisationStatus,
  OrgMemberRole,
  DeviceType,
} from '@prisma/client'
import argon2 from 'argon2'
import { PERMISSION_CATALOGUE, DEFAULT_SUBADMIN_PERMISSIONS } from '../src/config/permissions.js'

const prisma = new PrismaClient()

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@crowd4test.com'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe!2026'
const SEED_DEMO = process.env.NODE_ENV !== 'production'

function hash(plain: string) {
  return argon2.hash(plain, {
    type: argon2.argon2id,
    memoryCost: 19_456,
    timeCost: 2,
    parallelism: 1,
  })
}

/**
 * Idempotent seed. Safe to re-run.
 *
 *   Always:      the permission catalogue and one bootstrap ADMIN.
 *   Non-prod:    a small demo dataset so the Admin panel has something to show.
 */
async function main() {
  console.log('Seeding permission catalogue…')
  for (const permission of PERMISSION_CATALOGUE) {
    await prisma.permission.upsert({
      where: { code: permission.code },
      create: permission,
      update: {
        group: permission.group,
        label: permission.label,
        description: permission.description,
      },
    })
  }
  console.log(`  ${PERMISSION_CATALOGUE.length} permissions ready`)

  console.log('Seeding bootstrap administrator…')
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      passwordHash: await hash(ADMIN_PASSWORD),
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: new Date(),
      firstName: 'Platform',
      lastName: 'Administrator',
      countryCode: 'IN',
    },
    update: {},
    select: { id: true, email: true },
  })
  console.log(`  admin: ${admin.email}`)

  if (!SEED_DEMO) {
    console.log('NODE_ENV=production — skipping demo data.')
    return
  }

  console.log('Seeding demo data…')

  // ─── Sub-Admin with a restricted grant set ─────────────────────────────────
  const subAdmin = await prisma.user.upsert({
    where: { email: 'manager@crowd4test.com' },
    create: {
      email: 'manager@crowd4test.com',
      passwordHash: await hash('ChangeMe!2026'),
      role: Role.SUB_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: new Date(),
      firstName: 'Priya',
      lastName: 'Menon',
      countryCode: 'IN',
    },
    update: {},
    select: { id: true },
  })

  const grantable = await prisma.permission.findMany({
    where: { code: { in: DEFAULT_SUBADMIN_PERMISSIONS } },
    select: { id: true },
  })
  for (const permission of grantable) {
    await prisma.userPermission.upsert({
      where: { userId_permissionId: { userId: subAdmin.id, permissionId: permission.id } },
      create: { userId: subAdmin.id, permissionId: permission.id, grantedById: admin.id },
      update: {},
    })
  }

  // ─── Customer organisation and owner ───────────────────────────────────────
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    create: {
      email: 'customer@example.com',
      passwordHash: await hash('ChangeMe!2026'),
      role: Role.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: new Date(),
      firstName: 'Arjun',
      lastName: 'Rao',
      countryCode: 'IN',
    },
    update: {},
    select: { id: true },
  })

  const org = await prisma.organisation.upsert({
    where: { slug: 'northwind-fintech' },
    create: {
      name: 'Northwind Fintech',
      slug: 'northwind-fintech',
      status: OrganisationStatus.ACTIVE,
      industry: 'Banking & Finance',
      contactEmail: 'customer@example.com',
      countryCode: 'IN',
      city: 'Bengaluru',
      onboardedAt: new Date(),
    },
    update: {},
    select: { id: true },
  })

  await prisma.organisationMember.upsert({
    where: { organisationId_userId: { organisationId: org.id, userId: customer.id } },
    create: {
      organisationId: org.id,
      userId: customer.id,
      orgRole: OrgMemberRole.OWNER,
      joinedAt: new Date(),
    },
    update: {},
  })

  // ─── Skills catalogue ──────────────────────────────────────────────────────
  const skillNames = [
    'Manual Testing',
    'Automation Testing',
    'Security Testing',
    'Localization Testing',
    'Payment Testing',
    'API Testing',
    'Accessibility Testing',
    'Performance Testing',
  ]
  const skills = await Promise.all(
    skillNames.map((name) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      return prisma.skill.upsert({
        where: { slug },
        create: { name, slug },
        update: {},
        select: { id: true, slug: true },
      })
    }),
  )

  // ─── Verified testers ──────────────────────────────────────────────────────
  const testerSeeds = [
    {
      email: 'tester1@example.com',
      firstName: 'Hrvoje',
      lastName: 'Nikolic',
      country: 'HR',
      device: 'Pixel 7a',
    },
    {
      email: 'tester2@example.com',
      firstName: 'Minerva',
      lastName: 'Cisneros',
      country: 'MX',
      device: 'iPhone 13',
    },
    {
      email: 'tester3@example.com',
      firstName: 'Shubham',
      lastName: 'Kumar',
      country: 'IN',
      device: 'Redmi Note 12',
    },
  ]

  for (const [index, seed] of testerSeeds.entries()) {
    const user = await prisma.user.upsert({
      where: { email: seed.email },
      create: {
        email: seed.email,
        passwordHash: await hash('ChangeMe!2026'),
        role: Role.TESTER,
        status: UserStatus.ACTIVE,
        emailVerifiedAt: new Date(),
        firstName: seed.firstName,
        lastName: seed.lastName,
        countryCode: seed.country,
      },
      update: {},
      select: { id: true },
    })

    const profile = await prisma.testerProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        status: TesterStatus.VERIFIED,
        headline: index === 0 ? 'Localization Tester' : 'QA Engineer',
        experienceYears: 3 + index,
        countryCode: seed.country,
        verifiedAt: new Date(),
        verifiedById: admin.id,
        ndaAcceptedAt: new Date(),
      },
      update: {},
      select: { id: true },
    })

    const existingDevice = await prisma.testerDevice.findFirst({
      where: { testerProfileId: profile.id, model: seed.device },
      select: { id: true },
    })
    if (!existingDevice) {
      await prisma.testerDevice.create({
        data: {
          testerProfileId: profile.id,
          type: DeviceType.MOBILE,
          model: seed.device,
          osName: seed.device.startsWith('iPhone') ? 'iOS' : 'Android',
          isPrimary: true,
        },
      })
    }

    for (const skill of skills.slice(0, 3)) {
      await prisma.testerSkill.upsert({
        where: { testerProfileId_skillId: { testerProfileId: profile.id, skillId: skill.id } },
        create: { testerProfileId: profile.id, skillId: skill.id },
        update: {},
      })
    }

    await prisma.testerLanguage.upsert({
      where: { testerProfileId_code: { testerProfileId: profile.id, code: 'en' } },
      create: { testerProfileId: profile.id, code: 'en', proficiency: 'FLUENT' },
      update: {},
    })
  }

  // ─── A demo project ────────────────────────────────────────────────────────
  const existingProject = await prisma.project.findFirst({
    where: { organisationId: org.id },
    select: { id: true },
  })

  if (!existingProject) {
    await prisma.$executeRawUnsafe(
      `CREATE SEQUENCE IF NOT EXISTS "ref_project_${new Date().getUTCFullYear()}" START 1`,
    )
    await prisma.project.create({
      data: {
        reference: `C4T-${new Date().getUTCFullYear()}-0001`,
        organisationId: org.id,
        createdById: customer.id,
        title: 'Mobile wallet — UPI checkout regression',
        summary: 'Full regression across UPI, card and net-banking checkout on Android and iOS.',
        instructions:
          'Focus on the UPI collect flow and the 3DS step-up. Report anything that blocks a payment from completing, and always attach a screen recording.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        platformTargets: ['android', 'ios'],
        targetCountries: ['IN', 'AE'],
        targetLanguages: ['en', 'hi'],
        startDate: new Date(),
        progressPercent: 35,
      },
    })
    console.log('  demo project created')
  }

  console.log('\nDemo accounts (password for all: ChangeMe!2026)')
  console.table([
    { role: 'ADMIN', email: ADMIN_EMAIL },
    { role: 'SUB_ADMIN', email: 'manager@crowd4test.com' },
    { role: 'CUSTOMER', email: 'customer@example.com' },
    { role: 'TESTER', email: 'tester1@example.com' },
  ])
  console.warn('\nChange these credentials before any deployment.')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error('Seed failed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
