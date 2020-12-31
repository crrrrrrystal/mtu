import { define } from '../../core.js'
import '../ripple/index.js'

const template = `<style>:host{display:inline-block;vertical-align:middle;min-height:36px;border-radius:2px;min-width:64px;background:var(--color-border);text-transform:uppercase;cursor:pointer;user-select:none;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);font-size:.9rem;overflow:hidden;letter-spacing:.0625rem;position:relative}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}:host([mode=circle]){border-radius:50%;min-width:auto;width:40px;height:40px}:host([theme=accent]){background:rgba(var(--color-accent));color:#fff;--color-icon:#fff;--color-ripple:rgba(255,255,255,.4)}:host([theme=text]),:host([theme=plain]){background:0;box-shadow:none}:host([theme=plain])::before{content:'';height:100%;width:100%;position:absolute;left:0;top:0;border-radius:inherit;border:solid 1px var(--color-border);pointer-events:none;box-sizing:border-box}.root{width:100%;border-radius:inherit;min-height:inherit;height:inherit;display:flex;justify-content:center;padding:0 8px;box-sizing:border-box;align-items:center}::slotted(*){flex-shrink:0}::slotted([slot=start]){margin-right:8px}::slotted([slot=end]){margin-left:8px}</style><m-ripple class="root" part="root"><slot name="start"></slot><slot></slot><slot name="end"></slot></m-ripple>`
const props = ['disabled', 'theme', 'mode']
const setup = () => {
  return {
    disabled: false,
    theme: ['none', 'accent', 'text', 'plain'],
    mode: ['none', 'circle']
  }
}

define('button', { template, props, setup })