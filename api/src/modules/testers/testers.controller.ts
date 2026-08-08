import type { Request, Response } from 'express'
import { param } from '../../lib/http.js'
import { recordAudit } from '../../lib/audit.js'
import { validatedQuery } from '../../middleware/validate.js'
import * as service from './testers.service.js'
import type { ListTestersQuery } from './testers.schema.js'

export async function list(_req: Request, res: Response): Promise<void> {
  const query = validatedQuery<ListTestersQuery>(res)
  const { items, meta } = await service.listTesters(query)
  res.json({ data: items, meta })
}

export async function getOne(req: Request, res: Response): Promise<void> {
  res.json({ data: await service.getTesterById(param(req, 'id')) })
}

export async function getMine(req: Request, res: Response): Promise<void> {
  res.json({ data: await service.getMyProfile(req.user!.id) })
}

export async function updateMine(req: Request, res: Response): Promise<void> {
  res.json({ data: await service.updateMyProfile(req.user!.id, req.body) })
}

export async function changeStatus(req: Request, res: Response): Promise<void> {
  const profile = await service.changeTesterStatus(
    req.user!.id,
    param(req, 'id'),
    req.body.status,
    req.body.reason,
  )
  await recordAudit({
    req,
    action: 'tester.status_changed',
    entityType: 'TesterProfile',
    entityId: param(req, 'id'),
    after: { status: req.body.status, reason: req.body.reason },
  })
  res.json({ data: profile })
}

export async function addDevice(req: Request, res: Response): Promise<void> {
  res.status(201).json({ data: await service.addDevice(req.user!.id, req.body) })
}

export async function removeDevice(req: Request, res: Response): Promise<void> {
  await service.removeDevice(req.user!.id, param(req, 'deviceId'))
  res.status(204).send()
}

export async function setSkills(req: Request, res: Response): Promise<void> {
  res.json({ data: await service.setSkills(req.user!.id, req.body.skills) })
}

export async function setLanguages(req: Request, res: Response): Promise<void> {
  res.json({ data: await service.setLanguages(req.user!.id, req.body.languages) })
}

export async function acceptNda(req: Request, res: Response): Promise<void> {
  const result = await service.acceptNda(req.user!.id)
  await recordAudit({
    req,
    action: 'tester.nda_accepted',
    entityType: 'TesterProfile',
    entityId: result.id,
  })
  res.json({ data: result })
}
