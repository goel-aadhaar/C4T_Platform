# MySQL → PostgreSQL data migration (§2.8)

**Status: scaffolded, blocked on the Client's dump.**

Agreement §9.1 requires the Client to "provide a complete export/dump of the existing MySQL database… in a suitable format for migration to PostgreSQL". Nothing here can run until that arrives.

---

## What §2.8 actually commits us to

Read the clause carefully, because it draws a precise line:

> **Existing Users:** Users already existing on the current platform shall not face any issue with respect to features that rely on their already-migrated data — such features shall continue to work as expected after migration.
>
> **New-Data-Dependent Features:** Only those new features that require new data points not present in the existing MySQL database… will not be available to old/existing users until the corresponding new data is added or populated for them.

In practice:

- A migrated user **must** be able to log in and see their history. Not negotiable.
- A migrated tester **may** be missing, say, device or language records, because the old platform may not have stored them. Those features stay dormant for that user until they fill the gap in.

Design the migration so the first guarantee never breaks, and so the second degrades gracefully rather than throwing.

---

## The password problem — resolve this first

This is the highest-risk unknown in the entire migration, and it determines whether existing users can log in on day one.

**Find out how the legacy platform hashes passwords.** Then pick a path:

| Legacy scheme          | Path                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bcrypt                 | Store the hash as-is. Add a bcrypt branch to `verifyPassword()`, and re-hash to Argon2id on the next successful login (`needsRehash` already handles the upgrade).                 |
| Argon2                 | Copy straight across. Nothing to do.                                                                                                                                               |
| MD5 / SHA-1 / unsalted | **Do not migrate these.** Set an unusable placeholder hash, mark every migrated account as requiring a reset, and run a one-off "set your new password" email campaign at cutover. |
| Unknown / unavailable  | Same as above — forced reset.                                                                                                                                                      |

The forced-reset path needs a Client decision and a communication plan, so raise it early. It is the difference between a silent cutover and one where every existing user needs an email.

---

## Order of operations

Foreign keys dictate the sequence. Load parents before children:

```
1. users
2. organisations            → organisation_members
3. tester_profiles          → tester_devices, tester_skills, tester_languages
4. skills                   (upsert the catalogue first, then link)
5. projects                 → project_materials, project_assignments
6. manager_assignments
7. bugs                     → bug_attachments, bug_comments, bug_status_history
8. threads                  → thread_participants, messages
9. ratings
10. transactions
11. file_objects            (see the note on file bodies below)
```

---

## Field mapping

Fill this in once the dump is available. One row per legacy column that carries forward.

| Legacy table.column | New table.column      | Transform         | Notes                          |
| ------------------- | --------------------- | ----------------- | ------------------------------ |
| `users.id`          | `users.legacy_id`     | cast to text      | Keeps old rows traceable       |
| `users.email`       | `users.email`         | lowercase, trim   | Deduplicate first — see below  |
| `users.password`    | `users.password_hash` | depends on scheme | See the password section       |
| `users.created_at`  | `users.created_at`    | preserve          | Do not reset to migration time |
|                     |                       |                   |                                |

---

## Traps specific to MySQL → PostgreSQL

**Zero dates.** MySQL happily stores `0000-00-00 00:00:00`. Postgres rejects it. Convert to `NULL`.

**Case-insensitive collations.** MySQL's default `utf8mb4_general_ci` treats `Alice@x.com` and `alice@x.com` as the same value; Postgres does not. Deduplicate emails _before_ loading or the unique index will reject rows mid-import.

**`utf8` is not UTF-8.** MySQL's `utf8` is 3-byte and silently truncates emoji and some scripts. If the legacy database uses it rather than `utf8mb4`, expect mangled characters — inspect a sample before trusting the export.

**Tinyint booleans.** `tinyint(1)` values arrive as `0`/`1`, not `false`/`true`.

**Enum drift.** Legacy status strings almost certainly will not match the enums in `schema.prisma`. Write an explicit mapping table and fail loudly on an unrecognised value — never silently default it, or you will quietly mislabel real records.

**Auto-increment vs cuid.** New primary keys are cuids. Keep the old integer in `legacy_id` and build an in-memory `legacyId → newId` map during the run so foreign keys can be rewired.

**Reference numbers.** If legacy projects and bugs have human-facing reference numbers, carry them across and then bump the Postgres sequences past the highest imported value, or the first new record will collide:

```sql
SELECT setval('"ref_project_2026"', (
  SELECT COALESCE(MAX(SPLIT_PART(reference, '-', 3)::int), 0) FROM projects
));
```

**File bodies.** `file_objects` rows are only useful if the underlying objects exist in S3. Migrate the bytes first, then the rows. Any row whose object is missing should be left `is_complete = false` so nothing tries to serve it.

---

## Suggested runner shape

Put the script at `api/scripts/migrate-legacy.ts`. Requirements:

- **Idempotent.** Key every write on `legacy_id` and upsert. A migration you cannot re-run safely is a migration you will only get one attempt at.
- **Resumable.** Batch in chunks of ~500 and log the last completed id per table.
- **Dry-run mode.** `--dry-run` validates and reports counts without writing.
- **A reconciliation report.** Row counts in vs out per table, plus every skipped row with its reason. This is the artefact you hand the Client at Milestone 3, and the evidence that §2.8 was satisfied.

```bash
npx tsx scripts/migrate-legacy.ts --source=./legacy-dump.sql --dry-run
npx tsx scripts/migrate-legacy.ts --source=./legacy-dump.sql
```

---

## Cutover checklist

- [ ] Legacy password scheme identified and a path agreed **in writing**
- [ ] Full dry run completed against a copy of production data
- [ ] Reconciliation report reviewed and approved by the Client
- [ ] Row counts match, or every discrepancy is explained
- [ ] A sample of migrated users can actually log in
- [ ] A sample of migrated projects shows the right bugs and assignments
- [ ] Reference-number sequences bumped past the highest imported value
- [ ] File objects present in S3 for every `is_complete = true` row
- [ ] Rollback plan written down and tested
- [ ] Legacy database kept read-only for at least 30 days post-cutover
