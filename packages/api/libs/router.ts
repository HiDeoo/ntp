import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

import { type Env } from './env'

export { validator as validate } from 'hono/validator'

export const router = new Hono<{ Bindings: Env }>()

router.use('/*', async (context, next) => {
  const auth = bearerAuth({ token: context.env.API_KEY })

  await auth(context, next)

  await next()
})

router.onError((error, context) => {
  console.error(error)

  return context.json({ error: error.message }, 400)
})

export function createRoute() {
  return new Hono<{ Bindings: Env }>()
}
