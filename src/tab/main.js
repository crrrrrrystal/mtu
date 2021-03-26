import { define } from '../../core.js'

const template = `<style>:host{height:48px;display:block;position:relative}:host([theme=dark]){background:rgba(var(--color-primary));color:rgba(255,255,255,.7);--color-ripple:rgba(255,255,255,.4);--color-icon:rgba(255,255,255,.7)}:host([theme=dark])::before{content:none}:host([mode=fixed]) .root{overflow:visible}:host([mode=fixed]) .body{display:flex}:host([mode=fixed]) ::slotted(m-tab-item){flex-basis:100%;flex-shrink:1}:host::before{content:'';position:absolute;width:100%;left:0;bottom:0;border-bottom:solid 1px var(--color-border)}.root{position:relative;height:100%;overflow-x:auto;scrollbar-width:none}.root::-webkit-scrollbar{display:none}.body{display:inline-flex;position:relative;height:100%}.bar{height:2px;width:0;background:rgba(var(--color-accent));position:absolute;bottom:0;left:0;transform:translateX(0);transition:transform .2s}.bar.noAnime{transition:none}</style><div class="root" part="root"><div class="body"><slot></slot></div><div class="bar" part="bar"></div></div>`
const props = ['theme', 'mode', 'select']

const setup = (shadow, node) => {
  const body = shadow.querySelector('.body')
  const bar = shadow.querySelector('.bar')

  const change = () => {
    const view = node.children[node.select]
    bar.style.transform = 'translateX(' + view.offsetLeft + 'px)'
    bar.style.width = view.offsetWidth + 'px'
    for (const item of node.children) {
      if (item === view) continue
      if (item.checked) item.checked = false
    }
    view.checked = true
  }

  const obs = new ResizeObserver(() => {
    bar.classList.add('noAnime')
    change()
    bar.classList.remove('noAnime')
  })
  return {
    onConnected: () => obs.observe(body),
    onDisconnected: () => obs.disconnect(),
    select: {
      get: 0,
      set: v => change(v)
    },
    theme: ['none', 'dark'],
    mode: ['none', 'fixed']
  }
}

define('tab', { template, props, setup })