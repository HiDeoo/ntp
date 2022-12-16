import { type Video } from '@ntp/types'

import { type Env } from './env'

const kvKeys = {
  blocks: 'blocks',
}

export async function getBlockedVideos(env: Env): Promise<Videos> {
  const rawBlockedVideos = await env.KV.get(kvKeys.blocks)

  if (!rawBlockedVideos) {
    return []
  }

  try {
    return JSON.parse(rawBlockedVideos) as Video['id'][]
  } catch (error) {
    throw new Error(`Failed to parse blocked videos: ${error}`)
  }
}

export async function blockVideo(env: Env, id: Video['id']): Promise<Videos> {
  const blockedVideos = await getBlockedVideos(env)

  if (blockedVideos.includes(id)) {
    return blockedVideos
  }

  const newBlockedVideos = [...blockedVideos, id]

  await env.KV.put(kvKeys.blocks, JSON.stringify(newBlockedVideos))

  return newBlockedVideos
}

export async function unblockVideo(env: Env, id: Video['id']): Promise<Videos> {
  const blockedVideos = await getBlockedVideos(env)

  if (!blockedVideos.includes(id)) {
    return blockedVideos
  }

  const newBlockedVideos = blockedVideos.filter((blockedVideo) => blockedVideo !== id)

  await env.KV.put(kvKeys.blocks, JSON.stringify(newBlockedVideos))

  return newBlockedVideos
}

type Videos = Video['id'][]
