import jwt from 'jsonwebtoken'
import { signAccessToken, verifyAccessToken } from '../src/lib/tokens.js'
import { buildJwks, keyId, publicKeyPem } from '../src/lib/keys.js'

/**
 * Offline check of the RS256 token layer. No database required.
 *   npx tsx scripts/verify-auth.ts
 */

let failures = 0
function check(label: string, condition: boolean, detail = '') {
  const mark = condition ? 'PASS' : 'FAIL'
  if (!condition) failures++
  console.log(`  [${mark}] ${label}${detail ? ` — ${detail}` : ''}`)
}

console.log('\nRS256 access tokens\n')

const token = signAccessToken({ userId: 'user_abc123', sessionId: 'sess_xyz789', role: 'ADMIN' })
const header = JSON.parse(Buffer.from(token.split('.')[0]!, 'base64url').toString())

check('algorithm is RS256', header.alg === 'RS256', header.alg)
check('header carries the kid', header.kid === keyId, header.kid)

const claims = verifyAccessToken(token)
check('subject round-trips', claims.sub === 'user_abc123')
check('session id round-trips', claims.sid === 'sess_xyz789')
check('role hint round-trips', claims.role === 'ADMIN')
check('issuer is set', claims.iss === 'crowd4test-api')
check('audience is set', claims.aud === 'crowd4test-app')
check(
  'jti is unique per token',
  claims.jti !==
    verifyAccessToken(
      signAccessToken({ userId: 'user_abc123', sessionId: 'sess_xyz789', role: 'ADMIN' }),
    ).jti,
)

console.log('\nAttack resistance\n')

// The classic RS256 downgrade: sign HS256 using the PUBLIC key as the shared
// secret. Verification must reject it because the algorithm is pinned.
const forged = jwt.sign({ sub: 'user_abc123', sid: 'sess_xyz789', role: 'ADMIN' }, publicKeyPem, {
  algorithm: 'HS256',
  issuer: 'crowd4test-api',
  audience: 'crowd4test-app',
  expiresIn: '15m',
})
let rejectedHs256 = false
try {
  verifyAccessToken(forged)
} catch {
  rejectedHs256 = true
}
check('rejects an HS256 token signed with the public key', rejectedHs256)

let rejectedAlgNone = false
try {
  verifyAccessToken(jwt.sign({ sub: 'x', sid: 'y' }, '', { algorithm: 'none' } as jwt.SignOptions))
} catch {
  rejectedAlgNone = true
}
check('rejects alg=none', rejectedAlgNone)

let rejectedTamper = false
const [h, p, s] = token.split('.')
const tamperedPayload = Buffer.from(
  JSON.stringify({
    ...JSON.parse(Buffer.from(p!, 'base64url').toString()),
    role: 'ADMIN',
    sub: 'someone_else',
  }),
).toString('base64url')
try {
  verifyAccessToken(`${h}.${tamperedPayload}.${s}`)
} catch {
  rejectedTamper = true
}
check('rejects a tampered payload', rejectedTamper)

let rejectedWrongIssuer = false
try {
  verifyAccessToken(
    jwt.sign({ sub: 'x', sid: 'y' }, (await import('../src/lib/keys.js')).privateKeyPem, {
      algorithm: 'RS256',
      issuer: 'someone-else',
      audience: 'crowd4test-app',
      expiresIn: '15m',
    }),
  )
} catch {
  rejectedWrongIssuer = true
}
check('rejects a foreign issuer', rejectedWrongIssuer)

console.log('\nJWKS document\n')

const jwks = buildJwks()
const key = jwks.keys[0]!
check('exactly one key published', jwks.keys.length === 1)
check('kty is RSA', key.kty === 'RSA')
check('alg is RS256', key.alg === 'RS256')
check('use is sig', key.use === 'sig')
check('kid matches the token header', key.kid === keyId)
check('modulus present', typeof key.n === 'string' && key.n.length > 100)
check('no private material leaked', !('d' in key) && !('p' in key) && !('q' in key))

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) FAILED.\n`)
process.exit(failures === 0 ? 0 : 1)
