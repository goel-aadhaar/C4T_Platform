import supertest from 'supertest'
import type { Express } from 'express'
import { createApp } from '../../src/app.js'
import { PASSWORD } from './fixtures.js'

let app: Express | null = null

export function testApp(): Express {
  app ??= createApp()
  return app
}

/**
 * A signed-in API client.
 *
 * Uses the Authorization header rather than the cookie jar. The refresh cookie
 * is path-scoped to /v1/auth, which supertest handles inconsistently, and the
 * header path is what a non-browser client would use anyway.
 */
export class Client {
  private constructor(
    readonly token: string,
    readonly userId: string,
    readonly email: string,
  ) {}

  static async signIn(email: string): Promise<Client> {
    const response = await supertest(testApp())
      .post('/v1/auth/login')
      .send({ email, password: PASSWORD })

    if (response.status !== 200) {
      throw new Error(
        `Sign-in failed for ${email}: ${response.status} ${JSON.stringify(response.body)}`,
      )
    }

    return new Client(
      response.body.data.accessToken as string,
      response.body.data.user.id as string,
      email,
    )
  }

  get(path: string) {
    return supertest(testApp()).get(path).set('authorization', `Bearer ${this.token}`)
  }

  post(path: string, body?: unknown) {
    const request = supertest(testApp()).post(path).set('authorization', `Bearer ${this.token}`)
    return body === undefined ? request : request.send(body as object)
  }

  patch(path: string, body?: unknown) {
    const request = supertest(testApp()).patch(path).set('authorization', `Bearer ${this.token}`)
    return body === undefined ? request : request.send(body as object)
  }

  put(path: string, body?: unknown) {
    const request = supertest(testApp()).put(path).set('authorization', `Bearer ${this.token}`)
    return body === undefined ? request : request.send(body as object)
  }

  delete(path: string) {
    return supertest(testApp()).delete(path).set('authorization', `Bearer ${this.token}`)
  }
}

/** Unauthenticated request. */
export function anon() {
  return supertest(testApp())
}
