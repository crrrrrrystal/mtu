import { define } from '../../core.js'

const template = `<style>:host{display:inline-block;vertical-align:middle;width:40px;height:40px;position:relative}:host([mode=linear]){display:block;height:4px;width:auto}:host([mode=linear]) .line{display:block}:host([mode=linear]) .circle{display:none}:host([value]:not([value="-1"])) .circle>.one{display:none}:host([value]:not([value="-1"])) .circle>.two{display:block}:host([mode=linear][value]:not([value="-1"])) .line::before,:host([mode=linear][value]:not([value="-1"])) .line::after{display:none}:host([mode=linear][value]:not([value="-1"])) .line>span{display:block}div{pointer-events:none}.line{height:100%;background:rgba(var(--color-accent),.24);overflow:hidden;display:none}.line::before,.line::after{top:0;left:0;content:'';position:absolute;height:100%;width:100%;background:rgba(var(--color-accent));transform-origin:left top}@keyframes before{0%{transform:translateX(0) scaleX(0)}50%{transform:translateX(30%) scaleX(.7)}100%{transform:translateX(100%) scaleX(0)}}.line::before{animation:before 2s linear infinite}@keyframes after{0%{transform:translateX(0) scaleX(0)}50%{transform:translateX(0) scaleX(0)}75%{transform:translateX(0) scaleX(.25)}100%{transform:translateX(100%) scaleX(0)}}.line::after{animation:after 2s linear infinite}.line>span{display:none;height:100%;width:0;background:rgba(var(--color-accent))}.circle{display:block;align-items:center;justify-content:center;height:100%;width:100%}.circle>svg{position:absolute;width:100%;height:100%;transform:rotate(-90deg)}.circle>svg>circle{fill:none;stroke:rgba(var(--color-accent));stroke-width:20px;transform-origin:center;stroke-dasharray:565.4866776461628}@keyframes one-rotate{0%{transform:rotate(-90deg)}to{transform:rotate(270deg)}}.circle>.one{animation:one-rotate 1335ms linear infinite}@keyframes one-load{0%{stroke-dashoffset:554.1769440932395}12.5%{stroke-dashoffset:138.54423602330988;transform:rotate(0deg)}25%{stroke-dashoffset:554.1769440932395;transform:rotate(270deg)}37.5%{stroke-dashoffset:138.54423602330988;transform:rotate(270deg)}50%{stroke-dashoffset:554.1769440932395;transform:rotate(540deg)}62.5%{stroke-dashoffset:138.54423602330988;transform:rotate(540deg)}75%{stroke-dashoffset:554.1769440932395;transform:rotate(810deg)}87.5%{stroke-dashoffset:138.54423602330988;transform:rotate(810deg)}100%{stroke-dashoffset:554.1769440932395;transform:rotate(1080deg)}}.circle>.one>circle{stroke-dashoffset:554.1769440932395;animation:one-load 4s linear infinite}.circle>.two{display:none}</style><div class="circle"><svg class="one" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90"></circle></svg><svg class="two" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90"></circle></svg></div><div class="line"><span></span></div>`
const props = ['value', 'max', 'mode']

const setup = (shadow, node) => {
  const line = shadow.querySelector('.line>span')
  const circle = shadow.querySelector('.circle>.two')
  const update = (max, value) => {
    line.style.width = (value / max * 100) + '%'
    circle.style.strokeDashoffset = 565.4866776461628 * (1 - value / max)
  }

  return {
    value: {
      get: -1,
      set: v => update(node.max, v),
    },
    max: {
      get: 100,
      set: v => update(v, node.value)
    },
    mode: ['circle', 'linear']
  }
}

define('progress', { template, props, setup })