import { define, animationEnd } from '../../core.js'


const template = `<style>:host{display:inline-block;vertical-align:middle;position:relative}.body{background:var(--color-background-card);max-width:280px;min-width:196px;position:absolute;left:0;top:0;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);border-radius:2px;user-select:none;display:none;visibility:visible}::slotted(m-menu-group){padding:8px 0;display:block}::slotted(m-menu-group:not(:nth-of-type(1))){border-top:solid 1px var(--color-border)}@keyframes open{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}.open>.body{animation:open .2s}@keyframes close{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.9)}}.close>.body{animation:close .2s}.sub>.body{visibility:hidden;pointer-events:none}:host([theme=appbar-dark]) ::slotted([slot=view]){--color-ripple:rgba(255,255,255,.4);--color-icon:#fff}@media(min-width:720px){:host([theme=appbar]) [name=view],:host([theme=appbar-dark]) [name=view]{display:none}:host([theme=appbar]) .body,:host([theme=appbar-dark]) .body{background:0;box-shadow:none;display:flex;position:relative;min-width:auto;max-width:none;opacity:1;transform:none}:host([theme=appbar]) .sub>.body,:host([theme=appbar-dark]) .sub>.body{visibility:visible;pointer-events:auto}:host([theme=appbar]) ::slotted(m-menu-group),:host([theme=appbar-dark]) ::slotted(m-menu-group){padding:0;display:flex}:host([theme=appbar]) ::slotted(m-menu-group:not(:nth-of-type(1))),:host([theme=appbar-dark]) ::slotted(m-menu-group:not(:nth-of-type(1))){border-top:0}}</style><div class="root"><slot name="view"></slot><div class="body" part="body"><slot></slot></div></div>`
const props = ['theme']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const view = shadow.querySelector('[name=view]')
  const body = shadow.querySelector('.body')
  node.addEventListener('click', e => e.stopPropagation())

  const remove = () => {
    body.removeAttribute('style')
    root.setAttribute('class', 'root')
    node.dispatchEvent(new Event('menu-close', { bubbles: true }))
  }
  const close = () => {
    root.classList.add('close')
    animationEnd(root, () => {
      body.removeAttribute('style')
      root.className = 'root'
      node.dispatchEvent(new Event('menu-close', { bubbles: true }))
    })
    root.classList.remove('open')
  }

  const open = () => {
    body.style.display = 'block'
    const rect = body.offsetParent.getBoundingClientRect()
    if (body.offsetParent === node || body.offsetParent.tagName === 'M-MENU-ITEM') {
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
      body.setAttribute('style', `display:block;transform-origin:${offset.transformOrigin.join(' ')};top:${offset.top};left:${offset.left};bottom:${offset.bottom};right:${offset.right}`)
    } else {
      const style = body.offsetParent.getOffsetStyle()
      body.setAttribute('style', style)
    }
    root.classList.add('open')
    document.body.addEventListener('click', close)
    const win = () => {
      window.removeEventListener('resize', win)
      remove()
    }
    window.addEventListener('resize', win)
  }

  node.addEventListener('menu-close', e => {
    document.body.removeEventListener('click', close)
    if (e.target === node) return
    remove()
  })
  node.addEventListener('menu-open', () => {
    document.body.removeEventListener('click', close)
    if (root.classList.contains('sub')) return
    root.classList.add('sub')
  })
  view.addEventListener('click', open)
  node.open = open
  node.close = close
  node.getOffsetStyle = () => body.getAttribute('style')

  return {
    theme: ['none', 'appbar', 'appbar-dark']
  }
}

define('menu', { template, props, setup })