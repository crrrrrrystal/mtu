import { define } from '../../core.js'

const template = `<style>:host{display:block;height:100%}.root{display:flex;position:relative;overflow:hidden;height:100%}.content{flex-grow:1}::slotted(*){height:100%;display:block}.mask{position:absolute;width:100%;height:100%;left:0;top:0;pointer-events:none;display:none;background:rgba(0,0,0,.4);opacity:0}.start{order:-1;background:var(--color-background-card);flex-shrink:0;position:relative;width:260px}.start>.shadow{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);pointer-events:none;position:absolute;width:100%;height:100%;left:0;top:0;opacity:0}.start>.left{position:relative}@media(min-width:720px){.start{transition:width .2s;will-change:width;overflow:hidden;white-space:nowrap}:host([start=false]) .start{width:0}}@media(max-width:720px){.mask{transition:opacity .2s;display:block;will-change:opacity}.start{position:absolute;top:0;left:0;height:100%;transform:translateX(-100%);will-change:transform}.root:not(.noAnime) .start{transition:transform .2s}.start>.shadow{will-change:opacity}.root:not(.noAnime) .start>.shadow{transition:opacity .2s}:host([mobile_start=true]) .start{transform:translateX(0%)}:host([mobile_start=true]) .mask{opacity:1;pointer-events:auto}:host([mobile_start=true]) .start>.shadow{opacity:1}}</style><div class="root"><div class="content"><slot></slot></div><div class="mask" part="mask"></div><div class="start" part="start"><div class="shadow"></div><div class="left"><slot name="start"></slot></div></div></div>`
const props = ['start', 'mobile_start']
const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const start = shadow.querySelector('.start')
  const startShadow = shadow.querySelector('.start>.shadow')
  const mask = shadow.querySelector('.mask')

  mask.addEventListener('click', () => node.toggle())
  let info = null

  const touchStart = e => {
    if (info !== null) return
    root.classList.add('noAnime')
    const x = e.touches[0].pageX
    const width = start.offsetWidth
    const vX = x - node.offsetLeft
    if (!node.mobile_start && vX > 24 || node.mobile_start && vX > width) return
    info = { width, x: x, y: e.touches[0].pageY, time: new Date().getTime() }
  }

  const touchMove = e => {
    if (!e.cancelable) return
    touchStart(e)
    if (info === null) return
    const x = e.touches[0].pageX
    const vX = x - info.x
    if (Math.abs(vX) < Math.abs(e.touches[0].pageY - info.y) && !info.state) return

    let move = node.mobile_start ? vX : vX - info.width
    if (move > 0) move = 0
    if (move < -info.width) move = -info.width
    start.style.transform = 'translateX(' + move + 'px)'

    const opacity = (move + info.width) / info.width
    startShadow.style.opacity = opacity
    mask.style.opacity = opacity
    info.state = true
  }

  const touchEnd = e => {
    root.classList.remove('noAnime')
    if (info === null || !info.state) return

    const time = new Date().getTime() - info.time
    const x = e.changedTouches[0].pageX - info.x
    let v = node.mobile_start

    if (!node.mobile_start) {
      if ((time < 300 && x > 40) || (time > 300 && x > (info.width / 2))) v = true
    } else {
      if ((time < 300 && x < -40) || (time > 300 && x < -(info.width / 2))) v = false
    }

    mask.removeAttribute('style')
    start.removeAttribute('style')
    startShadow.removeAttribute('style')
    node.mobile_start = v
    info = null
  }

  node.addEventListener('touchmove', touchMove)
  node.addEventListener('touchend', touchEnd)
  node.addEventListener('touchcancel', touchEnd)
  node.toggle = () => {
    if (window.innerWidth >= 720) return node.start = !node.start
    node.mobile_start = !node.mobile_start
  }
  return {
    start: true,
    mobile_start: false
  }
}

define('drawer', { template, props, setup })