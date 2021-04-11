import { define } from '../../core.js'

const template = `<style>:host{height:48px;display:flex;position:relative;justify-content:center;background:var(--color-background-bar)}:host([theme=dark]){background:rgba(var(--color-primary));color:rgba(255,255,255,.7);--color-ripple:rgba(255,255,255,.4);--color-icon:rgba(255,255,255,.7)}:host([mode=fixed]) .root{overflow:visible;width:100%}:host([mode=fixed]) .body{display:flex}:host([mode=fixed]) ::slotted(m-tab-item){flex-basis:100%;flex-shrink:1}.root{height:100%;overflow-x:auto;max-width:100%;position:absolute;scrollbar-width:none}.root::-webkit-scrollbar{display:none}.body{display:inline-flex;position:relative;height:100%}.bar{height:2px;width:0;position:absolute;bottom:0;left:0;transform:translateX(0);transition:transform .2s;box-sizing:border-box}.block{background:rgba(var(--color-accent));height:100%}.bar.noAnime{transition:none}</style><div class="root" part="root"><div class="body"><slot></slot></div><div class="bar" part="bar"><div class="block" part="block"></div></div></div>`
const props = ['theme', 'mode', 'select']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const body = shadow.querySelector('.body')
  const bar = shadow.querySelector('.bar')
  const change = () => {
    const view = node.children[node.select]
    bar.style.transform = 'translateX(' + (view.offsetLeft - root.offsetLeft) + 'px)'
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
    theme: ['normal', 'dark'],
    mode: ['normal', 'fixed']
  }
}

define('tab', { template, props, setup })