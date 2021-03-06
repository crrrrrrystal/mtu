import { define } from '../../core.js'
import { animationEnd, clickAway } from '../../util.js'
import '../ripple/main.js'

const template = `<style>:host{display:inline-block;vertical-align:middle;position:relative}.active{width:40px;height:40px;border-radius:50%;cursor:pointer;overflow:hidden;display:flex;align-items:center;justify-content:center}.active::before,.active::part(anime),.active::part(ripple)::before{background:var(--menu-active-ripple,var(--color-ripple))}.active>svg{width:24px;height:24px;fill:var(--menu-active-icon,var(--color-icon))}.body{z-index:2;background:var(--color-background-card);max-width:280px;min-width:196px;position:absolute;left:0;top:0;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);border-radius:2px;user-select:none;visibility:visible;transform-origin:left top;overflow:hidden;display:none}.root.sub>.body{visibility:hidden}@keyframes open{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}@keyframes close{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.9)}}.open>.body{transform:none;opacity:1;animation:open .2s}.close>.body{animation:close .2s}::slotted(m-menu-group){display:block;padding:8px 0}::slotted(m-menu-group:not(:first-of-type)){border-top:solid 1px var(--color-border)}@media(min-width:720px){:host([mode|=auto]) [name=active]{display:none}:host([mode|=auto]) .body{display:flex;box-shadow:none;background:0;position:static;max-width:none;height:auto;min-width:auto}:host([mode|=auto]) ::slotted(m-menu-group){display:flex;border-top:0;padding:0}:host([mode=auto]) .body{--menu-item-width:auto;--menu-item-height:40px;--menu-item-border-radius:2px;--menu-item-padding:0 8px;--menu-item-margin:0 0 0 8px;--menu-item-start-marign:0 8px 0 0}:host([mode=auto-start]) .body{--menu-item-width:40px;--menu-item-height:40px;--menu-item-border-radius:50%;--menu-item-padding:0 8px;--menu-item-margin:0 0 0 8px;--menu-item-tooltip-pointer-events:auto;--menu-item-tooltip-position:absolute;--menu-item-tooltip-height:100%;--menu-item-tooltip-root-position:fixed;--menu-item-tooltip-root-filter:opacity(0);--menu-item-tooltip-root-transform:scale(.9);--menu-item-tooltip-root-background:rgba(97, 97, 97, .9);--menu-item-tooltip-root-color:#fff;--menu-item-tooltip-root-padding:6px 8px;--menu-item-tooltip-root-font-size:.75rem}::slotted(m-menu-group*){background:red}:host([mode=auto-text]) .body{--menu-item-width:auto;--menu-item-height:40px;--menu-item-border-radius:2px;--menu-item-margin:0 0 0 4px;--menu-item-start-display:none}}</style><div class="root"><slot name="active"><m-ripple class="active"><svg viewBox="0 0 1024 1024"><path d="M512 341.333333c46.933333 0 85.333333-38.4 85.333333-85.333333s-38.4-85.333333-85.333333-85.333333-85.333333 38.4-85.333333 85.333333 38.4 85.333333 85.333333 85.333333z m0 85.333334c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z m0 256c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z"></path></svg></m-ripple></slot><div class="body" part="body"><slot></slot></div></div>`
const props = ['mode']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const body = shadow.querySelector('.body')
  const active = shadow.querySelector('[name=active]')

  let mask
  const close = () => {
    animationEnd(body, () => {
      body.removeAttribute('style')
      root.className = 'root'
    })
    root.classList.add('close')
    mask()
  }
  //??????
  const open = () => {
    body.style.display = 'block'
    const rect = body.getBoundingClientRect()
    const offset = { top: '0', left: '0', bottom: 'auto', right: 'auto', transformOrigin: ['top', 'left'] }
    if (rect.top + body.offsetHeight > window.innerHeight) {
      offset.top = 'auto'
      offset.bottom = '0'
      offset.transformOrigin[0] = 'bottom'
    }
    if (rect.left + body.offsetWidth > window.innerWidth) {
      offset.left = 'auto'
      offset.right = '0'
      offset.transformOrigin[1] = 'right'
    }
    body.setAttribute('style', `display:block;transform-origin:${offset.transformOrigin.join(' ')};top:${offset.top};left:${offset.left};bottom:${offset.bottom};right:${offset.right}`)
    root.classList.add('open')
    mask = clickAway(node, close)
  }
  body.addEventListener('click', e => {
    if (node.mode.indexOf('auto') === 0 && window.innerWidth > 720) return
    const path = []
    for (const item of e.composedPath()) item.tagName && path.push(item.tagName)
    if (!path.includes('M-MENU-ITEM')) return
    close()
  })
  active.addEventListener('click', open)
  return {
    mode: ['normal', 'auto', 'auto-start', 'auto-text']
  }
}

define('menu', { template, props, setup })