# API reference

Base URL: `/v1`. Every endpoint returns `{ data, meta? }` on success and `{ error, requestId }` on failure.

**Auth column key**
`—` public · `✓` any authenticated user · `ROLE` restricted to that role · `perm:code` requires that permission (ADMIN always passes)

List endpoints accept `?page=&limit=&sort=&order=`.

---

## Health

| Method | Path                     | Auth | Purpose                                         |
| ------ | ------------------------ | ---- | ----------------------------------------------- |
| GET    | `/health`                | —    | Liveness. Use for the load-balancer check       |
| GET    | `/health/ready`          | —    | Readiness — also pings the database             |
| GET    | `/.well-known/jwks.json` | —    | RS256 public verification key. Public by design |

## Auth — `/v1/auth`

| Method | Path                   | Auth | Purpose                                                                                                                                                |
| ------ | ---------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/register`            | —    | Self-registration as `USER`, `CUSTOMER` or `TESTER`. A customer registration also creates the organisation; a tester registration opens an application |
| POST   | `/login`               | —    | Returns the user plus sets both auth cookies                                                                                                           |
| POST   | `/refresh`             | —    | Rotates the refresh token. Reuse of a revoked token revokes the whole family                                                                           |
| POST   | `/logout`              | —    | Ends the session behind the presented refresh token                                                                                                    |
| POST   | `/logout-all`          | ✓    | Ends every session. `?keepCurrent=true` spares this device                                                                                             |
| GET    | `/sessions`            | ✓    | Active devices, current one flagged `isCurrent`                                                                                                        |
| DELETE | `/sessions/:id`        | ✓    | End one device. Users may only end their own                                                                                                           |
| GET    | `/me`                  | ✓    | Current user, role, permissions and scope ids                                                                                                          |
| POST   | `/forgot-password`     | —    | Always 200, whether or not the address exists                                                                                                          |
| POST   | `/reset-password`      | —    | Consumes the token and revokes all sessions                                                                                                            |
| POST   | `/verify-email`        | —    | Promotes `PENDING_VERIFICATION` → `ACTIVE`                                                                                                             |
| POST   | `/resend-verification` | —    | Silent no-op on unknown or already-verified addresses                                                                                                  |
| POST   | `/change-password`     | ✓    | Requires the current password; signs out other sessions                                                                                                |

## Users — `/v1/users`

| Method | Path                     | Auth                   | Purpose                                               |
| ------ | ------------------------ | ---------------------- | ----------------------------------------------------- |
| GET    | `/me`                    | ✓                      | Own profile with memberships and counts               |
| PATCH  | `/me`                    | ✓                      | Edit own profile                                      |
| GET    | `/permissions/catalogue` | perm:`subadmin.manage` | Every grantable permission, grouped for the UI        |
| GET    | `/`                      | perm:`user.read`       | All users. Filter by `role`, `status`, `search`       |
| GET    | `/:id`                   | perm:`user.read`       | One user in full                                      |
| POST   | `/`                      | perm:`user.write`      | Create any account, including a Sub-Admin with grants |
| PATCH  | `/:id`                   | perm:`user.write`      | Edit profile fields                                   |
| POST   | `/:id/role`              | perm:`user.write`      | Change role. Refuses to demote the last active admin  |
| POST   | `/:id/status`            | perm:`user.write`      | Suspend / reactivate. Also revokes sessions           |
| DELETE | `/:id`                   | perm:`user.write`      | Soft delete                                           |
| GET    | `/:id/permissions`       | perm:`subadmin.manage` | A Sub-Admin's current grants                          |
| PUT    | `/:id/permissions`       | perm:`subadmin.manage` | Replace the grant set wholesale                       |

## Organisations — `/v1/organisations` (§2.2, §2.4)

| Method | Path                   | Auth                       | Purpose                                           |
| ------ | ---------------------- | -------------------------- | ------------------------------------------------- |
| GET    | `/mine`                | ✓                          | Organisations the caller belongs to               |
| GET    | `/`                    | perm:`organisation.read`   | All organisations. Filter by `status`, `search`   |
| GET    | `/:id`                 | ✓ scoped                   | Detail. Internal notes are admin-only             |
| POST   | `/`                    | perm:`organisation.write`  | Onboard an organisation, optionally with an owner |
| PATCH  | `/:id`                 | perm:`organisation.write`  | Admin edit, including status                      |
| PATCH  | `/:id/profile`         | CUSTOMER                   | Owner edits their own profile fields              |
| DELETE | `/:id`                 | perm:`organisation.delete` | Archive. Refuses while active projects exist      |
| POST   | `/:id/members`         | ✓ scoped                   | Add a member (admin, or the org owner)            |
| PATCH  | `/:id/members/:userId` | ✓ scoped                   | Change a member's org role                        |
| DELETE | `/:id/members/:userId` | ✓ scoped                   | Remove a member. An org must keep one owner       |

## Testers — `/v1/testers` (§2.2, §2.3)

| Method | Path                    | Auth                 | Purpose                                                                                                       |
| ------ | ----------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- |
| GET    | `/me`                   | TESTER               | Own profile with devices, skills, languages                                                                   |
| PATCH  | `/me`                   | TESTER               | Edit own profile                                                                                              |
| POST   | `/me/devices`           | TESTER               | Add a device                                                                                                  |
| DELETE | `/me/devices/:deviceId` | TESTER               | Remove a device                                                                                               |
| PUT    | `/me/skills`            | TESTER               | Replace the skill set (creates unknown skills)                                                                |
| PUT    | `/me/languages`         | TESTER               | Replace languages and proficiency                                                                             |
| POST   | `/me/nda`               | TESTER               | Accept the NDA — required before any assignment                                                               |
| GET    | `/`                     | perm:`tester.read`   | The crowd pool. Filter by `status`, `countryCode`, `skills`, `languages`, `deviceType`, `minRating`, `search` |
| GET    | `/:id`                  | perm:`tester.read`   | One tester in full                                                                                            |
| PATCH  | `/:id/status`           | perm:`tester.verify` | Verify, reject or suspend. Suspension also suspends the account                                               |

## Projects — `/v1/projects` (§2.2, §2.3, §2.4)

| Method | Path                         | Auth                       | Purpose                                                                  |
| ------ | ---------------------------- | -------------------------- | ------------------------------------------------------------------------ |
| GET    | `/my-assignments`            | TESTER                     | The caller's invitations and active work                                 |
| GET    | `/`                          | ✓ scoped                   | Admin: all. Customer: own org. Tester: assigned only                     |
| GET    | `/:id`                       | ✓ scoped                   | Detail. A tester sees no brief or materials until they accept            |
| POST   | `/`                          | CUSTOMER, ADMIN, SUB_ADMIN | Create. Customers may omit `organisationId` when they belong to only one |
| PATCH  | `/:id`                       | CUSTOMER, ADMIN, SUB_ADMIN | Edit. Customers only while `DRAFT` or `SUBMITTED`                        |
| POST   | `/:id/status`                | CUSTOMER, ADMIN, SUB_ADMIN | Transition status. Customers may only `DRAFT → SUBMITTED`                |
| DELETE | `/:id`                       | perm:`project.delete`      | Archive                                                                  |
| POST   | `/:id/materials`             | CUSTOMER, ADMIN, SUB_ADMIN | Attach a brief, build link or file                                       |
| DELETE | `/:id/materials/:materialId` | CUSTOMER, ADMIN, SUB_ADMIN | Remove a material                                                        |
| POST   | `/:id/assignments`           | perm:`project.assign`      | Invite testers in bulk. Validates all before writing any                 |
| PATCH  | `/:id/assignments/:testerId` | perm:`project.assign`      | Activate, complete or remove a tester                                    |
| POST   | `/:id/respond`               | TESTER                     | Accept or decline an invitation                                          |

**Status transitions.** `DRAFT → SUBMITTED → APPROVED → IN_PROGRESS → COMPLETED`, with `PAUSED` and `CANCELLED` branches. Invalid jumps return `409`.

## Bugs — `/v1/bugs` (§2.3, §2.2)

Authorisation here is **relationship-based**, so these routes carry no role or permission guards. Whether you may act on a bug depends on your relationship to it — reporter, the customer whose project it is, an assigned manager, or platform staff — which cannot be known from the URL alone.

| Method | Path                             | Who                                  | Purpose                                                                       |
| ------ | -------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| GET    | `/`                              | scoped                               | Admin: all. Customer: their organisations' projects. Tester: own reports only |
| GET    | `/:id`                           | scoped                               | Detail plus a `capabilities` block — see below                                |
| POST   | `/`                              | tester with an **active** assignment | Log a defect                                                                  |
| PATCH  | `/:id`                           | reporter (while `NEW`), platform     | Correct the report's content                                                  |
| POST   | `/:id/status`                    | reporter, customer, platform         | **Every lifecycle move** — triage, resolve, verify, reopen                    |
| POST   | `/:id/triage`                    | —                                    | Deprecated alias for `/status`                                                |
| DELETE | `/:id`                           | reporter (while `NEW`), platform     | Withdraw / soft delete                                                        |
| POST   | `/:id/comments`                  | anyone who can read it               | `isInternal` requires platform                                                |
| POST   | `/:id/attachments`               | reporter, platform                   | Attach an already-uploaded file                                               |
| DELETE | `/:id/attachments/:attachmentId` | reporter (while `NEW`), platform     | Remove an attachment                                                          |

### The defect lifecycle

```
tester reports     →  NEW
platform triages   →  CONFIRMED | REJECTED | DUPLICATE | TRIAGED
customer works it  →  IN_PROGRESS  →  FIXED | WONT_FIX
tester re-tests    →  VERIFIED | REOPENED
```

One deliberate asymmetry: **a customer may mark their own fix `FIXED`, but never `VERIFIED`.** Verification belongs to the tester who found the defect, or to an admin — if the customer could close their own loop, the independent testing they are paying for would be decorative. They can still `REOPENED` a fix that regresses.

Transitions permitted from each state, by actor:

| From          | Platform (admin / sub-admin / project manager)        | Customer                                              | Reporter               |
| ------------- | ----------------------------------------------------- | ----------------------------------------------------- | ---------------------- |
| `NEW`         | TRIAGED, CONFIRMED, REJECTED, DUPLICATE, WONT_FIX     | CONFIRMED, IN_PROGRESS, REJECTED, DUPLICATE, WONT_FIX | —                      |
| `TRIAGED`     | CONFIRMED, REJECTED, DUPLICATE, WONT_FIX, IN_PROGRESS | CONFIRMED, IN_PROGRESS, REJECTED, DUPLICATE, WONT_FIX | —                      |
| `CONFIRMED`   | IN_PROGRESS, FIXED, WONT_FIX, DUPLICATE               | IN_PROGRESS, FIXED, WONT_FIX, DUPLICATE               | —                      |
| `IN_PROGRESS` | FIXED, WONT_FIX, CONFIRMED                            | FIXED, WONT_FIX, CONFIRMED                            | —                      |
| `FIXED`       | VERIFIED, REOPENED                                    | REOPENED                                              | **VERIFIED, REOPENED** |
| `VERIFIED`    | REOPENED                                              | REOPENED                                              | REOPENED               |
| `REOPENED`    | CONFIRMED, IN_PROGRESS, FIXED, WONT_FIX               | IN_PROGRESS, FIXED, WONT_FIX                          | —                      |
| `REJECTED`    | NEW, CONFIRMED                                        | CONFIRMED                                             | —                      |
| `DUPLICATE`   | NEW, CONFIRMED                                        | CONFIRMED                                             | —                      |
| `WONT_FIX`    | CONFIRMED, IN_PROGRESS                                | CONFIRMED, IN_PROGRESS                                | —                      |

An illegal transition returns **409** listing the moves you _can_ make. Also:

- `severity` may only be changed by the platform side (**403** otherwise)
- `REJECTED` and `WONT_FIX` require a `note` (**422** otherwise)
- `DUPLICATE` requires `duplicateOfId`, and the target must be on the same project

### `capabilities` on the detail response

`GET /v1/bugs/:id` tells the caller what they may do next, so no client has to re-derive the matrix:

```json
{
  "capabilities": {
    "canEdit": false,
    "canDelete": false,
    "canComment": true,
    "canCommentInternally": false,
    "canAttach": false,
    "canChangeSeverity": false,
    "availableTransitions": ["VERIFIED", "REOPENED"]
  }
}
```

A test asserts that everything advertised here is accepted, and that nothing refused is offered.

## Managers — `/v1/managers` (§2.2)

| Method | Path                                 | Auth                 | Purpose                                               |
| ------ | ------------------------------------ | -------------------- | ----------------------------------------------------- |
| GET    | `/`                                  | perm:`manager.read`  | Admins and Sub-Admins with their current project load |
| GET    | `/:id/projects`                      | perm:`manager.read`  | Projects a manager oversees                           |
| POST   | `/assignments`                       | perm:`manager.write` | Assign a manager to a project                         |
| DELETE | `/assignments/:managerId/:projectId` | perm:`manager.write` | Unassign                                              |

## Communication — `/v1/communication` (§2.2)

| Method | Path                    | Auth                       | Purpose                                       |
| ------ | ----------------------- | -------------------------- | --------------------------------------------- |
| GET    | `/threads`              | ✓ scoped                   | Participant threads; admin sees all           |
| POST   | `/threads`              | ✓                          | Start a thread with an opening message        |
| GET    | `/threads/:id`          | ✓ scoped                   | Full transcript; marks read for the caller    |
| POST   | `/threads/:id/messages` | ✓ scoped                   | Post a message with optional attachments      |
| POST   | `/threads/:id/close`    | perm:`communication.write` | Close a thread                                |
| GET    | `/announcements`        | ✓                          | Published announcements for the caller's role |
| POST   | `/announcements`        | perm:`announcement.write`  | Publish or schedule                           |
| DELETE | `/announcements/:id`    | perm:`announcement.write`  | Delete                                        |

## Ratings — `/v1/ratings` (§2.2)

| Method | Path              | Auth                   | Purpose                                                                              |
| ------ | ----------------- | ---------------------- | ------------------------------------------------------------------------------------ |
| GET    | `/`               | ✓                      | Filter by `subjectUserId`, `projectId`, `subjectType`. Hidden ratings are admin-only |
| GET    | `/mine`           | ✓                      | Ratings the caller has received, with the average                                    |
| POST   | `/`               | CUSTOMER, TESTER       | Rate 1–5. Both parties must have shared the project                                  |
| POST   | `/:id/visibility` | perm:`rating.moderate` | Hide or restore. Recomputes the tester's average                                     |

## Transactions — `/v1/transactions` (§2.2, §2.4)

Records only — §5 excludes gateway integration. Amounts are `BigInt` **minor units** (paise), serialised as strings.

| Method | Path            | Auth                     | Purpose                                                      |
| ------ | --------------- | ------------------------ | ------------------------------------------------------------ |
| GET    | `/`             | ✓ scoped                 | Customer: own org. Tester: own rows. Includes totals by type |
| GET    | `/:id`          | ✓ scoped                 | One transaction                                              |
| POST   | `/`             | perm:`transaction.write` | Record an invoice, payment, earning or payout                |
| PATCH  | `/:id`          | perm:`transaction.write` | Update status, reference or description                      |
| GET    | `/summary/mine` | ✓                        | The caller's earnings summary                                |

## Notifications — `/v1/notifications`

| Method | Path            | Auth | Purpose                                                   |
| ------ | --------------- | ---- | --------------------------------------------------------- |
| GET    | `/`             | ✓    | Paginated, with `unreadCount`. `?unreadOnly=true` filters |
| GET    | `/unread-count` | ✓    | Badge count                                               |
| POST   | `/:id/read`     | ✓    | Mark one read                                             |
| POST   | `/read-all`     | ✓    | Mark all read                                             |

## Uploads — `/v1/uploads`

| Method | Path                | Auth | Purpose                                                              |
| ------ | ------------------- | ---- | -------------------------------------------------------------------- |
| POST   | `/presign`          | ✓    | Returns `fileId`, a signed PUT URL and the headers the PUT must send |
| POST   | `/:id/complete`     | ✓    | Marks the upload usable. Until then the file cannot be attached      |
| GET    | `/:id/download-url` | ✓    | Short-lived signed download URL                                      |

**Flow**

```
POST /v1/uploads/presign  { scope, originalName, mimeType, sizeBytes }
  → { fileId, uploadUrl, requiredHeaders, expiresInSeconds }
