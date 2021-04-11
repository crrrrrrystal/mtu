import { define } from '../../core.js'

const template = `<style>:host{display:block;margin:0 16px}:host([mode=horiz]){margin:0 8px;--stepper-item-head-justify-content:center;--stepper-item-title-font-size:.9rem;--stepper-item-title-margin-left:8px;--stepper-item-body-display:none}:host([mode=horiz]) .root{display:flex}.root{display:block}::slotted(*)::after{content:'';background:var(--color-border);position:absolute;left:11.5px;width:1px}::slotted(*)::after{height:calc(100% - 56px);bottom:0}:host([mode=horiz]) ::slotted(*)::before,:host([mode=horiz]) ::slotted(*)::after{content:'';left:0;top:calc(50% - 1px);flex-grow:1;width:auto;height:1px;position:static;background:var(--color-border)}:host([mode=horiz]) ::slotted(*)::before{margin-right:16px}:host([mode=horiz]) ::slotted(*)::after{margin-left:16px}:host([mode=horiz]) ::slotted(*:first-of-type)::before,:host([mode=horiz]) ::slotted(*:last-of-type)::after{background:0}</style><div class="root" part="root"><slot></slot></div>`
const props = ['mode']

const setup = () => {
  return {
    mode: ['normal', 'horiz']
  }
}

define('stepper', { template, props, setup })