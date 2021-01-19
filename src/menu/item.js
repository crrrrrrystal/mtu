import { define } from '../../core.js'
import '../ripple/main.js'
import '../tooltip/main.js'

const template = `<style>:host{display:block;width:var(--menu-item-width,auto);height:var(--menu-item-height,48px);margin:var(--menu-item-margin,0);position:relative}.root{display:flex;height:100%;align-items:center;cursor:pointer;padding:var(--menu-item-padding,0 16px);overflow:hidden;border-radius:var(--menu-item-border-radius,0)}.title{flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tooltip{position:absolute;width:100%;height:100%;left:0;top:0;pointer-events:var(--menu-item-tooltip-pointer-events,none)}::slotted([slot=start]){margin-right:16px}::slotted([slot=end]){margin:0 -8px 0 16px}</style><m-ripple class="root" part="root" title=""><m-tooltip class="tooltip"></m-tooltip><slot name="start"></slot><div class="title"></div><slot name="end"></slot></m-ripple>`
const props = ['title']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const title = shadow.querySelector('.title')
  const tooltip = shadow.querySelector('.tooltip')
  root.addEventListener('click', () => {
    node.dispatchEvent(new Event('menu-close', { bubbles: true }))
  })
  return {
    title: {
      get: () => title.innerText,
      set: v => {
        title.innerText = v
        tooltip.title = v
      },
      sync: false
    }
  }
}

define('menu-item', { template, props, setup })