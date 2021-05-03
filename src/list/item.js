import { define } from '../../core.js'
import { transitionEnd } from '../../util.js'
import '../ripple/main.js'

const template = `<style>:host{display:block;min-height:48px}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.6}:host([checked=true]){background:var(--color-border)}:host([checked=true]) ::slotted([slot=start]),:host([checked=true]) ::slotted([slot=subtitle]),:host([checked=true]) ::slotted([slot=title]){color:rgba(var(--color-accent))}:host([checked=true]) .arrow>svg{fill:rgba(var(--color-accent))}.root{height:inherit;min-height:inherit;display:flex;align-items:center;user-select:none;cursor:pointer}.text{display:flex;flex-direction:column;justify-content:center;flex-grow:1;margin:8px 16px;word-wrap:break-word;word-break:break-all;line-height:1}::slotted([slot=title]){font-size:.9375rem}::slotted([slot=subtitle]){color:var(--color-text-secondary);margin-top:4px}.arrow{width:24px;height:24px;margin-right:8px;display:none;transition:transform .2s}:host([state=true]) .arrow{transform:rotate(90deg)}.show .arrow{display:block}.arrow>svg{width:100%;height:100%;fill:var(--color-icon)}.list{overflow:hidden;transition:height .2s;position:relative;background:var(--color-background-bar)}:host(:not([state=true])) .list{height:0}.view{display:block}::slotted([slot=start]){margin-left:16px;flex-shrink:0}::slotted([slot=end]){margin-right:8px;flex-shrink:0}::slotted(s-list){padding:0}</style><m-ripple class="root" title="" part="root"><slot name="start"></slot><div class="text"><slot name="title"></slot><slot name="subtitle"></slot></div><slot name="end"></slot><div class="arrow"><svg><path d="M10 7l5 5-5 5z"></path></svg></div></m-ripple><div class="list"><slot class="view"></slot></div>`
const props = ['disabled', 'state', 'checked']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const list = shadow.querySelector('.list')
  const view = shadow.querySelector('.view')
  view.addEventListener('slotchange', () => root.classList[view.assignedElements().length == 0 ? 'remove' : 'add']('show'))

  root.addEventListener('click', () => {
    if (root.classList.contains('show')) {
      list.style.height = view.offsetHeight + 'px'
      if (node.state) {
        window.getComputedStyle(list).top
        list.style.height = '0px'
      }
      transitionEnd(list, () => list.removeAttribute('style'))
      node.state = !node.state
    }
  })

  return {
    disabled: false,
    state: false,
    checked: false
  }
}

define('list-item', { template, props, setup })