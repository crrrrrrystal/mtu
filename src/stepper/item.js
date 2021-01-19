import { define } from '../../core.js'

const template = `<style>:host{display:flex;position:relative;flex-basis:100%;align-items:center}:host([checked=true]) ::slotted([slot=icon]){color:rgba(var(--color-accent))}:host([checked=true]) .ic{background:rgba(var(--color-accent))}:host([checked=true]) .title{color:var(--color-text)}.head{display:flex;align-items:center;justify-content:var(--stepper-item-head-justify-content,normal);height:56px;user-select:none}[name=icon]{display:flex;align-items:center;justify-content:center;height:24px;width:24px}.ic{width:18px;height:18px;border-radius:50%;background:var(--color-text-disabled);font-size:.75rem;color:#fff;display:flex;justify-content:center;align-items:center;line-height:1}.title{margin-left:var(--stepper-item-title-margin-left,16px);color:var(--color-text-secondary);line-height:1;font-size:var(--stepper-item-title-font-size,1rem);flex-shrink:0}::slotted(:not([slot])){margin:0 0 0 40px;display:var(--stepper-item-body-display,block)}</style><div class="root" part="root"><div class="head"><slot name="icon"><div class="ic">1</div></slot><div class="title"><slot name="title"></slot></div></div><div class="body"><slot></slot></div></div>`
const props = ['key', 'checked']

const setup = shadow => {
  const key = shadow.querySelector('.ic')
  return {
    key: {
      get: '',
      set: v => key.innerText = v,
      sync: false
    },
    checked: false
  }
}

define('stepper-item', { template, props, setup })