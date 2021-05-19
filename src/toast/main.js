import { global, define } from '../../core.js'
import '../ripple/main.js'

const template = `<style>:host{display:inline-block;vertical-align:middle}.root{z-index:3;display:flex;width:100%;position:fixed;justify-content:center;pointer-events:none;user-select:none;top:0;left:0}.body{box-shadow:0 3px 5px -1px rgb(0 0 0 / 20%),0 6px 10px 0 rgb(0 0 0 / 14%),0 1px 18px 0 rgb(0 0 0 / 12%);background:#323232;border-radius:4px;display:flex;align-items:center;justify-content:space-between;min-height:48px;max-width:344px;width:100%;color:rgba(255,255,255,.7);box-sizing:border-box;margin:24px 16px;pointer-events:auto;filter:opacity(0);transform:scale(.8);transition:filter .2s,transform .2s}:host([state=true]) .body{filter:opacity(1);transform:scale(1)}.text{letter-spacing:1px;line-height:1.6;margin:8px 16px;word-break:break-all}.action{color:rgba(var(--color-accent));cursor:pointer;height:32px;min-width:36px;overflow:hidden;border-radius:2px;padding:0 8px;display:flex;align-items:center;justify-content:center;margin:0 8px 0 -8px;text-transform:uppercase;font-size:.875rem;--color-ripple:rgba(var(--color-accent), .24)}.action:empty{display:none}</style><slot name="active"></slot><div class="root" part="root"><div class="body" part="body"><div class="text" part="text"><slot></slot></div><m-ripple class="action"></m-ripple></div></div>`
const props = ['state', 'action']

const setup = (shadow, node) => {
  const slot = shadow.querySelector('slot')
  const action = shadow.querySelector('.action')
  slot.addEventListener('click', () => node.state = true)
  action.addEventListener('click', () => {
    node.dispatchEvent(new Event('close'))
    node.state = false
  })
  return {
    state: false,
    action: {
      get: () => action.innerText,
      set: v => action.innerText = v
    }
  }
}

define('toast', { template, props, setup })

const dom = document.createElement('m-toast')
global.toast = (text, { action = '', onClose, duration = 3000 } = {}) => {
  document.body.appendChild(dom)
  const o = document.querySelector('body>m-toast')
  if (o && o.state === true) {
    clearTimeout(dom.setTimeout)
    o.state = false
  }
  dom.action = action
  onClose && (dom.onclose = onClose)
  dom.innerText = text
  window.getComputedStyle(dom).top
  dom.state = true
  if (duration > 0) dom.setTimeout = setTimeout(() => dom.state = false, duration)
}