import { define } from '../../core.js'

const template = `<style>:host{display:block;position:relative;height:100%;width:100%}:host([mode=horiz]) .root{overflow-x:scroll;overflow-y:hidden}:host([mode=horiz]) .scroll{top:auto;right:auto;bottom:0;left:0;height:4px;width:100%}:host([mode=horiz]) .scroll>span{height:100%!important}.scroll{position:absolute;right:0;top:0;width:4px;height:100%;pointer-events:none;opacity:0;transition:opacity .2s}.scroll.is{opacity:1}.scroll>span{display:block;background:var(--color-text);opacity:.24}.root{height:inherit;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none}.root::-webkit-scrollbar{display:none}slot{display:block}</style><div class="root" part="root"><slot></slot></div><div class="scroll" part="scroll"><span part="track"></span></div>`
const props = ['scrollTop', 'scrollLeft', 'scrollHeight', 'scrollWidth', 'mode']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const scroll = shadow.querySelector('.scroll')
  const track = shadow.querySelector('.scroll>span')

  const ishoriz = () => node.mode === 'horiz'

  const updateTrack = () => {
    if (ishoriz()) return track.style.transform = 'translateX(' + ((root.scrollLeft * node.offsetWidth) / root.scrollWidth) + 'px)'
    track.style.transform = 'translateY(' + ((root.scrollTop * node.offsetHeight) / root.scrollHeight) + 'px)'
  }

  const updateWH = () => {
    if (ishoriz()) {
      const w = (node.offsetWidth * node.offsetWidth) / root.scrollWidth
      track.style.width = w + 'px'
      return
    }
    const h = (node.offsetHeight * node.offsetHeight) / root.scrollHeight
    track.style.height = h + 'px'
  }

  let is
  root.addEventListener('scroll', () => {
    node.dispatchEvent(new Event('scroll'))
    scroll.classList.add('is')
    updateTrack()
    clearTimeout(is)
    is = setTimeout(() => scroll.classList.remove('is'), 2000)
  })
  const obs = new ResizeObserver(updateWH)
  obs.observe(node)
  obs.observe(shadow.querySelector('slot'))
  node.scrollTo = (x, y) => root.scrollTo(x, y)

  return {
    scrollTop: {
      get: () => root.scrollTop,
      set: v => root.scrollTop = v,
      sync: false
    },
    scrollLeft: {
      get: () => root.scrollLeft,
      set: v => root.scrollLeft = v,
      sync: false
    },
    scrollHeight: {
      get: () => track.offsetHeight,
      sync: false
    },
    scrollWidth: {
      get: () => track.offsetWidth,
      sync: false
    },
    mode: ['vert', 'horiz']
  }
}

define('scrollbar', { template, props, setup })