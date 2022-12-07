export async function isResourceCached(cacheName: string, resourceUri: string) {
  if ('serviceWorker' in navigator === false || 'caches' in window === false) {
    return false
  }

  const cache = await caches.open(cacheName)
  const response = await cache.match(resourceUri)

  return response !== undefined
}
