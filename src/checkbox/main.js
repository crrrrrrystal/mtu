import { define } from '../../core.js'
import '../ripple/main.js'

const template = `<style>:host{display:inline-flex;align-items:center;vertical-align:middle;position:relative;user-select:none;cursor:pointer}.root{border-radius:50%;overflow:hidden;width:40px;height:40px;justify-content:center;align-items:center}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}:host([checked=true]) .root{--color-ripple:rgba(var(--color-accent),.24)}:host([checked=true]) .icon::before{border-color:rgba(var(--color-accent));border-width:9px}:host([checked=true]) .icon::after{border-style:solid;transform:rotateZ(45deg) scale(1)}.icon{height:100%;width:100%;display:flex;justify-content:center;align-items:center;pointer-events:none}.icon::before,.icon::after{content:'';position:absolute;box-sizing:border-box}.icon::before{border:solid 2px var(--color-text-secondary);transition:border .1s;will-change:border;width:18px;height:18px;border-radius:2px}.icon::after{width:6px;height:11px;overflow:hidden;border-color:var(--color-background);border-width:0 2px 2px 0;transform:rotateZ(45deg) scale(0);transform-origin:90% 40%;transition:transform .2s;transition-delay:.1s;will-change:transform}</style><m-ripple class="root" part="root"><div class="icon"></div></m-ripple><slot></slot>`
const props = ['checked', 'disabled', 'value', 'name']

const setup = (shadow, node) => {
  node.addEventListener('click', () => {
    node.checked = !node.checked
    const ev = new Event('change')
    ev.checked = node.checked
    node.dispatchEvent(ev, { cancelable: true })
  })
  return {
    checked: false,
    disabled: false,
    value: {
      get: '',
      sync: false
    },
    name: '',
  }
}

define('checkbox', { template, props, setup })