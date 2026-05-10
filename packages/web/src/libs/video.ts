import videos from '@ntp/data'

import { cacheResource, videoCacheName } from './sw'

const currentDay = new Date().getDay()

export const currentVideo = videos[currentDay]

export function cacheVideos() {
  if (!currentVideo) {
    return
  }

  void cacheCurrentThenNextVideo(currentVideo.url)
}

async function cacheCurrentThenNextVideo(currentVideoUrl: string) {
  await cacheVideo(currentVideoUrl, 'current')

  const nextDay = currentDay + 1 > 6 ? 0 : currentDay + 1
  const nextVideo = videos[nextDay]

  if (nextVideo) {
    await cacheVideo(nextVideo.url, 'next')
  }
}

async function cacheVideo(videoUrl: string, label: string) {
  try {
    await cacheResource(videoCacheName, videoUrl)
  } catch (error) {
    console.error(`Failed to cache ${label} video at '${videoUrl}'`, error)
  }
}
