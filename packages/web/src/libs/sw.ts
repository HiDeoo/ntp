export const videoCacheName = 'videos'

export async function cacheResource(cacheName: string, resourceUri: string) {
  if ('serviceWorker' in navigator === false || 'caches' in window === false) {
    return
  }

  const cache = await caches.open(cacheName)

  if (await cache.match(resourceUri)) {
    return
  }

  await cache.add(new Request(resourceUri, { credentials: 'same-origin', mode: 'cors' }))
}
