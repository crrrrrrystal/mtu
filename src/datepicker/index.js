import { define } from '../../core.js'
import '../ripple/index.js'

const toFill = v => {
  v = String(v)
  return v.length == 1 ? '0' + v : v
}

const toFormat = (date) => {
  const dated = new Date(date)
  const y = toFill(dated.getFullYear())
  const m = toFill(dated.getMonth() + 1)
  const d = toFill(dated.getDate())
  return `${y}-${m}-${d}`
}

const days = ['日', '一', '二', '三', '四', '五', '六']

const createList = (min, max, call) => {
  const dataFragment = document.createDocumentFragment()
  for (let i = min; i <= max; i++) {
    const li = document.createElement('li')
    li.className = 'li' + i
    const ripple = document.createElement('m-ripple')
    ripple.innerHTML = i
    ripple.addEventListener('click', () => call(ripple.innerHTML))
    li.appendChild(ripple)
    dataFragment.appendChild(li)
  }
  return dataFragment
}

const toMin = v => v < 1970 ? 1970 : v
const scrollInto = view => view.scrollIntoViewIfNeeded ? view.scrollIntoViewIfNeeded() : view.scrollIntoView()

const template = `<style>:host{display:inline-block;vertical-align:middle}.root{position:fixed;top:0;left:0;display:flex;justify-content:center;align-items:center;width:100%;height:100%;padding:24px;box-sizing:border-box;opacity:0;pointer-events:none;transition:opacity .2s}.state{opacity:1;pointer-events:auto}.mask{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6)}.body{border-radius:2px;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);border-radius:2px;width:100%;max-width:392px;display:flex;flex-direction:column;max-height:100%;position:relative;background:var(--color-background-card);overflow:hidden;user-select:none;transition:transform .2s;transform:scale(.9)}.state .body{transform:scale(1)}.head{background:rgba(var(--color-primary));color:#fff;padding:16px 24px;border-radius:2px 2px 0 0}.head>.title{color:rgba(255,255,255,0.54);font-size:1.125rem;cursor:pointer;display:inline-block;padding:4px;border-radius:2px;overflow:hidden;--color-ripple:rgba(255,255,255,.4)}.head>.subtitle{color:#fff;font-size:1.5rem;margin-top:4px;letter-spacing:1px}.switch{display:flex;align-items:center;height:56px;padding:0 8px}.switch>.button{width:40px;height:40px;cursor:pointer;display:flex;justify-content:center;align-items:center;border-radius:50%;overflow:hidden}.switch>.button>svg{width:24px;height:24px;fill:var(--color-icon)}.switch>.text{flex-grow:1;display:flex;justify-content:center;font-size:1rem}.days{display:flex;margin:0;padding:0;height:36px;align-items:center;padding:0 16px}.days>li{list-style:none;flex-grow:1;display:flex;justify-content:center;color:var(--color-text-secondary)}@keyframes left{0%{transform:translateX(-100%)}100%{transform:translateX(0%)}}@keyframes right{0%{transform:translateX(100%)}100%{transform:translateX(0%)}}.data{display:flex;flex-wrap:wrap;padding:0 16px;margin:0;margin:8px 0}.data>li{list-style:none;width:calc(100% / 7);display:flex;justify-content:center;align-items:center}.data>li>m-ripple{width:36px;overflow:hidden;height:36px;cursor:pointer;display:flex;justify-content:center;align-items:center;border-radius:50%}.data>li.checked>m-ripple{background:rgba(var(--color-accent));color:#fff;pointer-events:none}.data>li.hide{display:none}.toggle .content{display:none}.toggle .year{display:block}.year{display:none;margin:0;padding:0;max-height:420px;overflow-y:auto;scrollbar-width:none;border-bottom:solid 1px var(--color-border)}.year::-webkit-scrollbar{display:none}.year>li{list-style:none}.year>li>m-ripple{display:flex;height:40px;cursor:pointer;justify-content:center;align-items:center;font-size:1rem}.year>li.checked>m-ripple{font-size:1.125rem;color:rgba(var(--color-accent));height:40px}.action{display:flex;margin:12px;justify-content:flex-end;flex-wrap:wrap}.action>.button{overflow:hidden;height:36px;min-width:48px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(var(--color-accent));padding:0 8px;border-radius:2px;user-select:none;font-weight:500;text-transform:uppercase;--color-ripple:rgba(var(--color-accent),.24)}.action>.button+.button{margin-left:8px}</style><slot></slot><div class="root" part="root"><div class="mask" part="mask"></div><div class="body" part="body"><div class="head"><m-ripple class="title">2020 年</m-ripple><div class="subtitle">12月14日 周四</div></div><div class="content"><div class="switch"><m-ripple class="button left"><svg viewBox="0 0 1024 1024"><path d="M657.493333 707.413333L462.08 512l195.413333-195.84L597.333333 256l-256 256 256 256 60.16-60.586667z"></path></svg></m-ripple><div class="text">2020年 4月</div><m-ripple class="button right"><svg viewBox="0 0 1024 1024"><path d="M366.506667 707.413333L561.92 512 366.506667 316.16 426.666667 256l256 256-256 256-60.16-60.586667z"></path></svg></m-ripple></div><ul class="days"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class="data"><li class="seat" style="width: 0;"></li></ul></div><ul class="year"></ul><div class="action"><m-ripple class="button cancel">取消</m-ripple><m-ripple class="button confirm">确定</m-ripple></div></div></div>`
const props = ['value']
const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const title = shadow.querySelector('.title')
  const subtitle = shadow.querySelector('.subtitle')
  const text = shadow.querySelector('.text')
  const year = shadow.querySelector('.year')
  const data = shadow.querySelector('.data')
  const seat = shadow.querySelector('.data>.seat')
  let date = new Date()
  //渲染
  const render = () => {
    title.innerHTML = `${date.getFullYear()} 年`
    subtitle.innerText = `${toFill(date.getMonth() + 1)}月 ${toFill(date.getDate())}日 周${days[date.getDay()]}`
    text.innerText = `${date.getFullYear()}年 ${toFill(date.getMonth() + 1)}月`
    const seated = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    seat.style.width = seated === 0 ? 0 : `calc((100% / 7) * ${seated})`
    for (const item of data.querySelectorAll('li.hide')) item.classList.remove('hide')
    const day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + 1
    for (let i = day; i <= 31; i++) data.querySelector('li.li' + i).classList.add('hide')
    const checked = data.querySelector('li.checked')
    checked && checked.classList.remove('checked')
    data.querySelector('li.li' + date.getDate()).classList.add('checked')
  }
  //初始化
  title.addEventListener('click', () => {
    root.classList.toggle('toggle')
    const y = date.getFullYear()
    if (root.classList.contains('toggle')) {
      const ft = Number(year.children[0].children[0].innerHTML)
      let min = toMin(y - 36)
      if (min !== ft) {
        const max = y + 36
        for (const item of year.children) {
          item.className = 'li' + min
          item.children[0].innerHTML = min
          min++
        }
      }
    }
    const checked = year.querySelector('li.li' + y)
    checked.classList.add('checked')
    scrollInto(checked)
  })
  const y = date.getFullYear()
  year.appendChild(createList(toMin(y - 36), y + 36, v => {
    root.classList.remove('toggle')
    date = new Date(v, date.getMonth(), date.getDate())
    render()
  }))

  data.appendChild(createList(1, 31, v => {
    date = new Date(date.getFullYear(), date.getMonth(), v)
    subtitle.innerText = `${toFill(date.getMonth() + 1)}月 ${toFill(date.getDate())}日 周${days[date.getDay()]}`
    const checked = data.querySelector('li.checked')
    checked && checked.classList.remove('checked')
    data.querySelector('li.li' + v).classList.add('checked')
  }))

  const switchs = is => {
    data.style.animation = ''
    window.getComputedStyle(data).top
    data.style.animation = is + ' .2s'
    const m = date.getMonth()
    date = new Date(date.getFullYear(), is == 'right' ? m + 1 : m - 1, date.getDate())
    render()
  }

  shadow.querySelector('slot').addEventListener('click', () => root.classList.add('state'))
  shadow.querySelector('.switch>.left').addEventListener('click', () => switchs('left'))
  shadow.querySelector('.switch>.right').addEventListener('click', () => switchs('right'))
  const close = () => {
    root.classList.remove('state')
    setTimeout(() => {
      date = new Date(node.value)
      render()
    }, 0)
  }
  shadow.querySelector('.mask').addEventListener('click', close)
  shadow.querySelector('.action>.cancel').addEventListener('click', close)
  shadow.querySelector('.action>.confirm').addEventListener('click', () => {
    root.classList.remove('state')
    const v = toFormat(date)
    if (v === node.value) return
    node.value = v
    const ev = new Event('change')
    ev.value = node.value
    node.dispatchEvent(ev)
  })
  render()

  return {
    value: {
      get: toFormat(new Date()),
      set: v => {
        date = new Date(v)
        render()
      },
      sync: false
    }
  }
}

define('datepicker', { template, props, setup })