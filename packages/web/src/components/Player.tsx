import { type Video } from '@ntp/types'
import { useRef, useState } from 'preact/hooks'

import styles from '../styles/Player.module.css'

import { Overlay, type OverlayState } from './Overlay'

export function Player({ onLoadedData, video }: PlayerProps) {
  const player = useRef<HTMLVideoElement>(null)

  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  function handleLoadedData() {
    setIsVideoLoaded(true)

    onLoadedData()
  }

  function handleOverlayStateChange({ showInfos }: OverlayState) {
    if (showInfos) {
      player.current?.pause()
    } else {
      player.current?.play()
    }
  }

  return (
    <>
      <video
        autoPlay
        className={styles['player']}
        disablePictureInPicture
        loop
        muted
        onLoadedData={handleLoadedData}
        preload="auto"
        ref={player}
      >
        <source src={video.url} type="video/mp4" />
      </video>
      <Overlay onOverlayStateChange={handleOverlayStateChange} video={video} visible={isVideoLoaded} />
    </>
  )
}

interface PlayerProps {
  onLoadedData: () => void
  video: Video
}
