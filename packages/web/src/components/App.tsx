import videos from '@ntp/data'

import { isResourceCached } from '../libs/sw'

const dayIndex = new Date().getDay()
const videoOfTheDay = videos[dayIndex]

export function App() {
  if (!videoOfTheDay) {
    return null
  }

  return (
    <video autoPlay disablePictureInPicture loop muted onLoadedData={handleLoadedData}>
      <source src={videoOfTheDay.videoUrl} type="video/mp4" />
    </video>
  )
}

async function handleLoadedData() {
  const nextDayIndex = dayIndex + 1 > 6 ? 0 : dayIndex + 1
  const nextVideo = videos[nextDayIndex]

  if (!videoOfTheDay || !nextVideo) {
    return
  }

  const [isVideoCached, isNextVideoCached] = await Promise.all([
    isResourceCached('videos', videoOfTheDay.videoUrl),
    isResourceCached('videos', nextVideo.videoUrl),
  ])

  if (!isVideoCached || isNextVideoCached) {
    return
  }

  try {
    await fetch(nextVideo.videoUrl, { mode: 'no-cors' })
  } catch (error) {
    console.error(`Failed to cache video at '${nextVideo.videoUrl}'`, error)
  }
}
