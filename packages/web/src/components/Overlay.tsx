import { type Video } from '@ntp/types'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'preact/hooks'

import { useOnClickOutside } from '../hooks/useOnClickOutside'
import styles from '../styles/Overlay.module.css'

import { InfoIcon } from './InfoIcon'
import { Infos } from './Infos'

export function Overlay({ visible, onOverlayStateChange, video }: OverlayProps) {
  const button = useRef<HTMLButtonElement>(null)
  const popup = useRef<HTMLDivElement>(null)

  const [showInfos, setShowInfos] = useState(false)

  useOnClickOutside(popup, (event) => {
    if (
      !showInfos ||
      ((event.target instanceof HTMLElement || event.target instanceof SVGElement) &&
        button.current?.contains(event.target))
    ) {
      return
    }

    setShowInfos(false)
  })

  useEffect(() => {
    onOverlayStateChange({ showInfos })
  }, [onOverlayStateChange, showInfos])

  function handleButtonClick() {
    setShowInfos((prevShowInfos) => !prevShowInfos)
  }

  return (
    <div className={clsx(styles['overlay'], visible && styles['visible'])}>
      <Infos ref={popup} video={video} visible={showInfos} />
      <menu className={styles['menu']}>
        <li>
          <button
            className={styles['button']}
            onClick={handleButtonClick}
            ref={button}
            title="More informations about this video"
            type="button"
          >
            <InfoIcon />
          </button>
        </li>
      </menu>
    </div>
  )
}

interface OverlayProps {
  onOverlayStateChange: (state: OverlayState) => void
  video: Video
  visible: boolean
}

export interface OverlayState {
  showInfos: boolean
}