PUT  <uploadUrl>          (raw bytes, with requiredHeaders — goes straight to S3)
POST /v1/uploads/:fileId/complete
  → then pass fileId to a bug attachment, project material or message
```

## Stats — `/v1/stats`

| Method | Path        | Auth              | Purpose                                                          |
| ------ | ----------- | ----------------- | ---------------------------------------------------------------- |
| GET    | `/admin`    | perm:`stats.read` | Projects, bugs, testers, organisations, users and finance totals |
| GET    | `/customer` | ✓                 | Portal summary scoped to the caller's organisations              |
| GET    | `/tester`   | ✓                 | Assignments, bugs, profile aggregates and earnings               |
| GET    | `/audit`    | perm:`audit.read` | Audit trail. Filter by `entityType`, `entityId`, `actorId`       |

---

## Error codes

| HTTP | Code                | Meaning                                                           |
| ---- | ------------------- | ----------------------------------------------------------------- |
| 400  | `BAD_REQUEST`       | Malformed request                                                 |
| 400  | `MALFORMED_JSON`    | Body is not valid JSON                                            |
| 401  | `UNAUTHORIZED`      | Missing, invalid or expired token                                 |
| 403  | `FORBIDDEN`         | Authenticated but not permitted                                   |
| 404  | `NOT_FOUND`         | Missing, or hidden by scoping                                     |
| 409  | `CONFLICT`          | Duplicate, or an invalid state transition                         |
| 422  | `VALIDATION_ERROR`  | Zod failure. `details` lists each field                           |
| 429  | `TOO_MANY_REQUESTS` | Rate limited                                                      |
| 500  | `INTERNAL_ERROR`    | Message suppressed in production; use `requestId` to find the log |

A resource the caller may not see returns **404, not 403** — a 403 would confirm the record exists.

---

## Authentication

Access tokens are **RS256 JWTs naming a server-side session**. Verify the signature against `/.well-known/jwks.json`; the API additionally checks the session is live on every request.

```
Authorization: Bearer <access token>
```

Cookies (`c4t_access`, `c4t_refresh`) are set automatically on login and refresh, so a browser client needs no header handling — just `credentials: 'include'`.

### 401 reasons

The message distinguishes the cases, because the client should react differently to each.

| Message                                        | Meaning                       | Client should                             |
| ---------------------------------------------- | ----------------------------- | ----------------------------------------- |
| `Invalid or expired access token`              | Signature or `exp` failed     | Call `/auth/refresh`                      |
| `Session no longer exists`                     | The row was pruned            | Sign in again                             |
| `Session has been signed out`                  | Logged out elsewhere          | Sign in again                             |
| `Session expired`                              | Past the absolute ceiling     | Sign in again                             |
| `Session timed out through inactivity`         | Past the idle window          | Sign in again                             |
| `This session was ended for security reasons…` | Refresh-token replay detected | Sign in again, and surface it to the user |

Only the first is retryable. Looping `/auth/refresh` on any of the others will not recover.
