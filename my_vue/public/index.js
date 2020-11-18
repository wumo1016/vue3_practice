
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue = {}));
}(this, (function (exports) { 'use strict';

  let activeEffect;

  function effect(fn){
    // 默认effect 需要先执行一次
    activeEffect = fn;
    fn();
    activeEffect = null; // 页面渲染完成要清空
  }

  function reactive(target){
    return new Proxy(target, { // 不用重写每一个属性
      set(target, key, value, receiver){ // 拦截器,性能更高,兼容性差
        const res = Reflect.set(target, key, value, receiver);
        tigger(target, key);
        return res
      },
      get(target, key, receiver){ // 递归处理
        const res = Reflect.get(target, key, receiver);
        track(target, key);
        if(typeof res === 'object'){
          return reactive(res)
        }
        return res
      }
    })
  }

  const targetMap = new WeakMap();
  function track(target, key){ // 依赖收集
    let depsMap = targetMap.get(target);
    if(!depsMap){
      targetMap.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if(!deps){
      depsMap.set(key, deps = new Set());
    }
    if(activeEffect && !deps.has(activeEffect)){
      deps.add(activeEffect);
    }
  }

  function tigger(target, key){ // 派发更新
    const depsMap = targetMap.get(target);
    if(!depsMap) return
    const effects = depsMap.get(key);
    effects && effects.forEach(effect => effect());
  }

  // 运行时的包 dom操作

  const nodeOps = {
    insert(child, parent, anchor){
      if(anchor){
        parent.insertBefore(child, anchor);
      } else {
        parent.appendChild(child);
      }
    },
    remove(child){
      const parent = child.parentNode;
      parent && parent.removeChild(child);
    },
    createElement(tag){
      return document.createElement(tag)
    },
    hostSetElementText(el, text){
      el.textContent = text;
    },
    hostPatchProps(el, key, value){
      if(/^on[a-z]+/i.test(key)){ // 事件
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
      } else {
        if(key === 'style'){
          for (const k in value) {
            el.style[k] = value[k];
          }
        } else { // id class
          el.setAttribute(key, value);
        }
      }
    },
  };

  function render(vnode, container){
    patch(null, vnode, container);
  }

  /**
   * @param n1: 老的虚拟节点
   * @param n2: 新的虚拟节点
   * @param container: 容器
   */

  function patch(n1, n2, container){
    if(typeof n2.tag === 'string'){
      // 标签渲染
      mountElement(n2, container);
    } else if(typeof n2.tag === 'object'){
      // 组件渲染
      mountComponent(n2, container);
    }
  }

  function mountComponent(vnode, container){
    // 根据组件创建一个实例
    const instance = {
      vnode,
      render: null, // 当前setup的返回值
      subTree: null, // render方法返回值
    };
    const Component = vnode.tag;
    instance.render = Component.setup(vnode.props, instance);
    // 组件单独effect，这样当组件数据更新的时候，只会更新当前组件，而不会更新父组件
    effect(() => {
      // 如果返回的的是对象，将template编译成render函数
      instance.subTree = instance.render && instance.render();
      patch(null, instance.subTree, container);
    });
  }

  function mountElement(vnode, container){
    const { tag, props, children } = vnode;
    // 将虚拟节点与真实节点建立映射关系
    let el = (vnode.el = nodeOps.createElement(tag));
    // 将当前属性赋给当前el
    if(props){
      for (const key in props) {
        nodeOps.hostPatchProps(el, key, props[key]);
      }
    }
    // 如果有子级， 递归操作
    if(Array.isArray(children)){
      mountChildren(children, el);
    } else if(children) {
      nodeOps.hostSetElementText(el, children);
    }
    // 最后将最外层dom挂载到传入的容器中
    nodeOps.insert(el, container);
  }

  function mountChildren(children, container){
    for (let index = 0; index < children.length; index++) {
      const child = children[index];
      patch(null, child, container);
    }
  }

  exports.effect = effect;
  exports.reactive = reactive;
  exports.render = render;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
