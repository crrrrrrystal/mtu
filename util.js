export const animationEnd = (v, call) => {
  const on = ['animationend', 'animationcancel']
  const called = () => {
    call()
    v.removeEventListener(on[0], called)
    v.removeEventListener(on[1], called)
  }
  v.addEventListener(on[0], called)
  v.addEventListener(on[1], called)
}

export const transitionEnd = (v, call) => {
  const on = ['transitionend', 'transitioncancel']
  const called = () => {
    call()
    v.removeEventListener(on[0], called)
    v.removeEventListener(on[1], called)
  }
  v.addEventListener(on[0], called)
  v.addEventListener(on[1], called)
}