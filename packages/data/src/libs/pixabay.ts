import { env } from './env'

const baseUrl = 'https://pixabay.com/api'

export async function fetchEditorVideos() {
  const response = await fetch(getApiUrl('videos', { editors_choice: 'true', per_page: '200', safesearch: 'true' }))

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`)
  }

  const { hits } = (await response.json()) as PixabayVideosResponse

  return hits
}

export function getPreviewUrl(video: PixabayVideo) {
  return `https://i.vimeocdn.com/video/${video.picture_id}_1920x1080.jpg`
}

function getApiUrl(route: string, params: Record<string, string | string[]> = {}) {
  const url = new URL(`${baseUrl}/${route.replace(/^\//, '')}`)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, Array.isArray(value) ? value.join(',') : value)
  }

  url.searchParams.set('key', env.PIXABAY_API_KEY)

  return url
}

interface PixabayVideosResponse {
  hits: PixabayVideo[]
  total: number
  totalHits: number
}

interface PixabayVideo {
  comments: number
  downloads: number
  duration: number
  id: number
  likes: number
  pageURL: string
  picture_id: string
  tags: string
  type: 'film' | 'animation'
  user_id: number
  user: string
  userImageURL: string
  videos: {
    [TSize in PixabayVideoSize]: PixabayVideoDetails
  }
  views: number
}

interface PixabayVideoDetails {
  height: number
  size: number
  url: string
  width: number
}

type PixabayVideoSize = 'tiny' | 'small' | 'medium' | 'large'
