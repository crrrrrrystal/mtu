import { define } from '../../core.js'

const template = `<style>:host{display:block;background:var(--color-background-bar);position:relative;box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);user-select:none}:host([theme=dark]){background:rgba(var(--color-primary))}:host([theme=dark]) .nav{--color-icon:#fff;--color-ripple:rgba(255,255,255,.4)}:host([theme=dark]) .text{color:#fff;--color-text-secondary:rgba(255,255,255,.7)}.root{display:flex;height:inherit;align-items:center;min-height:56px}.nav{flex-shrink:0}.text{margin:0 16px;letter-spacing:.0625rem}.title{font-size:1.125rem;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.subtitle{margin-top:2px;font-size:.875rem;color:var(--color-text-secondary)}.title:empty.subtitle:empty{display:none}.view{flex-grow:1}.menu{flex-shrink:0;margin-right:8px}::slotted([slot=nav]){margin:8px 0 8px 8px;width:40px;height:40px;min-width:0;border-radius:50%;background:0;box-shadow:none}</style><div class="root" title="" part="root"><div class="nav"><slot name="nav"></slot></div><div><slot name="start"></slot></div><div class="text" part="text"><div class="title" part="title"></div><div class="subtitle" part="subtitle"></div></div><div class="view" part="view"><slot></slot></div><div class="menu" part="menu"><slot name="menu"></slot></div><div><slot name="end"></slot></div></div><div part="tab"><slot name="tab"></slot></div>`
const props = ['title', 'subtitle', 'theme']
const setup = shadow => {
  const title = shadow.querySelector('.title')
  const subtitle = shadow.querySelector('.subtitle')
  return {
    title: {
      get: () => title.innerText,
      set: v => title.innerText = v,
      sync: false,
    },
    subtitle: {
      get: () => subtitle.innerText,
      set: v => subtitle.innerText = v,
      sync: false,
    },
    theme: ['none', 'dark']
  }
}

define('appbar', { template, props, setup })