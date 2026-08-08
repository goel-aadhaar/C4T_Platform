# Crowd4Test Platform — API

Express.js + PostgreSQL REST API for the Crowd4Test platform rebuild.
Covers **Milestone 2 — Backend Core & Admin Panel** of the Service Agreement dated 5 August 2026.

---

## Status

| Item                                         | State                                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Database schema                              | **Reference model — pending reconciliation.** See [docs/SCHEMA-RECONCILIATION.md](docs/SCHEMA-RECONCILIATION.md) |
| Auth + RBAC (5 roles)                        | Implemented                                                                                                      |
| Admin panel APIs (§2.2, all 9 feature areas) | Implemented                                                                                                      |
| Tester portal APIs (§2.3)                    | Implemented                                                                                                      |
| Customer portal APIs (§2.4)                  | Implemented                                                                                                      |
| MySQL → PostgreSQL migration (§2.8)          | Scaffolded — needs the Client's dump. See [docs/MIGRATION.md](docs/MIGRATION.md)                                 |
| Typecheck / build                            | Passing                                                                                                          |
| Access control                               | Relationship-based (ReBAC), centralised in `src/lib/access/`                                                     |
| Automated tests                              | 58 integration tests over HTTP against a real Postgres — access matrix, bug lifecycle, list/detail invariant     |

> **Agreement §2.6 / §9.1** make the Client responsible for supplying the database schema _before_ backend development begins. It had not been supplied when this was built, so `prisma/schema.prisma` is a good-faith reference model derived from §2.1–§2.4. Diff it against the Client's schema and record the outcome before Milestone 2 is submitted for acceptance.

---

## Stack

| Concern    | Choice                                                         | Why                                                                                                                   |
| ---------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Runtime    | Node 20.9+                                                     | Minimum for the toolchain; matches a standard EC2 AMI                                                                 |
| Framework  | Express 5                                                      | Mandated by §2.7. v5 forwards async errors natively, so no `asyncHandler` wrapper                                     |
| Language   | TypeScript (strict)                                            | §14.1 requires industry-standard practice; strict mode catches contract drift between modules                         |
| Database   | PostgreSQL on **Neon**                                         | Serverless, branch-per-environment. Nothing runs locally                                                              |
| ORM        | Prisma 6                                                       | Typed client, first-class migrations, and `prisma db pull` can introspect the legacy MySQL database to help with §2.8 |
| Validation | Zod                                                            | One schema defines both runtime validation and the TypeScript type                                                    |
| Auth       | **RS256 JWT access tokens over stateful server-side sessions** | Asymmetric so the frontend can verify without being able to mint; stateful so revocation is immediate. See below      |
| Passwords  | Argon2id                                                       | OWASP-recommended parameters, hard-coded rather than env-tunable                                                      |
| Files      | S3 presigned PUT                                               | Bug videos never transit the EC2 box                                                                                  |
| Logging    | Pino                                                           | Structured JSON, ships straight to CloudWatch                                                                         |

---

## Quick start

```bash
cd api
cp .env.example .env
# Paste BOTH Neon connection strings into .env — see "Database" below.
# They are different endpoints and using the wrong one for migrations fails
# in a way that does not mention pooling.

npm install
npm run keys:generate         # paste JWT_PRIVATE_KEY / JWT_PUBLIC_KEY into .env
npm run prisma:generate
npm run prisma:deploy         # applies migrations via the DIRECT endpoint
npm run db:seed               # permission catalogue + admin + demo data
npm run dev                   # http://localhost:4000
```

