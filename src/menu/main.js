import { define, animationEnd } from '../../core.js'
import '../ripple/main.js'

const template = `<style>:host{display:inline-block;vertical-align:middle;position:relative}.view{width:40px;height:40px;border-radius:50%;cursor:pointer;overflow:hidden;display:flex;align-items:center;justify-content:center}.view::part(anime){background:var(--menu-item-view-ripple,var(--color-ripple))}.view>svg{width:24px;height:24px;fill:var(--menu-item-view-icon,var(--color-icon))}.body{background:var(--color-background-card);max-width:280px;min-width:196px;position:absolute;left:0;top:0;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);border-radius:2px;user-select:none;visibility:visible;transform-origin:left top;height:0;overflow:hidden;display:none}.root.sub>.body{visibility:hidden}@keyframes open{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}@keyframes close{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.9)}}.open>.body{transform:none;opacity:1;animation:open .2s}.close>.body{animation:close .2s}::slotted(m-menu-group){display:block;padding:8px 0}::slotted(m-menu-group:not(:first-of-type)){border-top:solid 1px var(--color-border)}@media(min-width:720px){:host([mode=auto]) [name=view]{display:none}:host([mode=auto]) .body{display:flex;box-shadow:none;background:0;position:static;max-width:none;height:auto;min-width:auto;--menu-item-width:40px;--menu-item-height:40px;--menu-item-border-radius:50%;--menu-item-padding:0 8px;--menu-item-margin:0 0 0 8px;--menu-item-tooltip-pointer-events:auto}:host([mode=auto]) ::slotted(m-menu-group){display:flex;border-top:0;padding:0}}</style><div class="root"><slot name="view"><m-ripple class="view"><svg viewBox="0 0 1024 1024"><path d="M512 341.333333c46.933333 0 85.333333-38.4 85.333333-85.333333s-38.4-85.333333-85.333333-85.333333-85.333333 38.4-85.333333 85.333333 38.4 85.333333 85.333333 85.333333z m0 85.333334c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z m0 256c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z"></path></svg></m-ripple></slot><div class="body" part="body"><slot></slot></div></div>`
const props = ['mode']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const body = shadow.querySelector('.body')
  const view = shadow.querySelector('[name=view]')
  //关闭
  const close = () => {
    animationEnd(body, () => {
      body.removeAttribute('style')
      root.className = 'root'
    })
    root.classList.add('close')
  }
  //遮罩
  let mask
  const removeMask = () => {
    document.removeEventListener('mousedown', mask)
    document.removeEventListener('touchstart', mask)
    window.removeEventListener('resize', mask)
  }
  const addMask = () => {
    window.addEventListener('resize', mask)
    document.addEventListener('mousedown', mask)
    document.addEventListener('touchstart', mask)
  }
  mask = e => {
    if (e.target !== window && node.contains(e.target)) return
    close()
    removeMask()
  }
  //开启
  const open = () => {
    body.style.display = 'block'
    const rect = body.offsetParent.getBoundingClientRect()
    const offset = { top: '0', left: '0', bottom: 'auto', right: 'auto', transformOrigin: ['top', 'left'] }
    if (window.innerWidth / 2 < rect.left) {
      offset.left = 'auto'
      offset.right = '0'
      offset.transformOrigin[1] = 'right'
    }
    if (window.innerHeight / 2 < rect.top) {
      offset.top = 'auto'
      offset.bottom = '0'
      offset.transformOrigin[0] = 'bottom'
    }
    body.setAttribute('style', `display:block;height:auto;transform-origin:${offset.transformOrigin.join(' ')};top:${offset.top};left:${offset.left};bottom:${offset.bottom};right:${offset.right}`)
    animationEnd(body, addMask)
    root.classList.add('open')
  }
  //关闭
  node.addEventListener('menu-close', () => {
    if (['auto'].indexOf(node.mode) !== -1 && window.innerWidth > 720) return
    close()
    removeMask()
  })
  view.addEventListener('click', open)
  return {
    mode: ['none', 'auto']
  }
}

define('menu', { template, props, setup: setup })