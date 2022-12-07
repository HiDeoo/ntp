import { render } from 'preact'

import { App } from './components/App'

import './styles/global.css'

render(<App />, document.querySelector('.app') as HTMLElement)
