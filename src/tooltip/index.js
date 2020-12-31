import { define } from '../../core.js'

const template = `<style>:host{display:inline-block;vertical-align:middle}.root{z-index:3;ser-select:none;position:fixed;left:0;top:0;background:rgba(97,97,97,.9);color:#fff;border-radius:2px;padding:6px 8px;font-size:12px;line-height:18px;max-width:112px;letter-spacing:2px;word-wrap:break-word;word-break:break-all;pointer-events:none;transform:scale(.9);opacity:0;transition:transform .2s,opacity .2s}.show.root{transform:scale(1);opacity:1}</style><slot title=""></slot><div class="root" part="root"></div>`
const props = ['title']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const open = () => {
    const view = node
    const rect = view.getBoundingClientRect()
    const w = window.innerWidth, h = window.innerHeight, m = 8
    //offsetParent
    let top = rect.top + view.offsetHeight + m, left = rect.left - ((root.offsetWidth - view.offsetWidth) / 2)
    if (h - (rect.top + view.offsetHeight + m + root.offsetHeight) < 0) top = (rect.top - (m + root.offsetHeight))
    if (left + root.offsetWidth > w) left = (rect.left + view.offsetWidth) - root.offsetWidth
    if (left < 0) left = rect.left
    root.style.top = top + 'px'
    root.style.left = left + 'px'
    root.classList.add('show')
  }
  const close = () => root.classList.remove('show')
  node.addEventListener('mouseover', () => {
    if (document.ontouchstart === null) return
    root.removeAttribute('style')
    open()
  })
  node.addEventListener('mouseout', () => document.ontouchstart !== null && close())
  node.addEventListener('touchstart', () => (root.style.transitionDelay = '.4s', open()))
  node.addEventListener('touchend', close)
  node.addEventListener('touchcancel', close)

  return {
    title: {
      get: () => root.innerText,
      set: v => root.innerText = v,
      sync: false
    }
  }
}

define('tooltip', { template, props, setup })