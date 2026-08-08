import { Router } from 'express'
import { param } from '../../lib/http.js'
import { z } from 'zod'
import { authenticate } from '../../middleware/authenticate.js'
import { validate, validatedQuery } from '../../middleware/validate.js'
import { paginationQuery } from '../../lib/pagination.js'
import * as service from './notifications.service.js'

export const notificationsRouter = Router()

notificationsRouter.use(authenticate)

const listQuery = paginationQuery.extend({
  unreadOnly: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => v === 'true'),
})

notificationsRouter.get('/', validate({ query: listQuery }), async (req, res) => {
  const query = validatedQuery<z.infer<typeof listQuery>>(res)
  const { items, meta } = await service.listNotifications(req.user!.id, query)
  res.json({ data: items, meta })
})

notificationsRouter.get('/unread-count', async (req, res) => {
  res.json({ data: { unreadCount: await service.unreadCount(req.user!.id) } })
})

notificationsRouter.post(
  '/:id/read',
  validate({ params: z.object({ id: z.string().cuid() }) }),
  async (req, res) => {
    res.json({ data: await service.markRead(req.user!.id, param(req, 'id')) })
  },
)

notificationsRouter.post('/read-all', async (req, res) => {
  res.json({ data: { marked: await service.markAllRead(req.user!.id) } })
})
