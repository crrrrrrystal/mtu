import { define } from '../../core.js'
import './index.css'

let loaded = false
const template = `<style>:host{font-family:'Material Icons';font-weight:normal;user-select:none;color:var(--color-icon);font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased}div{opacity:0}</style><div translate="no">home</div>`
const props = ['src']

const setup = shadow => {
  const root = shadow.querySelector('div')
  const fonts = document.fonts
  loaded && (root.style.opacity = 1)
  !loaded && fonts.load('24px Material Icons').then(() => (root.style.opacity = 1, loaded = true))
  return {
    src: {
      get: () => root.innerHTML,
      set: v => root.innerHTML = v,
      sync: false
    }
  }
}

define('icon', { template, props, setup })