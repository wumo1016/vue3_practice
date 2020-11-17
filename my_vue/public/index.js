
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue = {}));
}(this, (function (exports) { 'use strict';

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
    // 如果返回的的是对象，将template编译成render函数
    instance.subTree = instance.render && instance.render();
    patch(null, instance.subTree, container);
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

  exports.render = render;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
