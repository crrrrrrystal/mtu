import { define } from '../../core.js'
import '../ripple/index.js'

const template = `<style>:host{display:inline-block;vertical-align:middle;border-radius:2px;background:var(--color-background-card);user-select:none;width:100%;max-width:360px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.head{background:rgba(var(--color-primary));color:#fff;padding:16px 24px;border-radius:2px 2px 0 0}.head>.title{color:rgba(255,255,255,0.7);font-size:1.125rem;cursor:pointer;display:inline-block;padding:4px;border-radius:2px;overflow:hidden;--color-ripple:rgba(255,255,255,.4)}.head>.subtitle{color:#fff;font-size:1.5rem;margin-top:4px;letter-spacing:1px}.switch{display:flex;align-items:center;height:56px}.switch>.button{width:40px;height:40px;cursor:pointer;display:flex;justify-content:center;align-items:center;border-radius:50%;margin:0 8px;overflow:hidden}.switch>.button>svg{width:24px;height:24px;fill:var(--color-icon)}.switch>.text{flex-grow:1}.switch>.text>m-ripple{overflow:hidden;height:36px;display:flex;justify-content:center;align-items:center;font-size:1rem;padding:0 16px;border-radius:2px;cursor:pointer}.days{display:flex;margin:0;padding:0;height:36px;align-items:center;padding:0 16px}.days>li{list-style:none;flex-grow:1;display:flex;justify-content:center;color:var(--color-text-secondary)}.list{display:flex;flex-wrap:wrap;padding:0 16px;margin:12px 0;counter-reset:day}.list>li{list-style:none;width:calc(100% / 7);display:flex;justify-content:center;align-items:center}.list>li.checked>m-ripple{background:rgba(var(--color-accent));color:#fff;--color-ripple:rgba(255,2552,255,.4)}.list>li>m-ripple{width:36px;overflow:hidden;height:36px;cursor:pointer;display:flex;justify-content:center;align-items:center;border-radius:50%;margin:2px 0}.list>li>m-ripple::after{counter-increment:day;content:counter(day)}.list>li.hide{display:none}.month-list{margin:0;padding:0 0 8px 0;display:none;flex-wrap:wrap}.month-list>li{list-style:none;width:calc(100% / 3);padding:8px 16px;box-sizing:border-box}.month-list>li.checked>m-ripple{background:rgba(var(--color-accent));color:#fff;--color-ripple:rgba(255,2552,255,.4)}.month-list>li>m-ripple{overflow:hidden;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:2px}.year-list{display:none;margin:0;padding:0;overflow-y:scroll;max-height:420px;scrollbar-width:none;counter-reset:year}.year-list::-webkit-scrollbar{display:none}.year-list>li{list-style:none}.year-list>li.checked>m-ripple{color:rgba(var(--color-accent));font-size:1.125rem}.year-list>li>m-ripple::after{counter-increment:year;content:counter(year)}.year-list>li>m-ripple{display:flex;font-size:1rem;justify-content:center;align-items:center;height:40px;cursor:pointer}.toggle-month .list,.toggle-month .days,.toggle-month .year-list,.toggle-year .switch,.toggle-year .days,.toggle-year .list{display:none}.toggle-month:not(.toggle-year) .month-list{display:flex}.toggle-year .year-list{display:block}</style><slot></slot><div class="root" part="root"><div class="head"><m-ripple class="title"></m-ripple><div class="subtitle"></div></div><div class="switch"><m-ripple class="button left"><svg viewBox="0 0 1024 1024"><path d="M657.493333 707.413333L462.08 512l195.413333-195.84L597.333333 256l-256 256 256 256 60.16-60.586667z"></path></svg></m-ripple><div class="text"><m-ripple></m-ripple></div><m-ripple class="button right"><svg viewBox="0 0 1024 1024"><path d="M366.506667 707.413333L561.92 512 366.506667 316.16 426.666667 256l256 256-256 256-60.16-60.586667z"></path></svg></m-ripple></div><ul class="days"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class="list"><li class="seat" style="width: 0;"></li></ul><ul class="month-list"><li><m-ripple>一月</m-ripple></li><li><m-ripple>二月</m-ripple></li><li><m-ripple>三月</m-ripple></li><li><m-ripple>四月</m-ripple></li><li><m-ripple>五月</m-ripple></li><li><m-ripple>六月</m-ripple></li><li><m-ripple>七月</m-ripple></li><li><m-ripple>八月</m-ripple></li><li><m-ripple>九月</m-ripple></li><li><m-ripple>十月</m-ripple></li><li><m-ripple>十一月</m-ripple></li><li><m-ripple>十二月</m-ripple></li></ul><ul class="year-list"></ul></div>`
const props = ['value']

