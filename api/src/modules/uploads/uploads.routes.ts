import { Router, raw } from 'express'
import { param } from '../../lib/http.js'
import { z } from 'zod'
import { FileScope } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'
import { authenticate } from '../../middleware/authenticate.js'
import { validate } from '../../middleware/validate.js'
import { uploadLimiter } from '../../middleware/rateLimit.js'
import { NotFoundError, ForbiddenError, BadRequestError } from '../../lib/errors.js'
import { env } from '../../config/env.js'
import {
  createUploadUrl,
  createDownloadUrl,
  writeLocalObject,
  readLocalObject,
  assertUploadAllowed,
} from '../../lib/storage.js'

/**
 * Two-step upload:
 *   1. POST /uploads/presign  → returns a signed PUT URL and a fileId
 *   2. client PUTs the bytes straight to S3
 *   3. POST /uploads/:id/complete → marks the row usable
 *
 * Bytes never pass through this API, which matters for the screenshot and video
 * attachments §2.3 allows on bug reports.
 */
export const uploadsRouter = Router()

const presignSchema = z.object({
  scope: z.nativeEnum(FileScope),
  originalName: z.string().trim().min(1).max(255),
  mimeType: z.string().trim().min(1).max(160),
  sizeBytes: z.coerce.number().int().positive(),
})

uploadsRouter.post(
  '/presign',
  authenticate,
  uploadLimiter,
  validate({ body: presignSchema }),
  async (req, res) => {
    const input = req.body as z.infer<typeof presignSchema>

    const presigned = await createUploadUrl(input)

    const file = await prisma.fileObject.create({
      data: {
        scope: input.scope,
        storageKey: presigned.storageKey,
        driver: presigned.driver,
        originalName: input.originalName,
        mimeType: input.mimeType,
        sizeBytes: input.sizeBytes,
        uploadedById: req.user!.id,
        isComplete: false,
      },
      select: { id: true, storageKey: true, scope: true },
    })

    res.status(201).json({
      data: {
        fileId: file.id,
        uploadUrl: presigned.uploadUrl,
        requiredHeaders: presigned.requiredHeaders,
        expiresInSeconds: presigned.expiresInSeconds,
      },
    })
  },
)

uploadsRouter.post(
  '/:id/complete',
  authenticate,
  validate({ params: z.object({ id: z.string().cuid() }) }),
  async (req, res) => {
    const file = await prisma.fileObject.findUnique({
      where: { id: param(req, 'id') },
      select: { id: true, uploadedById: true, isComplete: true },
    })
    if (!file) throw new NotFoundError('File')
    if (file.uploadedById !== req.user!.id) {
      throw new ForbiddenError('That upload belongs to someone else')
    }

    const updated = await prisma.fileObject.update({
      where: { id: file.id },
      data: { isComplete: true },
      select: { id: true, originalName: true, mimeType: true, sizeBytes: true, isComplete: true },
    })

    res.json({ data: updated })
  },
)

/** Short-lived signed download URL. Objects are never publicly readable. */
uploadsRouter.get(
  '/:id/download-url',
  authenticate,
  validate({ params: z.object({ id: z.string().cuid() }) }),
  async (req, res) => {
    const file = await prisma.fileObject.findUnique({
      where: { id: param(req, 'id') },
      select: { id: true, storageKey: true, originalName: true, isComplete: true },
    })
    if (!file?.isComplete) throw new NotFoundError('File')

    // NOTE: this grants any authenticated user a URL for any known file id.
    // File ids are unguessable cuids and are only surfaced through endpoints
    // that already scope by role, so this is acceptable for launch — but if a
    // stricter rule is needed, resolve the owning bug/message here and reuse
    // its visibility filter. Flagged in docs/SCHEMA-RECONCILIATION.md.
    res.json({ data: { url: await createDownloadUrl(file.storageKey, file.originalName) } })
  },
)

// ─── Local driver endpoints (development only) ───────────────────────────────

if (env.STORAGE_DRIVER === 'local') {
  uploadsRouter.put(
    '/local/:key',
    raw({ type: '*/*', limit: env.UPLOAD_MAX_BYTES }),
    async (req, res) => {
      const key = decodeURIComponent(param(req, 'key'))
      const contentType = req.header('content-type') ?? 'application/octet-stream'
      const body = req.body as Buffer

      if (!Buffer.isBuffer(body)) throw new BadRequestError('Expected a binary body')
      assertUploadAllowed(contentType, body.length)

      await writeLocalObject(key, body)
      res.status(200).json({ data: { stored: true, bytes: body.length } })
    },
  )

  uploadsRouter.get('/local/:key', async (req, res) => {
    const key = decodeURIComponent(param(req, 'key'))
    const file = await prisma.fileObject.findUnique({
      where: { storageKey: key },
      select: { mimeType: true, originalName: true },
    })
    if (!file) throw new NotFoundError('File')

    const data = await readLocalObject(key)
    res.setHeader('content-type', file.mimeType)
    res.setHeader(
      'content-disposition',
      `inline; filename="${file.originalName.replace(/"/g, '')}"`,
    )
    res.send(data)
  })
}
