import { blockVideo, getBlockedVideos, unblockVideo } from '../libs/kv'
import { createRoute, validate } from '../libs/router'

export const blocksRoute = createRoute()

blocksRoute.get('/', async (context) => {
  const blockedVideos = await getBlockedVideos(context.env)

  return context.json(blockedVideos)
})

blocksRoute.post(
  '/',
  validate((validator) => ({
    id: validator.json('id').asNumber().isRequired(),
  })),
  async (context) => {
    const { id } = context.req.valid()

    const blockedVideos = await blockVideo(context.env, id)

    if (!context.env.IS_DEV) {
      await fetch(context.env.DEPLOY_HOOK, { method: 'POST' })
    }

    return context.json(blockedVideos)
  }
)

blocksRoute.delete('/:id', async (context) => {
  const id = Number.parseInt(context.req.param('id'), 10)

  if (Number.isNaN(id)) {
    throw new TypeError('Invalid blocked video ID.')
  }

  const blockedVideos = await unblockVideo(context.env, id)

  return context.json(blockedVideos)
})
