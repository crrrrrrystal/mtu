import { define } from '../../core.js'
import '../ripple/index.js'

const template = `<style>:host{display:block;height:inherit;justify-content:center;align-items:center;min-width:72px;height:100%;cursor:pointer;flex-shrink:0}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}:host([checked=true]){color:rgba(var(--color-accent));--color-icon:rgba(var(--color-accent));--color-ripple:rgba(var(--color-accent),.24)}.root{height:100%;display:flex;justify-content:center;align-items:center;padding:0 8px}::slotted(m-icon[slot=start]){margin-right:8px}::slotted(m-icon[slot=end]){margin-left:8px}</style><m-ripple class="root" part="root"><slot name="start"></slot><slot></slot><slot name="end"></slot></m-ripple>`

const props = ['disabled', 'checked']
const setup = (shadow, node) => {
  const index = () => [].slice.call(node.parentNode.children).indexOf(node)
  node.addEventListener('click', () => node.parentNode.select = index())
  return {
    disabled: false,
    checked: false
  }
}

define('tab-item', { template, props, setup })
