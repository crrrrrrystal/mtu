import { define } from '../../core.js'
import '../ripple/main.js'

const template = `<style>:host{display:inline-block;vertical-align:middle;min-height:36px;border-radius:2px;min-width:64px;background:var(--color-border);text-transform:uppercase;cursor:pointer;user-select:none;font-size:.9rem;letter-spacing:1px;position:relative}:host([raised=true]) .root{transition:box-shadow .2s;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}:host([raised=true]) .root[active]{box-shadow:0 5px 5px -3px rgb(0 0 0 / 20%),0px 8px 10px 1px rgb(0 0 0 / 14%),0px 3px 14px 2px rgb(0 0 0 / 12%)}:host([disabled=true]){pointer-events:none;filter:grayscale(1);opacity:.6}:host([theme=color]){background:rgba(var(--color-accent));color:#fff;--color-icon:#fff;--color-ripple:rgba(255,255,255,.4)}:host([theme^=flat]){background:0}:host([theme=flat-color]){color:rgba(var(--color-accent));--color-icon:rgba(var(--color-accent));--color-ripple:rgba(var(--color-accent),.24)}:host([theme^=outline]){background:0}:host([theme^=outline])::before{content:'';height:100%;width:100%;position:absolute;left:0;top:0;border-radius:inherit;border:solid 1px var(--color-border);pointer-events:none;box-sizing:border-box}:host([theme^=outline-color]){--color-icon:rgba(var(--color-accent));--color-ripple:rgba(var(--color-accent));color:rgba(var(--color-accent))}:host([theme^=outline-color])::before{border-color:rgba(var(--color-accent))}:host([theme=outline-color]) .root[active]{color:#fff;--color-icon:#fff!important}:host([mode=icon]){border-radius:50%;min-width:auto;width:40px;height:40px}:host([mode=icon]) .root{padding:0!important}:host([size=small]),:host([size=large]){min-height:auto}:host([size=small]){min-height:32px;font-size:.8125rem;min-width:56px}:host([size=small][mode=icon]){width:36px;height:36px;min-width:auto}:host([size=large]){min-height:40px;font-size:1rem;min-width:72px}:host([size=large][mode=icon]){width:48px;height:48px;min-width:auto}:host([size=small]) ::slotted(m-icon){font-size:20px;width:20px;height:20px}.root{border-radius:inherit;min-height:inherit;height:inherit;display:flex;justify-content:center;padding:6px 12px;box-sizing:border-box;align-items:center;overflow:hidden}span{line-height:1;position:relative;pointer-events:none}::slotted(*){flex-shrink:0;display:block;position:relative}::slotted([slot=start]){margin-right:8px}::slotted([slot=end]){margin-left:8px}</style><m-ripple class="root" part="root"><slot name="start"></slot><span><slot></slot></span><slot name="end"></slot></m-ripple>`
const props = ['disabled', 'theme', 'raised', 'mode', 'size']
const setup = () => {
  return {
    disabled: false,
    theme: ['normal', 'color', 'flat', 'flat-color', 'outline', 'outline-color'],
    raised: false,
    mode: ['normal', 'icon'],
    size: ['normal', 'small', 'large']
  }
}

define('button', { template, props, setup })