import { define } from '../../core.js'

const template = `<style>:host{display:block;padding:8px 0}:host(:not(:nth-of-type(1))){border-top:solid 1px var(--color-border)}.title{margin-top:-8px;height:48px;display:flex;align-items:center;padding:0 16px;color:var(--color-text-secondary);user-select:none}.title:empty{display:none}</style><div class="root" part="root" title=""><div class="title" part="title"></div><slot></slot></div>`
const props = ['title']

const setup = shadow => {
  const title = shadow.querySelector('.title')
  return {
    title: {
      get: () => title.innerText,
      set: v => title.innerText = v
    }
  }
}

define('list', { template, props, setup })