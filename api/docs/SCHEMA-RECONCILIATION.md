# Schema reconciliation

**Purpose:** Service Agreement §2.6 makes the Client responsible for supplying the database schema, and the Service Provider responsible for reviewing, validating and refining it. This document is the record of that review.

**Status: NOT STARTED — the Client's schema has not been received.**

---

## Why this document exists

Three clauses put the schema on the critical path:

| Clause        | Text                                                                                                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| §2.6          | "The Client shall provide the database schema for the platform. The Service Provider shall review, validate, and — where needed — refine this schema in consultation with the Client **before implementation**." |
| §3 (CRITICAL) | "Development will commence… **only after** the Client provides the complete DB schema, page-by-page website/functional details, existing content, and any design references."                                    |
| §9.1          | "Provide the complete database (DB) schema for the platform **before backend development begins**."                                                                                                              |

`prisma/schema.prisma` was therefore written as a **reference model**, not as the final implementation. It is derived entirely from what the Agreement itself specifies:

- §2.1 — the five-role access model
- §2.2 — the nine Admin Panel feature areas
- §2.3 — Tester Portal capabilities
- §2.4 — Customer Portal capabilities
- §2.8 — migration from the existing MySQL database

### Commercial note

Rework caused by a late or divergent schema is **not** a Change Order under §6 — §6 covers _added features_, not _redone work_. Time lost to reconciliation is unbilled. Request the schema in writing and keep the reply; §3.2 makes any resulting delay extend the timeline and the payment milestones.

---

## How to run the reconciliation

1. Obtain the Client's schema (DDL, ERD, or a MySQL dump).
2. If it is a live MySQL database, introspect it rather than reading it by eye:
   ```bash
   # temporary scratch schema — do not commit
   npx prisma db pull --schema=prisma/legacy.prisma
   ```
3. Work through the table below, one row per entity.
4. Anything the Client requires that is **not** modelled here is a §6 scope conversation _before_ it gets built.
5. Get written sign-off on the merged schema before running the first production migration.

---

## Reconciliation table

Fill in as you go. `Ours` = this repository. `Theirs` = the Client's schema.

| Area                   | Ours                                     | Theirs | Decision | Effort | Done |
| ---------------------- | ---------------------------------------- | ------ | -------- | ------ | ---- |
| Users / accounts       | `users` + `Role` enum (5 roles)          |        |          |        | ☐    |
| Sessions               | `refresh_tokens` (rotating, hashed)      |        |          |        | ☐    |
| Password reset         | `password_reset_tokens`                  |        |          |        | ☐    |
| Email verification     | `email_verification_tokens`              |        |          |        | ☐    |
| Sub-Admin permissions  | `permissions` + `user_permissions`       |        |          |        | ☐    |
| Customer organisations | `organisations` + `organisation_members` |        |          |        | ☐    |
| Tester profiles        | `tester_profiles`                        |        |          |        | ☐    |
| Tester devices         | `tester_devices`                         |        |          |        | ☐    |
| Tester skills          | `skills` + `tester_skills`               |        |          |        | ☐    |
| Tester languages       | `tester_languages`                       |        |          |        | ☐    |
| Projects               | `projects`                               |        |          |        | ☐    |
| Project materials      | `project_materials`                      |        |          |        | ☐    |
| Tester assignments     | `project_assignments`                    |        |          |        | ☐    |
| Manager assignments    | `manager_assignments`                    |        |          |        | ☐    |
| Bugs                   | `bugs`                                   |        |          |        | ☐    |
| Bug attachments        | `bug_attachments`                        |        |          |        | ☐    |
| Bug comments           | `bug_comments`                           |        |          |        | ☐    |
| Bug status history     | `bug_status_history`                     |        |          |        | ☐    |
| Communication threads  | `threads` + `thread_participants`        |        |          |        | ☐    |
| Messages               | `messages` + `message_attachments`       |        |          |        | ☐    |
| Announcements          | `announcements`                          |        |          |        | ☐    |
| Ratings & reviews      | `ratings`                                |        |          |        | ☐    |
| Transactions           | `transactions`                           |        |          |        | ☐    |
| Notifications          | `notifications`                          |        |          |        | ☐    |
| Files                  | `file_objects`                           |        |          |        | ☐    |
| Audit trail            | `audit_logs`                             |        |          |        | ☐    |

---

## Design decisions to raise with the Client

Each of these is a judgement call made in the absence of the Client's schema. Confirm or overturn them explicitly — they are cheap to change now and expensive later.

### 1. `USER` is a role, not a separate table

§2.1 describes `USER` as "a general registered visitor… who has not yet been onboarded as a Customer or Tester". Modelled as a value of `Role` on `users`, so promotion to `CUSTOMER` or `TESTER` is a field update rather than a row migration.
**Confirm:** does the Client's model use a separate table per role?

### 2. Sub-Admin permissions are per-user grants, not named preset roles

§2.2 says "a configurable, restricted subset of Admin permissions". Implemented as `user_permissions` rows against a `permissions` catalogue.
**Confirm:** does the Client expect reusable permission _templates_ ("Support Manager", "Finance Manager") rather than per-person configuration? That is a small addition now and an awkward retrofit later.

### 3. Customers belong to organisations, many-to-many

§2.2 lists "Organisation Management" separately from user management, so an organisation is its own entity and a Customer user is a member of it with an `OWNER`/`MEMBER` role.
**Confirm:** or is one Customer account simply _equal to_ one organisation?

### 4. Money is stored as `BigInt` minor units

`amount_minor` in paise. `150000` = ₹1,500.00. Never a float.
**Confirm:** the currency set. Currently defaults to INR with a `currency` column present.

### 5. Transactions are records, not gateway operations

§5 excludes payment-gateway integration. Nothing in this codebase moves money.
**Confirm:** the Client understands transactions are Admin-entered bookkeeping until a gateway is scoped under §6. This is the single most likely expectation mismatch in the whole build.

### 6. Testers cannot see each other's bug reports

§2.3 says a Tester can "track the status of bugs **they have raised**". Implemented literally.
**Confirm:** should testers see a shared known-issues list on a project? It reduces duplicate reports but exposes other testers' findings.

### 7. Deletes are soft

`deleted_at` on users, organisations, projects and bugs. Rows stay for audit and referential integrity.
**Confirm:** any hard-delete requirement for data-protection compliance.

### 8. Reference numbers use Postgres sequences

`C4T-2026-0142`, `BUG-2026-00417`, `TXN-2026-00318`, generated from a per-entity per-year sequence rather than `count() + 1`, which races.
**Confirm:** the Client's preferred format, and whether legacy references must be preserved during migration.

### 9. Legacy id columns exist for §2.8

Every migratable entity has a nullable, unique `legacy_id`. Populate it during migration so old rows stay traceable and the migration can be re-run safely.
**Confirm:** the id type in the legacy MySQL database (integer autoincrement is assumed).

---

## Known implementation gaps flagged from code

| Location                                         | Issue                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `uploads.routes.ts` → `GET /:id/download-url`    | Any authenticated user holding a file id can mint a download URL. Ids are unguessable cuids and are only exposed through role-scoped endpoints, so this is acceptable for launch — but if stricter control is required, resolve the owning bug or message and reuse its visibility filter. |
| `testers.service.ts` → `refreshTesterAggregates` | Runs synchronously after every bug and rating write. Fine at current scale; move to a background job if the tester pool grows large.                                                                                                                                                       |
| Soft deletes                                     | Enforced by every query remembering `deletedAt: null`. A Prisma client extension would make this global and remove the footgun.                                                                                                                                                            |
