# Mtu UI组件库

```
$ npm i mtu
```

响应式跨框架的UI组件库，不依赖任何库，基于 [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 封装，兼容`React`、`Vue`等前端框架，当然也可以在`electron`中引入，Mtu 参考了 Google [Material Design](https://material-io.cn/) 设计规范，并针对移动端做了优化，适用于需要同时兼容移动端的Web项目，门户网站、后台管理系统等。

## 引入 Mtu

完全引入：
```js
import 'mtu'
```
按需引入：
```js
//引入按钮组件
import 'mtu/button'
//引入单选框
import 'mtu/radio'
```

注意：按需引入时，请务必引入样式。

```js
import 'mtu/style'
```

你可以在 `<body>` 添加属性 `theme="dark"` 来使用夜间主题。

## CDN 使用

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mtu/dist/mtu.min.css">
<script src="https://cdn.jsdelivr.net/npm/mtu/dist/mtu.min.js"></script>
```

## 兼容性

| 浏览器           | 版本 |
| ------------------- | ---- |
| Chrome              | 50+  |
| Edge                | 79+  |
| Firefox             | 63+  |
| Internet Explorer   | None |
| Opera               | 37+  |
| Safari              | 10+  |
| Android webview     | 50+  |
| Chrome for Android  | 50+  |
| Firefox for Android | 84+  |
| Opera for Android   | 10+  |
| Safari on iOS       | 10+  |
| Samsung Internet    | 5+   |


## 常见问题

如果你在 `Vue2` 中安装使用，你可能需要在 `main.js` 屏蔽 `Vue` 组件未定义的提示。

```js
Vue.config.ignoredElements = [/^m-/]
```

如果您使用 `Vite` (Vue3) ，您可能需要在项目根目录创建 `vite.config.js` 来屏蔽组件定义的提示。

```js
module.exports = {
  vueCompilerOptions: {
    isCustomElement: tag => /^m-/.test(tag)
  }
}
```

在 `React` 中组件使用 `className` 属性会变得无效，你需要使用 `class` 替代，常规事件如 `onChange` 也不会触发，你可能需要 `ref.addEventListener('change')` 替代。

## 使用组件

所有组件均使用`m-`开头的双标签：
```html
<m-button>按钮</m-button>
```

## 全局CSS变量

```css
body {
  --color-primary: 25, 118, 210; /**主要颜色rgb**/
  --color-accent: 220, 0, 78; /**选中颜色rgb**/

  --color-background: #FAFAFA; /**背景颜色**/
  --color-background-bar: #F5F5F5; /**选应用栏颜色**/
  --color-background-card: #FFFFFF; /**卡片颜色**/

  --color-border: rgba(0, 0, 0, .12); /**边框颜色**/

  --color-icon: rgba(0, 0, 0, .54); /**图标颜色**/

  --color-text: rgba(0, 0, 0, .87); /**文本颜色**/
  --color-text-secondary: rgba(0, 0, 0, .54); /**次要文本颜色**/
  --color-text-disabled: rgba(0, 0, 0, .38); /**禁用文本颜色颜色**/

  --color-ripple: rgba(0, 0, 0, .12); /**波纹颜色**/
}
```

这些变量挂载在 `<body>` 下，大多数组件都使用了这些值，也正因为如此，重新定义这些变量可以自定义所有组件配色。(夜间模式也是基于它实现的)

甚至你可以定义单个组件的配色。

```css
m-button{
  --color-accent: 25,25,25;
}
```

## 开发文档

[https://mtu.desgin](https://mtu.desgin)

---

All additional work is copyright 2019 - 2020 the snged.com authors. All rights reserved.