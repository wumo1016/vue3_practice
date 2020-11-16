
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  const _toString = Object.prototype.toString;

  // 严格判断是否是对象
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }
  // 检查key是否是对象自己实例上的属性
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }
  // 判断一个字符串开头是否包含 $ 或 _
  function isReserved (str) {
    const c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  function initState(vm) {

    const opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }

  }

  function initData(vm) {
    let data = vm.$options.data;
    data = typeof data === 'function' ? getData(data, vm) : data;
    vm._data = data;
    if(!isPlainObject(data)){
      error('data必须是一个对象或是一个函数并返回对象', vm);
    }

    const keys = Object.keys(data);
    const props = vm.$options.props;
    const methods = vm.$options.methods;

    keys.map(key => {
      if(methods && hasOwn(methods, key)){
        error(`方法${key}已经被定义成data属性了`, vm);
      }
      if(props && hasOwn(props, key)){
        error(`属性${key}已经被prop定义，请更换一个名字`, vm);
      } else if(!(isReserved(key))){
        proxy(vm, '_data', key);
      }
    });

  }

  function getData(data, vm) {
    return data.call(vm)
  }

  const sharedPropertyDefinition = {
    configurable: true,
    enumerable: true,
  };

  function proxy(target, sourceKey, key){
    Object.defineProperty(target, key, {
      ...sharedPropertyDefinition,
      get(){
        return target[sourceKey][key]
      },
      set(value){
        target[sourceKey][key] = value;
      }
    });
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {

      const vm = this;

      vm.$options = options || {};

      initState(vm);

      if (vm.$options.el) {
        vm.$mount(vm.$options.el, true);
      }

    };

    Vue.prototype.$mount = function (el, isEl = false) {
      if (!el) {
        error(`${isEl ? 'el' : '参数'}必须是一个字符串或Elment`);
      }
      if (typeof el === 'string') {
        let selected = document.querySelector(el);
        if (!selected) {
          selected = document.createElement('div');
        }
        el = selected;
      }
      if (el === document.body || el === document.documentElement) {
        error('不能将Vue挂载到body或html上');
      }

      const options = this.$options;


      if (!options.render) {

        // 都转换成template
        let template = options.template;
        if (template) ; else if (el) {
          template = el.outerHTML;
        }

        return this
      }
    };
  }

  function Vue(options){
    this._init(options);
  }

  initMixin(Vue);

  window.log = console.log;
  window.warn = function(message){
    console.error(message);
  };
  window.error = function(message, vm){
    throw new Error(`${message} ${typeof vm === 'object' ? JSON.stringify(vm) : ''}`)
  };

  const app = new Vue({
    el: '#app',
    data(){
      return {
        message: 123
      }
    },
    methods: {
      
    }
  });

  console.log();

})));
