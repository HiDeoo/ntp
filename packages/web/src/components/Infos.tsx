import { type Video } from '@ntp/types'
import clsx from 'clsx'
import { forwardRef } from 'preact/compat'

import { capitalize } from '../libs/string'
import styles from '../styles/Infos.module.css'

import { CopyIcon } from './CopyIcon'

export const Infos = forwardRef<HTMLDivElement, InfosProps>(({ video, visible }, forwardedRef) => {
  async function handleButtonClick() {
    try {
      await navigator.clipboard.writeText(video.id.toString())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={clsx(styles['infos'], visible && styles['visible'])} ref={forwardedRef}>
      <div className={styles['header']}>
        <p className={styles['credits']}>
          ©{' '}
          <a href={video.page} target="_blank" rel="noreferrer">
            {video.user}
          </a>{' '}
          /{' '}
          <a href="https://pixabay.com" target="_blank" rel="noreferrer">
            Pixabay
          </a>
        </p>
        <button
          className={styles['button']}
          onClick={handleButtonClick}
          title="Copy video ID to clipboard"
          type="button"
        >
          <CopyIcon />
        </button>
      </div>
      <hr />
      <ul className={styles['tags']}>
        {video.tags.map((tag, index) => (
          <li key={tag}>{index === 0 ? capitalize(tag) : tag}</li>
        ))}
      </ul>
    </div>
  )
})

interface InfosProps {
  video: Video
  visible: boolean
}
