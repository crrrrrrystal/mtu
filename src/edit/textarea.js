import { define } from '../../core.js'

const template = `<style>:host{display:block;min-height:96px;line-height:1.6}.root{position:relative;min-height:inherit;max-height:inherit}.text{caret-color:rgba(var(--color-accent));width:100%;background:0 0;font-family:inherit;outline:0;resize:none;border:none;color:inherit;padding:8.5px 12px;height:0;font-size:inherit;line-height:inherit;min-height:inherit;max-height:inherit;box-shadow:0 0 0 1px var(--color-border) inset;border-radius:2px;transition:box-shadow .2s;word-wrap:break-word;word-break:break-all;overflow:auto;overflow:overlay;scrollbar-width:thin}.text:focus{box-shadow:0 0 0 2px rgba(var(--color-accent)) inset}.text::placeholder{color:var(--color-text-secondary)}.text::selection{background:rgba(var(--color-accent));color:#fff}.text::-webkit-scrollbar{display:none}.soul{position:absolute;left:0;opacity:0;bottom:0;pointer-events:none;min-height:0;max-height:0}</style><div class="root"><textarea class="text" part="textarea"></textarea> <textarea class="text soul" part="textarea"></textarea></div>`
const props = ['value', 'disabled', 'placeholder']
const setup = (shadow, node) => {
  const [text, soul] = shadow.querySelectorAll('.text')
  const update = () => {
    soul.value = text.value
    text.style.height = soul.scrollHeight + 'px'
  }
  text.addEventListener('input', update)
  text.addEventListener('change', () => node.dispatchEvent(new Event('change')))
  return {
    onConnected: update,
    onAdopte: update,
    disabled: false,
    value: {
      get: () => text.value,
      set: v => {
        text.value = v
        update()
      }
    },
    placeholder: {
      get: () => text.placeholder,
      set: v => text.placeholder = v
    }
  }
}

define('edit-textarea', { template, props, setup })