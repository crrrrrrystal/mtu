import { define } from '../../core.js'

const template = `<style>:host{display:block;position:relative;height:100%}.scroll{position:absolute;right:0;top:0;width:4px;height:100%;pointer-events:none;opacity:0;transition:opacity .2s}.scroll.is{opacity:1}.scroll>span{display:block;background:var(--color-text);opacity:.24}.root{height:100%;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none}.root::-webkit-scrollbar{display:none}slot{display:block}</style><div class="root" part="root"><slot></slot></div><div class="scroll" part="scroll"><span part="track"></span></div>`
const props = ['scrollTop', 'scrollHeight']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const scroll = shadow.querySelector('.scroll')
  const track = shadow.querySelector('.scroll>span')
  let is
  root.addEventListener('scroll', () => {
    scroll.classList.add('is');
    track.style.transform = 'translateY(' + ((root.scrollTop * node.offsetHeight) / root.scrollHeight) + 'px)'
    clearTimeout(is)
    is = setTimeout(() => scroll.classList.remove('is'), 2000)
  })
  const obs = new ResizeObserver(() => {
    const h = (node.offsetHeight * node.offsetHeight) / root.scrollHeight
    track.style.height = h + 'px'
  })
  obs.observe(node)
  obs.observe(shadow.querySelector('slot'))
  node.scrollTo = v => root.scrollTo(0, v)
  return {
    scrollTop: {
      get: () => root.scrollTop,
      set: v => root.scrollTop = v,
      sync: false
    },
    scrollHeight: {
      get: () => track.offsetHeight,
      sync: false
    }
  }
}

define('scrollbar', { template, props, setup })