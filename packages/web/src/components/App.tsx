import videos from '@ntp/data'

const videoOfTheDay = videos[new Date().getDay()]

export function App() {
  if (!videoOfTheDay) {
    return null
  }

  return (
    <video autoPlay disablePictureInPicture loop muted>
      <source src={videoOfTheDay.videoUrl} type="video/mp4" />
    </video>
  )
}
