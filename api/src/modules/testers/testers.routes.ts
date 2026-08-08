import { Router } from 'express'
import { Role } from '@prisma/client'
import { authenticate } from '../../middleware/authenticate.js'
import { requirePermission, requireRole } from '../../middleware/authorize.js'
import { validate } from '../../middleware/validate.js'
import { PERMISSIONS } from '../../config/permissions.js'
import * as controller from './testers.controller.js'
import {
  listTestersQuery,
  updateTesterProfileSchema,
  changeTesterStatusSchema,
  deviceSchema,
  skillsSchema,
  languagesSchema,
  acceptNdaSchema,
  testerIdParam,
  deviceIdParam,
} from './testers.schema.js'

export const testersRouter = Router()

testersRouter.use(authenticate)

// ─── Tester self-service (§2.3 "Manage their tester profile") ────────────────
// Declared before "/:id" so "me" is never parsed as an id.

const me = Router()
me.use(requireRole(Role.TESTER))
me.get('/', controller.getMine)
me.patch('/', validate({ body: updateTesterProfileSchema }), controller.updateMine)
me.post('/devices', validate({ body: deviceSchema }), controller.addDevice)
me.delete('/devices/:deviceId', validate({ params: deviceIdParam }), controller.removeDevice)
me.put('/skills', validate({ body: skillsSchema }), controller.setSkills)
me.put('/languages', validate({ body: languagesSchema }), controller.setLanguages)
me.post('/nda', validate({ body: acceptNdaSchema }), controller.acceptNda)

testersRouter.use('/me', me)

// ─── Admin: crowd tester management (§2.2) ───────────────────────────────────

testersRouter.get(
  '/',
  requirePermission(PERMISSIONS.TESTER_READ),
  validate({ query: listTestersQuery }),
  controller.list,
)

testersRouter.get(
  '/:id',
  requirePermission(PERMISSIONS.TESTER_READ),
  validate({ params: testerIdParam }),
  controller.getOne,
)

/**
 * Verification and suspension are separate permissions in the catalogue, but a
 * single endpoint. requireAnyPermission is not used here deliberately: the
 * service branches on the target status, so the route requires the stricter of
 * the two and Admins bypass both anyway.
 */
testersRouter.patch(
  '/:id/status',
  requirePermission(PERMISSIONS.TESTER_VERIFY),
  validate({ params: testerIdParam, body: changeTesterStatusSchema }),
  controller.changeStatus,
)
