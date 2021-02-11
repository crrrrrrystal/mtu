export const global = window.Mtu || (window.Mtu = {})

export const define = (name, { template = '', props = [], setup = () => { } }) => {
  const custom = window.customElements
  if (custom.get('m-' + name)) return
  const list = new Map()
  custom.define('m-' + name, class extends HTMLElement {
    static observedAttributes = props
    constructor() {
      super()
      const shadow = this.attachShadow({ mode: 'closed' })
      shadow.innerHTML = template
      const out = setup(shadow, this) || {}
      list.set(this, out)
      for (const key in out) {
        if (['onConnected', 'onDisconnected', 'onAdopted'].indexOf(key) !== -1) continue
        const item = out[key]
        //key:any
        const info = { type: typeof item, value: item }
        const pro = {
          get: () => info.value,
          set: v => info.value = v,
          sync: true
        }
        //key:[]
        if (Array.isArray(item)) {
          const val = item[0]
          info.type = typeof val
          info.value = val
          pro.set = v => info.value = item.indexOf(v) === -1 ? val : v
        }
        //key:{}
        if (typeof item === 'object' && !Array.isArray(item)) {
          if (item.sync === false) pro.sync = false
          info.type = typeof item.get
          info.value = item.get
          if (typeof item.get === 'function') {
            const val = item.get()
            info.type = typeof val
            info.value = val
            pro.get = item.get
          }
          if (typeof item.set === 'function') {
            pro.set = v => {
              info.value = v
              item.set(v)
            }
          }
          if (Array.isArray(item.get)) {
            const val = item.get[0]
            info.type = typeof val
            info.value = val
            if (typeof item.set === 'function') {
              pro.set = v => {
                const tv = item.get.indexOf(v) === -1 ? val : v
                info.value = tv
                item.set(tv)
              }
            }
          }
        }
        const toType = v => {
          if (info.type === 'string') return String(v)
          if (info.type === 'boolean') return v === 'false' ? false : Boolean(v)
          if (info.type === 'number') return Number(v)
          return v
        }
        Object.defineProperty(this, key, {
          get: pro.get,
          set: v => {
            if (pro.sync && this.getAttribute(key) !== v) return this.setAttribute(key, v)
            v = toType(v)
            if (v === pro.get()) return
            pro.set(v)
          }
        })
      }
    }
    attributeChangedCallback(name, old, value) {
      if (value === null) value = ''
      this[name] = value
    }
    connectedCallback() {
      const call = list.get(this).onConnected
      call && call()
    }
    disconnectedCallback() {
      const call = list.get(this).onDisconnected
      call && call()
    }
    adoptedCallback() {
      const call = list.get(this).onAdopted
      call && call()
    }
  })
}

export const animationEnd = (view, call) => {
  view.addEventListener('animationend', call, { once: true })
  view.addEventListener('animationcancel', call, { once: true })
}

export const transitionEnd = (view, call) => {
  view.addEventListener('transitionend', call, { once: true })
  view.addEventListener('transitioncancel', call, { once: true })
}