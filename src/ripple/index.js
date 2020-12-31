import { define, transitionEnd } from '../../core.js'

const template = `<style>:host{display:block;user-select:none;position:relative}:host::before{content:'';height:100%;width:100%;position:absolute;opacity:0;transition:opacity .2s;will-change:opacity;border-radius:inherit;pointer-events:none;background:var(--color-ripple);left:0;top:0}.ripple{left:0;top:0;width:100%;height:100%;position:absolute;pointer-events:none;display:flex;justify-content:center;align-items:center;overflow:hidden}.ripple>.anime{background:var(--color-ripple);border-radius:50%;flex-shrink:0;opacity:0;will-change:transform}.ripple>.anime.show{transition:transform .2s;opacity:1}@media(min-width:720px){:host(:hover)::before{opacity:.24}}</style><slot></slot><div class="ripple" part="ripple"><div class="anime"></div></div>`

const setup = (shadow, node) => {
  const anime = shadow.querySelector('.anime')
  let isDown = false, isAnime = false, animeCall = null
  const down = (tX, tY) => {
    const rect = node.getBoundingClientRect()
    const width = node.offsetWidth
    const height = node.offsetHeight
    const float = { x: tX - rect.left, y: tY - rect.top }
    const diameter = Math.pow(Math.pow(height, 2) + Math.pow(width, 2), 0.5)
    const x = ((width / 2) - float.x) / -1
    const y = ((height / 2) - float.y) / -1
    anime.setAttribute('style', `width:${diameter}px;height:${diameter}px;transform:translate(${x}px,${y}px) scale(.2)`)
    window.getComputedStyle(anime).top
    anime.classList.add('show')
    anime.style.transform = 'translate(0px, 0px) scale(1)'
    transitionEnd(anime, () => {
      animeCall && animeCall()
      animeCall = null, isAnime = false
    })
    isAnime = true, isDown = true
  }
  const up = () => {
    if (!isDown) return
    const remove = () => anime.classList.remove('show')
    !isAnime ? remove() : animeCall = remove
    isDown = false
  }
  const isTouch = window.ontouchstart === null
  node.addEventListener('mousedown', e => {
    if (e.button === 2 || isTouch) return
    down(e.pageX, e.pageY)
  })
  node.addEventListener('mouseup', () => !isTouch && up())
  node.addEventListener('mouseout', () => !isTouch && up())
  node.addEventListener('touchstart', e => {
    const t = e.touches[0]
    down(t.pageX, t.pageY)
  })
  node.addEventListener('touchend', up)
  node.addEventListener('touchcancel', up)
}

define('ripple', { template, setup })