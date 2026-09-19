import './style.css'
import { mount } from './app.js'

const root = document.querySelector('#app')
mount(root)

// Prevent iOS rubber-band scroll on running screen body bounce for cleaner feel
document.addEventListener(
  'touchmove',
  (e) => {
    if (document.querySelector('.screen.running, .screen.end')) {
      // allow nothing special — default scroll is fine on setup
    }
  },
  { passive: true }
)