const createElement = (length, call = () => { }) => {
  const fragment = document.createDocumentFragment()
  for (let i = 1; i <= length; i++) {
    const view = document.createElement('li')
    const ripple = document.createElement('m-ripple')
    ripple.addEventListener('click', () => call(i))
    view.appendChild(ripple)
    fragment.appendChild(view)
  }
  return fragment
}

const fill = v => {
  v = String(v)
  return v.length == 1 ? '0' + v : v
}

const format = value => {
  const date = new Date(value)
  return `${fill(date.getFullYear())}-${fill(date.getMonth() + 1)}-${fill(date.getDate())}`
}

const days = ['日', '一', '二', '三', '四', '五', '六']

const setup = (shadow, node) => {
  const root = shadow.querySelector('.root')
  const title = shadow.querySelector('.head>.title')
  const subtitle = shadow.querySelector('.head>.subtitle')
  const text = shadow.querySelector('.switch>.text>m-ripple')
  const left = shadow.querySelector('.switch>.left')
  const right = shadow.querySelector('.switch>.right')
  let date = new Date()

  const list = shadow.querySelector('.list')
  const seat = shadow.querySelector('.list>.seat')
  const monthList = shadow.querySelector('.month-list')
  const yearList = shadow.querySelector('.year-list')

  const getMin = () => {
    const low = 1969
    const min = date.getFullYear() - 50
    return min < low ? low : min
  }

  const render = v => {
    date = new Date(v)
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()
    //head
    title.innerHTML = `${y} 年`
    subtitle.innerText = `${fill(m + 1)}月${fill(d)}日 周${days[date.getDay()]}`
    text.innerText = `${y}年 ${fill(m + 1)}月`
    //list
    const seats = new Date(y, m, 1).getDay()
    seat.style.width = seats === 0 ? 0 : `calc((100% / 7) * ${seats})`
    for (const item of list.querySelectorAll('li.hide')) item.classList.remove('hide')
    const day = new Date(y, m + 1, 0).getDate()
    for (let i = list.children.length - 1; i > day; i--) list.children[i].classList.add('hide')
    const checked = list.querySelector('li.checked')
    checked && checked.classList.remove('checked')
    list.children[d].classList.add('checked')
    //monthList
    const monthChecked = monthList.querySelector('li.checked')
    monthChecked && monthChecked.classList.remove('checked')
    monthList.children[m].classList.add('checked')
    //yearList
    const yearChecked = yearList.querySelector('li.checked')
    yearChecked && yearChecked.classList.remove('checked')
    const min = getMin()
    yearList.style.counterReset = `year ${min}`
    yearList.children[y - min - 1].classList.add('checked')
  }

  const setValue = v => {
    const val = format(v)
    if (format(v) !== format(date)) {
      const ev = new Event('change')
      ev.value = val
      node.dispatchEvent(ev)
    }
    node.value = val
  }

  title.addEventListener('click', () => {
    const name = 'toggle-year'
    root.classList.toggle(name)
    if (!root.classList.contains(name)) return
    const view = yearList.querySelector('li.checked')
    view.scrollIntoViewIfNeeded ? view.scrollIntoViewIfNeeded() : view.scrollIntoView()
  })

  left.addEventListener('click', () => setValue(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())))
  right.addEventListener('click', () => setValue(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())))
  text.addEventListener('click', () => root.classList.toggle('toggle-month'))
  list.appendChild(createElement(31, v => setValue(new Date(date.getFullYear(), date.getMonth(), v))))
  for (let i = 0; i < monthList.children.length; i++) {
    monthList.children[i].addEventListener('click', () => {
      root.classList.remove('toggle-month')
      setValue(new Date(date.getFullYear(), i, date.getDate()))
    })
  }
  yearList.appendChild(createElement(100, v => {
    setValue(new Date(getMin() + v, date.getMonth(), date.getDate()))
    root.classList.remove('toggle-year')
  }))

  render(date)
  return {
    value: {
      get: () => format(date),
      set: v => render(v),
      sync: false
    }
  }
}

define('date', { template, props, setup })