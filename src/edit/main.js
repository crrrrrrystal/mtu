import { define } from '../../core.js'

const template = `<style>:host{display:block;font-size:1rem;position:relative;box-sizing:border-box;border:solid 1px var(--color-border);border-radius:2px;background:var(--color-background-card)}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}:host([single=true]) .input{display:block}:host([single=true]) .field{display:none}.text{display:block;background:none;font-family:inherit;color:inherit;width:100%;word-break:break-word;padding:8px;line-height:1.4;outline:0;resize:none;scrollbar-width:none;font-size:inherit;border:0;box-sizing:border-box}.text::-webkit-scrollbar{display:none}.text::selection{background:rgba(var(--color-accent));color:#fff}.text::placeholder{color:var(--color-text-disabled)}.shadow{position:absolute!important;pointer-events:none!important;opacity:0!important;bottom:0!important;left:0!important}.input{display:none}</style><input type="text" class="text input" part="root"><textarea class="text shadow" part="root" style="height:0"></textarea><textarea class="text field" part="root"></textarea>`

const props = ['value', 'placeholder', 'disabled', 'maxlength', 'single', 'mode']
const setup = (shadow, node) => {
  const input = shadow.querySelector('.input')
  const text = shadow.querySelector('.field')
  const shadowText = shadow.querySelector('.shadow')

  const updateHeight = () => text.style.height = shadowText.scrollHeight + 'px'
  let value = ''
  const updateValue = () => {
    input.value = value
    text.value = value
    shadowText.value = value
  }
  input.addEventListener('input', () => value = input.value)
  text.addEventListener('input', () => {
    shadowText.value = text.value
    value = text.value
    if (text.offsetHeight === shadowText.scrollHeight) return
    updateHeight()
  })

  return {
    onConnected: updateHeight,
    value: {
      get: () => value,
      set: v => {
        value = v
        updateValue()
        updateHeight()
      },
      sync: false
    },
    placeholder: {
      get: () => input.placeholder,
      set: v => {
        input.placeholder = v
        text.placeholder = v
      },
      sync: false
    },
    disabled: false,
    maxlength: {
      get: () => input.maxLength,
      set: v => {
        input.maxLength = v
        text.maxLength = v
      },
      sync: false
    },
    single: {
      get: false,
      set: () => {
        updateValue()
        updateHeight()
      }
    },
    mode: {
      get: ['text', 'password', 'email', 'number', 'tel', 'url'],
      set: v => input.type = v,
      sync: false
    }
  }
}

define('edit', { template, props, setup })