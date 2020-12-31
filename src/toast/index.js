import { define, transitionEnd } from '../../core.js'

const template = `<style>:host{display:flex;width:100%;position:fixed;justify-content:center;pointer-events:none;user-select:none;transform:translateY(-100%);opacity:0;transition:transform .2s,opacity .2s;top:0;left:0}:host([state=true]){opacity:1;transform:translateY(0%)}.root{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);background:var(--color-background-card);margin:24px;border-radius:4px;display:flex;align-items:center;padding:8px 16px;min-height:40px;max-width:280px;fill:var(--color-icon);box-sizing:border-box}.icon{fill:inherit;width:24px;height:24px;flex-shrink:0}.title{letter-spacing:1px;line-height:1.6;margin-left:8px;word-break:break-all}</style><div class="root" part="root"><svg viewBox="0 0 1024 1024" class="icon" part="icon"><path d="M554.666667 384h-85.333334V298.666667h85.333334m0 426.666666h-85.333334v-256h85.333334m-42.666667-384A426.666667 426.666667 0 0 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667 426.666667 426.666667 0 0 0 426.666667-426.666667A426.666667 426.666667 0 0 0 512 85.333333z"></path></svg><div class="title" part="title"><slot></slot></div></div>`
const props = ['state']

const setup = () => {
  return {
    state: false
  }
}

const global = define('toast', { template, props, setup })

global.toast = (text, time = 3000) => {
  const t = document.createElement('m-toast')
  t.innerText = text
  document.body.appendChild(t)
  window.getComputedStyle(t).top
  t.state = true
  setTimeout(() => {
    t.state = false
    transitionEnd(t, () => document.body.removeChild(t))
  }, time)
}