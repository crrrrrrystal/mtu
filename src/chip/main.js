import { define } from '../../core.js'

const template = `<style>:host{display:inline-flex;vertical-align:middle;border-radius:16px;background:var(--color-border);align-items:center;min-height:32px;user-select:none;transition:box-shadow .2s}.root{padding:0 12px;line-height:1.6}::slotted([slot=start]){height:32px;width:32px;font-size:32px;border-radius:50%;margin-right:-4px}::slotted(m-button[slot=end]){height:32px;min-height:32px;width:32px;margin-left:-8px;box-shadow:none;background:0}:host([checked=true]){background:rgba(var(--color-accent));color:#fff;--color-icon:#fff;--color-ripple:rgba(255,255,255,.4)}@media(pointer:fine){:host(:hover){box-shadow:0 3px 1px -2px rgb(0 0 0 / 20%),0 2px 2px 0 rgb(0 0 0 / 14%),0 1px 5px 0 rgb(0 0 0 / 12%)}}@media(pointer:coarse){:host(:active){box-shadow:0 3px 1px -2px rgb(0 0 0 / 20%),0 2px 2px 0 rgb(0 0 0 / 14%),0 1px 5px 0 rgb(0 0 0 / 12%)}}</style><slot name="start"></slot><div class="root"><slot></slot></div><slot name="end"></slot>`
const props = ['checked']
const setup = (shadow, node) => {
  return {
    checked: false
  }
}

define('chip', { template, setup })