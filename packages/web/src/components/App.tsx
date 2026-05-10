import { cacheVideos, currentVideo } from '../libs/video'

import { Player } from './Player'

export function App() {
  if (!currentVideo) {
    return null
  }

  return <Player onLoadedData={cacheVideos} video={currentVideo} />
}
