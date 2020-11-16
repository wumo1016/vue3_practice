import {
  initState
} from './state'

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {

    const vm = this

    vm.$options = options || {}

    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el, true)
    }

  }

  Vue.prototype.$mount = function (el, isEl = false) {
    if (!el) {
      error(`${isEl ? 'el' : '参数'}必须是一个字符串或Elment`)
    }
    if (typeof el === 'string') {
      let selected = document.querySelector(el)
      if (!selected) {
        selected = document.createElement('div')
      }
      el = selected
    }
    if (el === document.body || el === document.documentElement) {
      error('不能将Vue挂载到body或html上')
    }

    const options = this.$options


    if (!options.render) {

      // 都转换成template
      let template = options.template
      if (template) {
        if (typeof template === 'string') {

        }
      } else if (el) {
        template = el.outerHTML
      }
      // 都转换成render函数
      if (template) {

      }

      return this
    }
  }
}