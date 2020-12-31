import { define } from '../../core.js'
import '../ripple/index.js'
import '../tooltip/index.js'

const template = `<style>:host{display:block}:host([disabled=true]) .ripple{pointer-events:none;filter:grayscale(1);opacity:.4}.ripple{height:48px;display:flex;align-items:center;cursor:pointer;pointer-events:auto;overflow:hidden}.tooltip{display:none;justify-content:center;align-items:center;width:100%;height:100%;position:absolute;left:0;top:0}::slotted(m-icon[slot=start]){margin:12px 0 12px 16px;flex-shrink:0}.text{margin:8px 16px;white-space:nowrap;overflow:hidden;flex-grow:1}::slotted(m-checkbox[slot=end]),::slotted(m-radio[slot=end]){flex-shrink:0;margin:4px 5px 4px -11px}.arrow{width:24px;height:24px;margin-right:8px;display:none;transform:rotate(-90deg);transition:transform .2s;flex-shrink:0}.show .arrow{display:block}.arrow>svg{width:100%;height:100%;fill:var(--color-icon)}::slotted(m-menu){position:static;pointer-events:auto}@media(min-width:720px){:host([theme=appbar]),:host([theme=appbar-dark]){position:relative;margin-left:8px}:host([theme=appbar]) .tooltip,:host([theme=appbar-dark]) .tooltip{display:flex}:host([theme=appbar]) .ripple,:host([theme=appbar-dark]) .ripple{width:40px;height:40px;border-radius:50%}:host([theme=appbar-dark]) .ripple{--color-ripple:rgba(255,255,255,.4);--color-icon:#fff}:host([theme=appbar]) ::slotted(m-icon[slot=start]),:host([theme=appbar-dark]) ::slotted(m-icon[slot=start]){margin:0 8px}}</style><div class="root"><m-ripple class="ripple"><m-tooltip class="tooltip"><div style="height: 100%;width: 100%"></div></m-tooltip><slot name="start"></slot><div class="text"><slot name="title"></slot></div><slot name="end"></slot><div class="arrow"><svg viewBox="0 0 1024 1024"><path d="M298.666667 426.666667l213.333333 213.333333 213.333333-213.333333H298.666667z"></path></svg></div></m-ripple><div class="list"><slot></slot></div></div>`
const props = ['disabled', 'theme', 'tooltip']

const setup = (shadow, node) => {
  const tooltip = shadow.querySelector('.tooltip')
  const root = shadow.querySelector('.root')
  const view = shadow.querySelector('.list>slot')
  view.addEventListener('slotchange', () => root.classList[view.assignedElements().length == 0 ? 'remove' : 'add']('show'))
  node.addEventListener('click', () => {
    const son = view.assignedElements()
    const parent = node.parentNode.parentNode
    if (['appbar', 'appbar-dark'].indexOf(parent.theme) !== -1 && window.innerWidth > 720 && son.length == 0) return
    if (son.length == 0 || son[0].tagName !== 'M-MENU') return parent.close()
    son[0].open()
    node.dispatchEvent(new Event('menu-open', { bubbles: true }))
  })

  return {
    disabled: false,
    theme: ['none', 'appbar', 'appbar-dark'],
    tooltip: {
      get: () => tooltip.title,
      set: v => tooltip.title = v,
      sync: false
    }
  }
}

define('menu-item', { template, props, setup })