import { define, animationEnd } from '../../core.js'

const template = `<style>:host{display:block;user-select:none;position:relative}:host::before{content:'';height:100%;width:100%;position:absolute;opacity:0;transition:opacity .2s;will-change:opacity;border-radius:inherit;pointer-events:none;background:var(--color-ripple);left:0;top:0}@keyframes anime{0%{transform:translate(var(--x),var(--y)) scale(.2);opacity:1}100%{transform:translate(0px,0px) scale(1);opacity:1}}.ripple{left:0;top:0;width:100%;height:100%;position:absolute;pointer-events:none;display:flex;justify-content:center;align-items:center;overflow:hidden}.ripple>.anime{background:var(--color-ripple);border-radius:50%;flex-shrink:0;opacity:0;will-change:transform}@media(min-width:720px){:host(:hover)::before{opacity:.24}}</style><slot></slot><div class="ripple" part="ripple"><div class="anime" part="anime"></div></div>`

const setup = (shadow, node) => {
  const anime = shadow.querySelector('.anime')
  const info = { isDown: false, isEnd: false, isAnime: false }

  const down = (tX, tY) => {
    info.isDown = true
    info.isEnd = false
    info.isAnime = false

    const rect = node.getBoundingClientRect()
    const width = node.offsetWidth
    const height = node.offsetHeight
    const float = { x: tX - rect.left, y: tY - rect.top }
    const diameter = Math.pow(Math.pow(height, 2) + Math.pow(width, 2), 0.5)
    const x = ((width / 2) - float.x) / -1
    const y = ((height / 2) - float.y) / -1
    anime.setAttribute('style', `width:${diameter}px;height:${diameter}px;--x:${x}px;--y:${y}px;animation: anime .2s;animation-fill-mode: forwards`)
    animationEnd(anime, () => {
      if (info.isEnd) anime.removeAttribute('style')
      info.isAnime = true
    })
  }
  const up = () => {
    if (!info.isDown) return
    anime.style.animationFillMode = 'none'
    if (info.isAnime) anime.removeAttribute('style')
    info.isEnd = true
  }
  node.addEventListener('mousedown', e => {
    if (e.button === 2) return
    down(e.pageX, e.pageY)
  })
  node.addEventListener('mouseup', up)
  node.addEventListener('mouseout', up)
  node.addEventListener('touchstart', e => {
    if (!e.cancelable) return
    const t = e.touches[0]
    down(t.pageX, t.pageY)
  })
  node.addEventListener('touchend', up)
  node.addEventListener('touchcancel', up)
}

define('ripple', { template, setup })