Verify it is alive:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/health/ready          # also checks the database
curl http://localhost:4000/.well-known/jwks.json # public verification key
npm run auth:verify                              # offline token-layer checks
```

### Seeded accounts (development only)

| Role      | Email                    | Password        |
| --------- | ------------------------ | --------------- |
| ADMIN     | `admin@crowd4test.com`   | `ChangeMe!2026` |
| SUB_ADMIN | `manager@crowd4test.com` | `ChangeMe!2026` |
| CUSTOMER  | `customer@example.com`   | `ChangeMe!2026` |
| TESTER    | `tester1@example.com`    | `ChangeMe!2026` |

The seed refuses to create demo rows when `NODE_ENV=production`. Change the admin password before any deployment.

---

## Scripts

**Everyday**

| Command                 | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Watch-mode dev server                       |
| `npm run build`         | Compile to `dist/`                          |
| `npm start`             | Run the compiled build                      |
| `npm run prisma:studio` | Browser UI over the branch `.env` points at |

**Quality gate** — `npm run check` chains `format:check`, `lint` and `typecheck`. CI runs the same three commands, so a green local check means a green pipeline.

| Command                 | Purpose                          |
| ----------------------- | -------------------------------- |
| `npm run check`         | format:check + lint + typecheck  |
| `npm run format`        | Prettier, write                  |
| `npm run format:check`  | Prettier, verify only            |
| `npm run lint`          | ESLint                           |
| `npm run lint:fix`      | ESLint with `--fix`              |
| `npm run typecheck`     | `tsc --noEmit`                   |
| `npm test`              | Vitest                           |
| `npm run test:coverage` | Vitest with a V8 coverage report |

**Database**

| Command                   | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| `npm run prisma:migrate`  | Create and apply a migration (dev)         |
| `npm run prisma:deploy`   | Apply pending migrations (production)      |
| `npm run prisma:studio`   | Browse the database                        |
| `npm run prisma:format`   | Format `schema.prisma`                     |
| `npm run prisma:validate` | Validate the schema                        |
| `npm run db:seed`         | Seed permissions, admin and demo data      |
| `npm run db:reset`        | Drop, re-migrate and re-seed (destructive) |

**Auth**

| Command                 | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `npm run keys:generate` | Generate an RS256 key pair for `.env`                    |
| `npm run auth:verify`   | 19 offline checks on the token layer, no database needed |

---

## Code quality tooling

| Tool                       | Config                            | Owns                                                                                                                                     |
| -------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Prettier**               | `.prettierrc.json`                | All formatting. No style opinions live anywhere else                                                                                     |
| **ESLint 9** (flat config) | `eslint.config.js`                | Correctness and conventions only — `eslint-config-prettier` is loaded last and disables every rule Prettier owns, so the two never fight |
| **EditorConfig**           | `../.editorconfig`                | Baseline for editors not running Prettier                                                                                                |
| **Vitest**                 | `vitest.config.ts`                | Tests and coverage                                                                                                                       |
| **lint-staged**            | `package.json`                    | Pre-commit formatting and fixes                                                                                                          |
| **GitHub Actions**         | `../.github/workflows/api-ci.yml` | The enforcement point                                                                                                                    |

### Rules worth knowing about

Linting is **type-aware** (`projectService`), so these are real analyses rather than pattern matches:

- **`no-floating-promises`** is the highest-value rule in an async Express codebase — a dropped promise is a write that silently never happened. Where a promise is intentionally not awaited (the throttled session touch, notification fan-out), it is marked `void` so the intent is explicit and reviewable.
- **`no-misused-promises`** is configured with `checksVoidReturn.arguments: false`. Express 5 forwards rejected promises from handlers to the error middleware, so an async handler is correct here rather than a bug.
- **`no-console`** is an error in `src/`. Everything goes through Pino so it lands in CloudWatch as structured JSON. Scripts, the seed and boot code are exempt.
- **`no-process-exit`** is an error in request paths and allowed at boot.
- **`consistent-type-imports`** keeps type-only imports erased at compile time.

`.prettierignore` excludes `*.prisma` — Prisma has its own formatter and the two disagree about field alignment. Use `npm run prisma:format`.

### Pre-commit hooks

`lint-staged` is configured but no hook is installed, because the repository is not under git yet. Once it is:

```bash
npm install -D husky
npx husky init
echo 'cd api && npx lint-staged' > .husky/pre-commit
```

Hooks are a convenience — CI is the actual gate, and it cannot be bypassed with `--no-verify`.

### Line endings

`.gitattributes` forces LF on every text file. Development is on Windows and deployment is Linux on EC2; without this, CRLF reaches the server and shell scripts fail with an unhelpful `bad interpreter` error.

---

## Database — Neon

Nothing runs locally. Development, test and production are all Neon branches of
the same project.

> **⚠ Contractual note.** Service Agreement §2.7 specifies **AWS RDS
> (PostgreSQL)** for database hosting. Neon is a deviation from the agreed
> stack, and §18.2 requires stack changes to be recorded in writing and signed
> by both parties. Get the Client's written agreement before Milestone 3, or
> §10.3 gives them grounds to reject the deployment for not matching the
> specification. It also moves a §4 cost from AWS to Neon — worth confirming
> who is paying.
>
> Nothing in the code depends on the choice: Prisma speaks to both identically,
> so switching back to RDS means changing two connection strings.

### The two connection strings

Neon gives you a **pooled** and a **direct** endpoint for the same database, and
you need both:

| Variable              | Endpoint                | Used by                   |
| --------------------- | ----------------------- | ------------------------- |
| `DATABASE_URL`        | host contains `-pooler` | Every query the app makes |
| `DIRECT_DATABASE_URL` | same host, no `-pooler` | `prisma migrate` only     |

**Migrations must use the direct endpoint.** They take advisory locks and issue
DDL that PgBouncer in transaction-pooling mode cannot carry. Run them through the
pooler and they fail with what look like deadlocks or `prepared statement already
exists` — nothing in the error mentions pooling, which is why this costs people
an afternoon. `prisma/schema.prisma` wires `directUrl` so Prisma picks the right
one automatically.

Both URLs must end with `?sslmode=require`; Neon refuses plaintext.

### Setting up

```bash
cp .env.example .env         # paste both Neon URLs
npm run keys:generate        # paste the key pair
npm install
npm run prisma:generate
npm run prisma:deploy        # applies migrations via the direct endpoint
npm run db:seed
npm run dev
```

`npm run prisma:studio` gives a browser UI over whichever branch `.env` points at.

### Branches

Use a Neon branch per environment rather than a database per environment —
branches are copy-on-write, so a test branch costs nothing and can be reset
instantly.

| Branch       | Purpose                                   |
| ------------ | ----------------------------------------- |
| `main`       | Development                               |
| `test`       | The integration suite. **Gets truncated** |
| `production` | Live                                      |

### Cold starts

Free-tier endpoints suspend after inactivity, so the first query after a quiet
period takes a few seconds. That is expected, not a bug. If you see `P1001` on a
cold endpoint, append `&connect_timeout=15` to both URLs.

---

## Project layout

```
api/
├── prisma/
│   ├── schema.prisma          the data model (see reconciliation note above)
│   └── seed.ts                idempotent seed
├── src/
│   ├── index.ts               entry point, graceful shutdown
│   ├── app.ts                 Express assembly, middleware order, health checks
│   ├── config/
│   │   ├── env.ts             Zod-validated environment; crashes at boot on bad config
│   │   └── permissions.ts     the Sub-Admin permission catalogue (§2.2)
│   ├── lib/                   prisma, logger, errors, tokens, password,
│   │                          storage, mailer, pagination, audit, reference
│   ├── middleware/            authenticate, authorize, validate, errorHandler,
│   │                          rateLimit, requestId
│   ├── modules/               one folder per domain area
│   └── routes/index.ts        mounts every module under /v1
├── scripts/
│   ├── generate-keys.ts       RS256 key pair generator
│   └── verify-auth.ts         offline token-layer checks
├── docs/
│   ├── SCHEMA-RECONCILIATION.md
│   ├── MIGRATION.md
│   └── API.md
├── eslint.config.js
├── .prettierrc.json
├── vitest.config.ts
└── ecosystem.config.cjs       PM2 process definition for EC2
```

**Module convention.** Domain-heavy modules (`auth`, `organisations`, `testers`, `projects`, `bugs`, `users`) split into `*.schema.ts` / `*.service.ts` / `*.controller.ts` / `*.routes.ts`. Lighter modules (`managers`, `communication`, `ratings`, `transactions`, `notifications`, `uploads`, `stats`) keep thin handlers inline in `*.routes.ts`, because a separate controller file for a three-line handler is ceremony rather than structure.

**Where business rules live.** Services, not controllers and not middleware. Controllers parse and respond; middleware handles coarse role gates; services own every ownership check, because those need a database lookup the service is already doing.

---

## Roles and access model (§2.1)

| Role        | Meaning                          | Access                                            |
| ----------- | -------------------------------- | ------------------------------------------------- |
| `USER`      | Registered but not yet onboarded | Own profile only                                  |
| `CUSTOMER`  | Submits projects, tracks bugs    | Their organisations and everything under them     |
| `TESTER`    | Executes tests, logs bugs        | Projects they are assigned to, bugs they reported |
| `ADMIN`     | Full control                     | Everything, bypasses all permission checks        |
| `SUB_ADMIN` | Delegated admin                  | Only the permissions explicitly granted           |

### Access is relationship-based, not just role-based

Role alone cannot answer _"may this tester read this bug?"_. That depends on whether they reported it, whether they are still assigned to its project, and whether the assignment was accepted. Those are **relationships**, and they live in `src/lib/access/`:

| File           | Answers                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `relations.ts` | What a user **is** to a resource — reporter, org owner, project manager, active tester… Resolved in one query per request |
| `policy.ts`    | What that **entitles** them to. One table of action → relations, plus the bug transition matrix                           |
| `scopes.ts`    | The same relationships as Prisma `where` clauses, for list endpoints                                                      |

**The invariant:** "can I read this one?" (`policy.ts`) and "which can I read?" (`scopes.ts`) must always agree. If they drift, a user either sees a row they cannot open, or — much worse — a list hides something a direct URL will happily serve. `tests/access/consistency.test.ts` walks every resource against every principal and asserts the two match. It found a real inconsistency the first time it ran.

Relations resolve to one of:

```
platform:admin  platform:subadmin
org:owner       org:member
project:manager project:customer
project:tester_invited   project:tester_active   project:tester_past
bug:reporter    bug:customer    thread:participant
```

Note that `tester_invited` and `tester_active` are distinct: an invited tester can see enough of a project to decide whether to accept, but **not** the confidential brief or the materials.

Enforcement, in order:

1. **`requireRole(...)`** — coarse gate, for routes only one role should reach at all
2. **`requirePermission(...)`** — for admin-side feature areas; `ADMIN` always passes, `SUB_ADMIN` is checked against its grants
3. **`authorize(user, action, relations)` inside services** — the real decision for anything relationship-dependent

Routes whose access is relationship-dependent (all of `/bugs`, most of `/projects`) deliberately carry **no** route-level guard. A `requirePermission` there would wrongly lock out the customer whose product the bug is in.

### Sub-Admin permissions (§2.2)

Defined in `src/config/permissions.ts` and seeded into the `permissions` table. Codes are a stable contract — grants reference them, so add freely but never rename without migrating the grant rows.

```
project.read/write/assign/delete      organisation.read/write/delete
tester.read/write/verify/suspend      manager.read/write
bug.read/triage/delete                communication.read/write, announcement.write
rating.read/moderate                  transaction.read/write
user.read/write, subadmin.manage      audit.read, stats.read
```

---

## API surface

All routes are under `/v1`. Full endpoint list in [docs/API.md](docs/API.md).

```
/v1/auth              register, login, refresh, logout, verify email, reset password
/v1/users             admin user management, sub-admin permission grants, own profile
/v1/organisations     §2.2 Organisation Management + §2.4 own organisation
/v1/testers           §2.2 Crowd Tester Management + §2.3 own tester profile
/v1/projects          §2.2 Project Management, assignments, materials
/v1/bugs              §2.3 logging, §2.2 triage, comments, attachments
/v1/managers          §2.2 Manager Management
/v1/communication     §2.2 Communication — threads, messages, announcements
/v1/ratings           §2.2 Ratings & Reviews
/v1/transactions      §2.2 Transactions (records only — see scope note)
/v1/notifications     in-app notifications
/v1/uploads           presigned upload / download URLs
/v1/stats             admin dashboard, customer and tester summaries, audit log
```

### Response shape

Success:

```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 42, "totalPages": 3 } }
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [{ "field": "email", "message": "Enter a valid email address" }]
  },
  "requestId": "3f2c…"
}
```

Every response carries an `X-Request-Id` header. It appears in every log line for that request, so a user reporting an error can be traced to one line in CloudWatch.

---

## Authentication — RS256 over stateful sessions

Two deliberate choices, each solving a specific problem.

### RS256, not HS256

Access tokens are signed with an **RSA private key** and verified with the **public key**, published at `/.well-known/jwks.json`.

With a shared HMAC secret, any service that can _verify_ a token can also _forge_ one — so handing the secret to the Next.js frontend for route guards turns a frontend compromise into full token forgery. With RS256 the frontend only ever holds the public key. It can check a token is genuine; it cannot mint one.

```bash
npm run keys:generate     # prints base64-encoded PEM for .env
npm run auth:verify       # 19 offline checks on the token layer
```

The `kid` in each token header is the RFC 7638 thumbprint of the public key — derived, never configured, so it changes exactly when the key changes.

> The verifier **pins `algorithms: ['RS256']`**. Without that pin an attacker can take the published public key, sign an HS256 token using it as the shared secret, and some libraries will happily accept it. `npm run auth:verify` tests for this specific attack.

### Stateful, not self-contained

Every access token carries a `sid` claim naming a row in the `sessions` table. **A valid signature is necessary but not sufficient** — the middleware loads that session on every request and rejects the token if the row is revoked, expired, idle-timed-out, or belongs to a suspended account.

That makes revocation immediate. A stateless JWT stays valid until it expires no matter what you do; here, ending a session cuts access on the very next call.

| Event                            | Effect                                                  |
| -------------------------------- | ------------------------------------------------------- |
| Logout                           | That session only                                       |
| Logout all                       | Every session (`?keepCurrent=true` spares the caller's) |
| Password change                  | Every session except the one that made the change       |
| Password reset                   | Every session, no exception                             |
| Admin suspends or deletes a user | Every session                                           |
| Refresh-token replay detected    | That session, reason `token_reuse`                      |

Because the middleware is already reading the database, **role and permissions come from the database too** — never from the token. Granting a Sub-Admin a new permission applies on their next request rather than up to 15 minutes later. The `role` claim in the token is a non-authoritative hint for Next.js middleware redirects; the API ignores it.

### Token lifetimes

| Token   | Form                                                                                     | Life                                                                            |
| ------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Access  | RS256 JWT, `Authorization: Bearer` or `c4t_access` cookie                                | `JWT_ACCESS_TTL`, default 15 min                                                |
| Refresh | Opaque 48-byte random, `c4t_refresh` cookie scoped to `/v1/auth`, stored only as SHA-256 | Bounded by the session                                                          |
| Session | `sessions` row                                                                           | `SESSION_ABSOLUTE_TTL` (30 d hard ceiling) and `SESSION_IDLE_TTL` (7 d sliding) |

Refresh tokens **rotate in place** on the session — the session id survives rotation, so "sign out this device" keeps working. The superseded hash is retained in `previous_token_hash`; presenting it means the token was captured and replayed, so the session is destroyed rather than rotated.

### Session management endpoints

```
GET    /v1/auth/sessions        list your devices, current one flagged
DELETE /v1/auth/sessions/:id    end one device
POST   /v1/auth/logout-all      end all (?keepCurrent=true to spare this one)
```

### Verifying tokens from Next.js

Fetch the JWKS once and cache it; `jose` handles this for you.

```ts
import { createRemoteJWKSet, jwtVerify } from 'jose'

