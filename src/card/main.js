import { define } from '../../core.js'

const template = `<style>:host{background:var(--color-background-card);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);border-radius:2px;display:block}</style><slot></slot>`

define('card', { template })