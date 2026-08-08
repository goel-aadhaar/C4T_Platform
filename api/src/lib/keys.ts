import crypto, { type KeyObject } from 'node:crypto'
import { env } from '../config/env.js'

/**
 * RSA key material for RS256 access tokens.
 *
 * Why asymmetric rather than a shared HMAC secret: the Next.js frontend is a
 * separate service that needs to verify tokens (route guards, Server
 * Components) without being able to MINT them. With HS256 the verifier holds
 * the same secret as the signer, so a frontend compromise becomes a token
 * forgery. With RS256 the frontend only ever sees the public key, published at
 * /.well-known/jwks.json.
 *
 * Keys are supplied as PEM via the environment, either base64-encoded (the
 * sane way to survive a .env file) or raw with escaped newlines.
 */

function decodePem(value: string, label: string): string {
  const trimmed = value.trim()

  // Raw PEM, possibly with literal "\n" sequences instead of real newlines.
  if (trimmed.includes('-----BEGIN')) {
    return trimmed.replace(/\\n/g, '\n')
  }

  // Otherwise assume base64-encoded PEM.
  let decoded: string
  try {
    decoded = Buffer.from(trimmed, 'base64').toString('utf8')
  } catch {
    throw new Error(`${label} is neither valid PEM nor valid base64`)
  }
  if (!decoded.includes('-----BEGIN')) {
    throw new Error(`${label} did not decode to a PEM block. Re-check the value.`)
  }
  return decoded
}

function loadPrivateKey(): KeyObject {
  const pem = decodePem(env.JWT_PRIVATE_KEY, 'JWT_PRIVATE_KEY')
  let key: KeyObject
  try {
    key = crypto.createPrivateKey(pem)
  } catch (error) {
    throw new Error(
      `JWT_PRIVATE_KEY could not be parsed as an RSA private key: ${(error as Error).message}`,
    )
  }
  if (key.asymmetricKeyType !== 'rsa') {
    throw new Error(`JWT_PRIVATE_KEY must be RSA, got "${key.asymmetricKeyType}"`)
  }
  const bits = key.asymmetricKeyDetails?.modulusLength ?? 0
  if (bits < 2048) {
    throw new Error(`JWT_PRIVATE_KEY must be at least 2048 bits, got ${bits}`)
  }
  return key
}

function loadPublicKey(privateKey: KeyObject): KeyObject {
  // Deriving from the private key guarantees the pair always matches. An
  // explicit JWT_PUBLIC_KEY is honoured but checked for consistency.
  const derived = crypto.createPublicKey(privateKey)

  if (!env.JWT_PUBLIC_KEY) return derived

  const supplied = crypto.createPublicKey(decodePem(env.JWT_PUBLIC_KEY, 'JWT_PUBLIC_KEY'))
  const a = derived.export({ format: 'der', type: 'spki' })
  const b = supplied.export({ format: 'der', type: 'spki' })
  if (!a.equals(b)) {
    throw new Error('JWT_PUBLIC_KEY does not match JWT_PRIVATE_KEY')
  }
  return supplied
}

export const privateKey: KeyObject = loadPrivateKey()
export const publicKey: KeyObject = loadPublicKey(privateKey)

export const privateKeyPem: string = privateKey.export({ format: 'pem', type: 'pkcs8' }).toString()
export const publicKeyPem: string = publicKey.export({ format: 'pem', type: 'spki' }).toString()

/**
 * Stable key id: the RFC 7638 thumbprint of the public JWK. Derived rather than
 * configured, so it changes exactly when the key changes and never otherwise.
 */
export const keyId: string = (() => {
  const jwk = publicKey.export({ format: 'jwk' }) as { n: string; e: string }
  // RFC 7638 requires the canonical members in lexicographic order, no spaces.
  const canonical = JSON.stringify({ e: jwk.e, kty: 'RSA', n: jwk.n })
  return crypto.createHash('sha256').update(canonical).digest('base64url')
})()

/** The JWKS document served at /.well-known/jwks.json. */
export function buildJwks(): { keys: Record<string, string>[] } {
  const jwk = publicKey.export({ format: 'jwk' }) as { n: string; e: string }
  return {
    keys: [
      {
        kty: 'RSA',
        use: 'sig',
        alg: 'RS256',
        kid: keyId,
        n: jwk.n,
        e: jwk.e,
      },
    ],
  }
}
