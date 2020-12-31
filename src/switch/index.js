import { define } from '../../core.js'
import '../ripple/index.js'

const template = `<style>:host{display:inline-flex;align-items:center;vertical-align:middle;position:relative;user-select:none;cursor:pointer}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}:host([checked=true]) .root::before{background:rgba(var(--color-accent),.24)}:host([checked=true]) .ripple{transform:translateX(16px);--color-ripple:rgba(var(--color-accent),.24)}:host([checked=true]) .ripple::after{background:rgba(var(--color-accent))}.root{display:flex;justify-content:center;align-items:center;position:relative;height:36px}.root::before{content:'';box-sizing:border-box;background:var(--color-text-disabled);height:14px;width:36px;border-radius:8px;margin:2px 8px;transition:background .2s}.ripple{width:36px;height:36px;border-radius:50%;overflow:hidden;position:absolute;left:0;display:flex;align-items:center;justify-content:center;transition:transform .2s}.ripple::after{content:'';position:absolute;left:8px;background:#fafafa;width:20px;height:20px;border-radius:50%;box-shadow:0 1px 3px 0 rgba(0,0,0,.24);transition:background .2s}</style><slot></slot><div class="root"><m-ripple class="ripple"></m-ripple></div>`
const props = ['disabled', 'checked', 'value']

const setup = (shadow, node) => {
  node.addEventListener('click', () => {
    node.checked = !node.checked
    const ev = new Event('change')
    ev.checked = node.checked
    node.dispatchEvent(ev)
  })
  return {
    disabled: false,
    checked: false,
    value: {
      get: '',
      sync: false
    }
  }
}

define('switch', { template, props, setup })