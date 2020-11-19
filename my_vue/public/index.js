
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
    hostPatchProps(el, key, prevProps, nextProps){
      if(/^on[a-z]+/i.test(key)){ // 事件
        const eventName = key.slice(2).toLowerCase();
        // 更新事件
        prevProps && el.removeEventListener(eventName, prevProps);
        nextProps && el.addEventListener(eventName, nextProps);
      } else {
        if(nextProps == null){
          return el.removeAttribute(key) // 删除元素上的属性
        }
        if(key === 'style'){
          for (const k in nextProps) {
            el.style[k] = nextProps[k];
          }
          for (const k in prevProps) {
            if(!nextProps.hasOwnProperty(k)){
              el.style[k] = null;
            }
          }
        } else { // id class
          el.setAttribute(key, nextProps);
        }
      }
    },
  };

  function render(vnode, container) {
    patch(container._vnode, vnode, container);
    container._vnode = vnode; // 上一次渲染的虚拟节点
  }

  /**
   * @param n1: 老的虚拟节点
   * @param n2: 新的虚拟节点
   * @param container: 容器
   */

  function patch(n1, n2, container) {

    if (typeof n2.tag === 'string') {
      // 标签渲染 1.初次渲染 2.diff操作
      processElement(n1, n2, container);
    } else if (typeof n2.tag === 'object') {
      // 组件渲染
      mountComponent(n2, container);
    }
  }

  function processElement(n1, n2, container) {
    if (n1 == null) {
      mountElement(n2, container);
    } else {
      patchElement(n1, n2);
    }
  }

  function mountElement(vnode, container) {
    const {
      tag,
      props,
      children
    } = vnode;
    // 将虚拟节点与真实节点建立映射关系
    let el = (vnode.el = nodeOps.createElement(tag));
    // 将当前属性赋给当前el
    if (props) {
      for (const key in props) {
        nodeOps.hostPatchProps(el, key, {}, props[key]);
      }
    }
    // 如果有子级， 递归操作
    if (Array.isArray(children)) {
      mountChildren(children, el);
    } else if (children) {
      nodeOps.hostSetElementText(el, children);
    }
    // 最后将最外层dom挂载到传入的容器中
    nodeOps.insert(el, container);
  }

  function mountChildren(children, container) {
    for (let index = 0; index < children.length; index++) {
      const child = children[index];
      patch(null, child, container);
    }
  }

  function patchElement(n1, n2, container) {
    let el = (n2.el = n1.el);
    const oldProps = n1.props;
    const newProps = n2.props;
    patchProps(el, oldProps, newProps);

    // 比对元素中的孩子
    patchChildren(n1, n2, el);
  }

  function patchProps(el, oldProps, newProps) {
    // 比较属性
    if (oldProps !== newProps) {
      // 1.将新的属性全部设置，以新的为准
      for (const key in newProps) {
        const o = oldProps[key];
        const n = newProps[key];
        if (o !== n) { // 老的属性和新的不一样，以新的为准
          nodeOps.hostPatchProps(el, key, o, n);
        }
      }
      // 2.老的里面有，新的没有，需要删掉
      for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
          nodeOps.hostPatchProps(el, key, oldProps[key], null);
        }
      }
    }
  }

  function patchChildren(n1, n2, container) {
    const c1 = n1.children;
    const c2 = n2.children;
    if (typeof c2 == 'string') {
      // c1 c2 都是字符串
      if (c1 !== c2) {
        nodeOps.hostSetElementText(container, c2);
      }
    } else {
      if (typeof c1 == 'string') {
        nodeOps.hostSetElementText(container, '');
        mountChildren(c2, container);
      } else { // 新旧都有children
        patchKeyedChildren(c1, c2, container);
      }
    }
  }

  // diff 对比两个孩子
  function patchKeyedChildren(c1, c2, container) {
    const e1 = c1.length - 1; // 老的最后一项的索引
    const e2 = c2.length - 1; // 新的最后一项的索引

    // 1.根据新节点 生成一个key => index 的映射表
    const keyedToNewIndexMap = new Map();
    for (let i = 0; i <= e2; i++) {
      const currentEle = c2[i];
      keyedToNewIndexMap.set(currentEle.props.key, i);
    }
    // 2.去老的里面找 看看有没有对应的,如果有一样的就复用老的,没有就删除老的
    for (let i = 0; i <= e1; i++) {
      const oldVnode = c1[i];
      const newIndex = keyedToNewIndexMap.get(oldVnode.props.key);
      if(newIndex == undefined){
        // 老的有 新的没有，就移除
        nodeOps.remove(oldVnode.el);
      } else {
        // 复用 更新属性
        patch(oldVnode, c2[newIndex], container);
      }
    }
    // key一样 移动操作 从后往前插入
    for (let i = e2; index >= 0; i--) {
      const anchor = i + 1 <= e2 ? c2[i+1].el : null;
      
    }



    // 3.新的比老的多 就添加 老的比新的多就删除
    // 4.两个key一样，就对比属性，移动
  }

  function mountComponent(vnode, container) {
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

  exports.effect = effect;
  exports.reactive = reactive;
  exports.render = render;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
