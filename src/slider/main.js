import { define } from '../../core.js'

const template = `<style>:host{display:block;position:relative;height:18px;user-select:none}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.4}input{height:100%;width:100%;margin:0;cursor:pointer;opacity:0;position:absolute}input:active+div .bar,.bar.ripple{transform:scale(1.5);box-shadow:0 0 0 6px rgba(var(--color-accent),.24)}div{height:100%;display:flex;align-items:center;position:relative;pointer-events:none;margin:0 6px;width:calc(100% - 12px)}div::before{content:'';display:block;height:2px;width:100%;background:rgba(var(--color-accent),.24)}span{position:absolute}.line{height:2px;display:block;background:rgba(var(--color-accent));width:50%}.bar{display:block;width:12px;height:12px;border-radius:50%;background:rgba(var(--color-accent));margin-left:-6px;transition:transform .2s,box-shadow .2s;will-change:transform,box-shadow;left:50%}</style><input type="range" max="100" value="50" step="1"><div><span class="line"></span><span class="bar"></span></div>`
const props = ['disabled', 'value', 'max', 'min', 'step']

const setup = (shadow, node) => {
  const line = shadow.querySelector('.line')
  const bar = shadow.querySelector('.bar')
  const input = shadow.querySelector('input')
  const on = t => {
    const ev = new Event(t)
    ev.value = input.value
    node.dispatchEvent(ev)
  }
  const update = () => {
    const v = (input.value * 100 / input.max) + '%'
    line.style.width = v
    bar.style.left = v
  }
  input.addEventListener('input', e => {
    e.stopPropagation()
    update()
    on('input')
  })
  input.addEventListener('change', () => on('change'))
  node.addEventListener('touchstart', () => bar.classList.add('ripple'))
  node.addEventListener('touchend', () => bar.classList.remove('ripple'))
  node.addEventListener('touchcancel', () => bar.classList.remove('ripple'))

  return {
    disabled: false,
    value: {
      get: () => Number(input.value),
      set: v => {
        input.value = v
        update()
      }
    },
    max: {
      get: () => Number(input.max),
      set: v => {
        input.max = v
        update()
      }
    },
    min: {
      get: () => Number(input.min),
      set: v => {
        input.min = v
        update()
      }
    },
    step: {
      get: () => Number(input.step),
      set: v => {
        input.step = v
        update()
      }
    }
  }
}

define('slider', { template, props, setup })