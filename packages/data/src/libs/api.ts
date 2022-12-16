import { env } from './env'

export async function getBlockedVideos() {
  try {
    const response = await fetch(`${env.NTP_API_URL}/blocks`, {
      headers: {
        Authorization: `Bearer ${env.NTP_API_KEY}`,
      },
    })

    return (await response.json()) as number[]
  } catch (error) {
    console.error(`Failed to fetch blocked videos: ${error}`)

    return []
  }
}
