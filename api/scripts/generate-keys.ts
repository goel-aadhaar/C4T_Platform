import crypto from 'node:crypto'

/**
 * Generates the RS256 key pair used to sign access tokens.
 *
 *   npm run keys:generate
 *
 * Prints base64-encoded PEM, because a multi-line PEM inside a .env file is a
 * reliable source of pain. The API accepts either form.
 *
 * Operational notes:
 *   - The PRIVATE key is a credential. Never commit it. In production put it in
 *     AWS Secrets Manager or SSM Parameter Store (SecureString) and load it into
 *     the environment at boot.
 *   - The PUBLIC key is not secret; it is already served at
 *     /.well-known/jwks.json. JWT_PUBLIC_KEY is optional — the API derives it
 *     from the private key and only uses the env value as a consistency check.
 *   - Rotating the key changes the `kid`, which invalidates every access token
 *     immediately. Refresh tokens are unaffected, so clients recover on their
 *     next refresh rather than being forced to sign in again.
 */

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
})

const b64 = (pem: string) => Buffer.from(pem, 'utf8').toString('base64')

// Same RFC 7638 thumbprint the API derives at boot, shown here so you can
// confirm a deployment is running the key you think it is.
const jwk = crypto.createPublicKey(publicKey).export({ format: 'jwk' }) as { n: string; e: string }
const kid = crypto
  .createHash('sha256')
  .update(JSON.stringify({ e: jwk.e, kty: 'RSA', n: jwk.n }))
  .digest('base64url')

console.log('# RS256 key pair for Crowd4Test API access tokens')
console.log(`# Key id (kid): ${kid}`)
console.log('# Copy the two lines below into your .env file.\n')
console.log(`JWT_PRIVATE_KEY=${b64(privateKey)}`)
console.log(`JWT_PUBLIC_KEY=${b64(publicKey)}`)
console.log('\n# Keep JWT_PRIVATE_KEY secret. JWT_PUBLIC_KEY is safe to share.')