const jwks = createRemoteJWKSet(new URL(`${process.env.API_URL}/.well-known/jwks.json`))

const { payload } = await jwtVerify(token, jwks, {
  issuer: 'crowd4test-api',
  audience: 'crowd4test-app',
})
// payload.role is a HINT for choosing a redirect. It is not authorisation.
// Anything that matters must be checked by the API, which re-reads the session.
```

Local verification tells you the token is genuine and unexpired. It cannot tell you the session is still live — only the API knows that. Use it for cheap route guards, never as the authorisation decision.

### Key rotation

Replacing the key pair changes the `kid`, which invalidates every access token at once. Refresh tokens and sessions are untouched, so clients recover silently on their next refresh instead of being forced to sign in. Roughly: deploy the new `JWT_PRIVATE_KEY`, restart, done.

In production the private key belongs in AWS Secrets Manager or SSM Parameter Store as a SecureString, loaded into the environment at boot — not in a file on the instance.

### Cookies across two origins

The Next.js app and this API are separate services. For cookie auth to work in the browser, both must sit under one parent domain:

```
app.crowd4test.com   → Next.js (Amplify)
api.crowd4test.com   → this API (EC2)
COOKIE_DOMAIN=.crowd4test.com
COOKIE_SECURE=true
```

Alternatively, proxy `/api/*` from Next.js to this service so the browser only ever sees one origin. That removes CORS entirely and is the simpler option.

---

## Scope notes

Two areas are deliberately minimal because Agreement §5 excludes them:

**Payments.** `/v1/transactions` records billing and payout rows that an Admin enters and the portals read. Nothing here talks to a payment gateway. Amounts are stored as `BigInt` minor units (paise) — never a float. If a gateway is scoped later under §6, it should write into this same table through a new service rather than replace it.

**Email.** `src/lib/mailer.ts` is a transport abstraction covering only what auth cannot work without: email verification and password reset. `MAIL_DRIVER=console` logs instead of sending, so development needs no provider. Choosing and paying for SES/Postmark is a Client decision under §4.

---

## Deployment (§2.7)

Frontend on Amplify, API on EC2, database on **Neon** (§2.7 says RDS — see the contractual note above). All infrastructure costs are the Client's under §4.

```bash
npm ci --omit=dev
npx prisma generate
npx prisma migrate deploy      # never `migrate dev` in production
npm run build
NODE_ENV=production node dist/index.js
```

Run under a process manager (pm2 or a systemd unit) so the service restarts on failure and on boot.

**Production environment checklist**

- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` points at the Neon **production branch, pooled** endpoint, with `?sslmode=require`
- [ ] `DIRECT_DATABASE_URL` points at the same branch's **direct** endpoint
- [ ] `JWT_PRIVATE_KEY` is a **production-only** pair, never the one used in dev
- [ ] The private key comes from Secrets Manager or SSM SecureString, not a file on the box
- [ ] A cron calls `pruneExpiredSessions()` so the `sessions` table does not grow without bound
- [ ] `COOKIE_SECURE=true` and `COOKIE_DOMAIN` set to the shared parent domain
- [ ] `CORS_ORIGINS` lists only the real frontend origins
- [ ] `STORAGE_DRIVER=s3` with `S3_BUCKET` set — the app refuses to boot on `local` in production
- [ ] AWS credentials come from an **EC2 instance IAM role**, not env keys
- [ ] Neon IP Allow restricted to the EC2 elastic IP, if the plan supports it
- [ ] S3 bucket blocks all public access (every object is served via presigned URL)
- [ ] Load balancer health check points at `/health`

`src/config/env.ts` enforces several of these at boot and will refuse to start rather than run insecurely.

---

## Security

Implemented: Argon2id hashing · rotating refresh tokens with reuse detection · account lockout after 8 failed logins · per-IP-and-account rate limiting on auth endpoints · Helmet · strict CORS allow-list · Zod validation on every input · Prisma parameterised queries · audit logging on sensitive actions · presigned URLs with no public bucket access · secret redaction in logs.

Per Agreement §15.4, security is a shared responsibility. Not covered here: DDoS protection, WAF rules, infrastructure hardening, and credential hygiene on the Client's AWS account.

---

## Tests

The suite needs its own Neon branch, because **it truncates every table between
test files**.

```bash
# Neon console → Branches → New branch → name it "test"
cp .env.test.example .env.test          # paste the test branch's two URLs
npm run keys:generate                   # paste the key pair into .env.test

DIRECT_DATABASE_URL="<test branch direct url>" npx prisma migrate deploy
npm test
```

Two guards, because getting this wrong destroys data:

- `.env.test` is loaded by `tests/setup.ts` **before** anything imports the
  config, with `override: true` — so a `.env` or an exported shell variable
  cannot redirect the suite at your development branch.
- The setup **refuses to run** unless the connection string mentions `test`.
  Bypass is `ALLOW_DESTRUCTIVE_TESTS=yes-i-am-sure`, spelled out so nobody sets
  it by reflex.

| File                                | Covers                                                                                                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/access/rebac.test.ts`        | The access matrix. Mostly negative assertions — the customer who must not see another customer's defects, the tester who must not see the rest of the crowd |
| `tests/access/bug-workflow.test.ts` | The full lifecycle over HTTP, performed by the people who actually do each step                                                                             |
| `tests/access/consistency.test.ts`  | The list/detail invariant, every principal × every resource                                                                                                 |

## Known gaps

Honest list of what is not done:

1. **Coverage is access-control-shaped.** The authorisation matrix, the bug lifecycle and the list/detail invariant are well covered. Auth flows (refresh rotation, session revocation), transactions and communication are not yet.
2. **Background jobs.** `pg-boss` is a dependency but no queue is wired. Needed eventually for stale-upload sweeping and digest emails.
3. **File-download authorisation** is coarse — see the note in `uploads.routes.ts`.
4. **Tester aggregates** are recomputed synchronously after bug and rating writes. Fine at current scale; move to a job if the tester pool grows large.
5. **Soft deletes** rely on every query including `deletedAt: null`. A Prisma extension would enforce this globally and remove the footgun.
6. **No OpenAPI spec.** [docs/API.md](docs/API.md) is hand-written and can drift.
