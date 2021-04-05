import { define } from '../../core.js'

const template = `<style>:host{display:inline-block;vertical-align:middle}.root{z-index:3;user-select:none;position:fixed;left:0;top:0;background:rgba(97,97,97,.9);color:#fff;border-radius:2px;padding:6px 8px;font-size:12px;line-height:18px;max-width:112px;letter-spacing:2px;word-wrap:break-word;word-break:break-all;pointer-events:none;transform:scale(.9);opacity:0;transition:transform .2s,opacity .2s}@media(pointer:fine){:host(:hover) .root{transform:scale(1);opacity:1}}@media(pointer:coarse){:host(:active) .root{transform:scale(1);opacity:1}}</style><slot></slot><div class="root" part="root"></div>`
const props = ['value']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const position = () => {
    const rect = node.getBoundingClientRect()
    const w = window.innerWidth, h = window.innerHeight, m = 8
    let top = rect.top + node.offsetHeight + m, left = rect.left - ((root.offsetWidth - node.offsetWidth) / 2)
    if (h - (rect.top + node.offsetHeight + m + root.offsetHeight) < 0) top = (rect.top - (m + root.offsetHeight))
    if (left + root.offsetWidth > w) left = (rect.left + node.offsetWidth) - root.offsetWidth
    if (left < 0) left = rect.left
    root.style.top = top + 'px'
    root.style.left = left + 'px'
  }
  node.addEventListener('mouseover', position)
  node.addEventListener('touchstart', position)
  return {
    value: {
      get: () => root.innerText,
      set: v => root.innerText = v
    }
  }
}

define('tooltip', { template, props, setup })