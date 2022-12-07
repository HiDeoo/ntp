import { type Video } from '@ntp/types'

import styles from '../styles/Player.module.css'

export function Player({ onLoadedData, video }: PlayerProps) {
  return (
    <video
      autoPlay
      className={styles['player']}
      disablePictureInPicture
      loop
      muted
      onLoadedData={onLoadedData}
      poster={video.poster}
    >
      <source src={video.url} type="video/mp4" />
    </video>
  )
}

interface PlayerProps {
  onLoadedData: () => void
  video: Video
}
