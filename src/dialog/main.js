import { global, define, transitionEnd } from '../../core.js'
import '../ripple/main.js'

const template = `<style>:host{display:flex;position:fixed;top:0;left:0;width:100%;height:100%;justify-content:center;align-items:center;padding:24px;box-sizing:border-box;pointer-events:none;opacity:0;transition:opacity .2s}:host([state=true]){opacity:1;pointer-events:auto}.mask{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6)}.root{background:var(--color-background-card);box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);border-radius:2px;width:100%;max-width:392px;display:flex;flex-direction:column;max-height:100%;position:relative;transition:transform .2s;transform:scale(.9)}:host([state=true]) .root{transform:scale(1)}.title{font-size:1.25rem;font-weight:500;letter-spacing:1px;user-select:none;word-break:break-all;flex-shrink:0;margin:24px 24px 20px 24px}.title:empty{display:none}.title:not(:empty)+.content>.message{margin-top:0}.content{overflow:auto;scrollbar-width:none}.message{line-height:1.6;white-space:pre-wrap;margin:24px}.message:empty{display:none}.message::selection{background:rgba(var(--color-accent));color:#fff}.content::-webkit-scrollbar{display:none}.action{flex-shrink:0;display:flex;justify-content:flex-end;margin:12px;flex-wrap:wrap}.action>.button{height:36px;min-width:48px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(var(--color-accent));padding:0 8px;border-radius:2px;overflow:hidden;user-select:none;font-weight:500;text-transform:uppercase;--color-ripple:rgba(var(--color-accent),.14)}.action>.button:empty{display:none}:host(:not([positive]):not([negative])) .action{display:none}:host([positive=""]):host([negative=""]) .action{display:none}.action>.button+.button{margin-left:8px}</style><div class="mask" title=""></div><div class="root" part="root" title=""><div class="title" part="title"></div><div class="content" part="content"><div class="message"></div><slot></slot></div><div class="action"><m-ripple class="button positive" part="button"></m-ripple><m-ripple class="button negative" part="button"></m-ripple></div></div>`
const props = ['state', 'title', 'message', 'positive', 'negative']

const setup = (shadow, node) => {
  const title = shadow.querySelector('.title')
  const message = shadow.querySelector('.message')
  const positive = shadow.querySelector('.positive')
  const negative = shadow.querySelector('.negative')
  const mask = shadow.querySelector('.mask')
  const close = () => {
    node.state = false
    transitionEnd(node, () => node.dispatchEvent(new Event('close')))
  }
  mask.addEventListener('click', close)
  positive.addEventListener('click', () => {
    close()
    node.dispatchEvent(new Event('positive'))
  })
  negative.addEventListener('click', () => {
    close()
    node.dispatchEvent(new Event('negative'))
  })
  return {
    state: false,
    title: {
      get: () => title.innerText,
      set: v => title.innerText = v,
      sync: false
    },
    message: {
      get: () => message.innerText,
      set: v => message.innerText = v,
      sync: false
    },
    positive: {
      get: () => positive.innerText,
      set: v => positive.innerText = v,
      sync: false
    },
    negative: {
      get: () => negative.innerText,
      set: v => negative.innerText = v,
      sync: false
    }
  }
}

define('dialog', { template, props, setup })

global.dialog = ({ title = '', message = '', positive = '', negative = '', onPositive = null, onNegative = null, onClose = null }) => {
  const dom = document.createElement('m-dialog')
  dom.title = title
  dom.message = message
  dom.positive = positive
  dom.negative = negative
  dom.addEventListener('positive', e => {
    onPositive && onPositive(e)
  })
  dom.addEventListener('negative', e => {
    onNegative && onNegative(e)
  })
  dom.addEventListener('close', () => {
    onClose && onClose()
    document.body.removeChild(dom)
  })
  document.body.appendChild(dom)
  window.getComputedStyle(dom).top
  dom.state = true
}