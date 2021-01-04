export const define = (name, { template = '', props = [], setup = () => { } }) => {
  const list = new Map()
  window.customElements.define('m-' + name, class extends HTMLElement {
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
        //attr
        const info = { value: item, type: typeof item }
        const toType = v => {
          if (info.type === 'string') return String(v)
          if (info.type === 'boolean') return v === 'false' ? false : Boolean(v)
          if (info.type === 'number') return Number(v)
          return v
        }
        const property = { get: () => info.value, set: v => info.value = v, sync: true }
        const isArray = value => {
          info.value = value[0]
          info.type = typeof value[0]
          property.set = v => {
            if (value.indexOf(v) === -1) v = value[0]
            info.value = v
          }
        }
        if (Array.isArray(item)) isArray(item)
        //{}
        if (!Array.isArray(item) && typeof item === 'object') {
          info.value = item.get
          info.type = typeof item.get
          if (item.sync === false) property.sync = false
          if (Array.isArray(item.get)) isArray(item.get)
          if (typeof item.get === 'function') {
            const v = item.get()
            info.value = v
            info.type = typeof v
            property.get = item.get
          }
          if (item.set) {
            property.set = v => {
              info.value = v
              item.set(v)
            }
          }
        }
        Object.defineProperty(this, key, {
          get: property.get,
          set: v => {
            if (property.sync && this.getAttribute(key) !== v) return this.setAttribute(key, v)
            v = toType(v)
            if (v === info.value) return
            property.set(v)
          }
        })
      }
    }
    attributeChangedCallback(name, old, value) {
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
  return window.Mtu || (window.Mtu = {})
}

export const animationEnd = (view, call) => {
  view.addEventListener('animationend', call, { once: true })
  view.addEventListener('animationcancel', call, { once: true })
}

export const transitionEnd = (view, call) => {
  view.addEventListener('transitionend', call, { once: true })
  view.addEventListener('transitioncancel', call, { once: true })
}