import fs from 'node:fs/promises'

import { type Video } from '@ntp/types'
import sampleSize from 'lodash.samplesize'

import { fetchEditorVideos, getPreviewUrl } from './libs/pixabay'

const videos = await fetchEditorVideos()

// Pick 7 random videos (one for each day of the week).
const videosOfTheWeek: Video[] = sampleSize(videos, 7).map((video) => {
  return {
    id: video.id,
    page: video.pageURL,
    poster: getPreviewUrl(video),
    url: video.videos.large.size > 0 ? video.videos.large.url : video.videos.medium.url,
    tags: video.tags.split(', '),
    user: video.user,
  }
})

await fs.rm('dist', { force: true, recursive: true })
await fs.mkdir('dist')

await fs.writeFile('dist/videos.json', JSON.stringify(videosOfTheWeek))
