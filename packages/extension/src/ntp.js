const iframe = document.querySelector('iframe')

if (iframe) {
  iframe.addEventListener('load', () => {
    iframe.style.visibility = 'visible'
  })
}
