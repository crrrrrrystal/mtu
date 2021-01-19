import { define } from '../../core.js'
import './main.js'

const template = `<style>:host{display:block;margin:16px;--edit-text-error-color:#ed4014}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}.root{display:flex;align-items:center}.start{flex-shrink:0}.input{flex-grow:1}.hint{color:var(--color-text-secondary);font-size:.75rem;transform-origin:left top;transition:transform .2s;pointer-events:none;height:16px;line-height:1;white-space:nowrap;position:absolute;display:flex;align-items:center;transform:translateY(10px) scale(1.34);user-select:none;padding:0 4px;margin-left:-4px}.focus .hint{color:rgba(var(--color-accent))}.focus .hint,.value .hint{transform:translateY(-8px) scale(1)}.err .hint{color:var(--edit-text-error-color);transform:translateY(-8px) scale(1)}.label{display:flex;align-items:center;position:relative}.edit{background:0;border:0;flex-grow:1;padding:10px 0 8px 0}.edit::part(root){padding:0}.line{position:absolute;left:0;bottom:0;width:100%;border-top:solid 1px var(--color-text-disabled);display:flex;justify-content:center;box-sizing:border-box}.line::before{content:'';position:absolute;bottom:0;height:2px;width:100%;background:rgba(var(--color-accent));transform:scaleX(0);transition:transform .2s}.focus .line::before{transform:scaleX(1)}.err .line::before{background:var(--edit-text-error-color);transform:scaleX(1)}.help{display:none;justify-content:space-between;align-items:center;margin-top:6px;user-select:none;font-size:.75rem;height:16px;white-space:nowrap}.err .help,.count .help{display:flex}.error{color:var(--edit-text-error-color)}.err ::slotted(*){color:var(--edit-text-error-color)}.err .start,.count .start{margin-bottom:24px}.counter{display:flex;justify-content:flex-end;color:var(--color-text-disabled);visibility:hidden}.count .counter{visibility:visible}::slotted(*:not(m-icon)){font-size:1rem;color:var(--color-text-secondary)}::slotted([slot=start]){margin-right:8px}::slotted([slot=end]){margin-left:8px}</style><div class="root" part="root"><div class="start"><slot name="start"></slot></div><div class="input"><div class="hint" part="hint"></div><div class="label"><m-edit class="edit"></m-edit><div class="line"></div><slot name="end"></slot></div><div class="help"><div class="error"></div><div class="counter"></div></div></div></div>`
const props = ['disabled', 'value', 'placeholder', 'error', 'maxlength', 'single', 'mode']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const hint = shadow.querySelector('.hint')
  const edit = shadow.querySelector('.edit')
  const counter = shadow.querySelector('.counter')
  const error = shadow.querySelector('.error')
  edit.addEventListener('focus', () => root.classList.add('focus'))
  edit.addEventListener('blur', () => root.classList.remove('focus'))

  const isValue = () => root.classList[edit.value === '' ? 'remove' : 'add']('value')
  const count = () => edit.maxlength > -1 && (counter.innerText = `${edit.value.length} / ${edit.maxlength}`)
  const onInput = () => {
    isValue()
    count()
  }
  edit.addEventListener('input', onInput)

  return {
    disabled: false,
    value: {
      get: () => edit.value,
      set: v => {
        edit.value = v
        onInput()
      },
      sync: false
    },
    placeholder: {
      get: () => hint.innerText,
      set: v => hint.innerText = v,
      sync: false
    },
    error: {
      get: () => error.innerText,
      set: v => {
        error.innerText = v
        root.classList[v ? 'add' : 'remove']('err')
      },
      sync: false
    },
    maxlength: {
      get: () => edit.maxlength,
      set: v => {
        edit.maxlength = v
        root.classList.add('count')
        count()
      },
      sync: false
    },
    single: {
      get: () => edit.single,
      set: v => edit.single = v,
      sync: false
    },
    mode: {
      get: ['text', 'password', 'email', 'number', 'tel', 'url'],
      set: v => edit.mode = v,
      sync: false
    }
  }
}

define('edit-text', { template, props, setup })