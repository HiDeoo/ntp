import { cacheNextVideo, currentVideo } from '../libs/video'

import { Player } from './Player'

export function App() {
  if (!currentVideo) {
    return null
  }

  return <Player onLoadedData={cacheNextVideo} video={currentVideo} />
}
