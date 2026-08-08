import pino from 'pino'
import { env, isProduction } from '../config/env.js'

export const logger = pino({
  level: env.LOG_LEVEL,
  transport: isProduction ? undefined : { target: 'pino/file', options: { destination: 1 } },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.currentPassword',
      'req.body.newPassword',
      'req.body.token',
      'res.headers["set-cookie"]',
    ],
    censor: '[redacted]',
  },
  base: { service: 'crowd4test-api' },
})
