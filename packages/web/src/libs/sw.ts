export const videoCacheName = 'videos'

const pendingResources = new Set<string>()

export async function cacheResource(cacheName: string, resourceUri: string) {
  if ('serviceWorker' in navigator === false || 'caches' in window === false) {
    return
  }

  const cacheKey = `${cacheName}:${resourceUri}`

  if (pendingResources.has(cacheKey)) {
    return
  }

  pendingResources.add(cacheKey)

  try {
    const cache = await caches.open(cacheName)

    if (await cache.match(resourceUri)) {
      return
    }

    await cache.add(new Request(resourceUri, { credentials: 'same-origin', mode: 'cors' }))
  } finally {
    pendingResources.delete(cacheKey)
  }
}
