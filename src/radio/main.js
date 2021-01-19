import { define } from '../../core.js'
import '../ripple/main.js'

const template = `<style>:host{display:inline-flex;align-items:center;vertical-align:middle;position:relative;cursor:pointer;user-select:none}.root{width:40px;height:40px;border-radius:50%;overflow:hidden;justify-content:center;text-align:center}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}:host([checked=true]) .root{--color-ripple:rgba(var(--color-accent),.24)}:host([checked=true]) .icon::before{border-color:rgba(var(--color-accent));border-width:9px}:host([checked=true]) .icon::after{opacity:1;transform:scale(.8);border-width:4px}.icon{height:100%;width:100%;display:flex;justify-content:center;align-items:center;pointer-events:none}.icon::before,.icon::after{content:'';position:absolute;width:18px;height:18px;border-radius:50%;box-sizing:border-box}.icon::before{border:solid 2px var(--color-text-secondary);transition:border-width .1s;will-change:border-width}.icon::after{opacity:0;background:rgba(var(--color-accent));border:solid 0 var(--color-background);transition:border-width .2s,transform .2s;will-change:transform}</style><m-ripple class="root" part="root"><div class="icon"></div></m-ripple><slot></slot>`
const props = ['disabled', 'checked', 'value', 'name']

const setup = (shadow, node) => {
  node.addEventListener('click', () => {
    if (node.checked === true) return
    node.checked = true
    const ev = new Event('change')
    ev.checked = node.checked
    node.dispatchEvent(ev)
    if (node.hasAttribute('name') === false) return
    const all = document.querySelectorAll('m-radio[name=' + node.getAttribute('name') + ']')
    for (const item of all) {
      if (item === node) continue
      item.checked = false
    }
  })
  return {
    disabled: false,
    checked: false,
    value: {
      get: '',
      sync: false
    },
    name: ''
  }
}

define('radio', { template, props, setup })