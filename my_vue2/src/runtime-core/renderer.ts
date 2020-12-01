import { effect } from "../reactivity/index"
import { shapeFlags } from "../shared/index"
import { createAppApi } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component"

// options 平台相关方法
export function createRenderer(options) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options) {
  const {
    createElement: hostCreatElement,
    patchProp: hostPatchProp,
    setElementText: hostSetElementText,
    insert: hostInsert,
    renove: hostRemove
  } = options

  function mountElement(vnode, container) {
    const { type, shapeFlag, children, props } = vnode
    const el = vnode.el = hostCreatElement(type)
    // 创建儿子
    if(shapeFlag & shapeFlags.TEXT_CHILDREN){
      hostSetElementText(el, children)
    } else if(shapeFlag & shapeFlags.ARRAY_CHILDREN){
      mountChildren(children, el)
    }
    if(props){
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    hostInsert(el, container)
  }

  function mountChildren(children, container){
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container)
    }
  }
 
  function patchElement(n1, n2, container) {
  }

  function mountComponent(vnode, container) {
    // 组件挂载逻辑
    // 1.创建组件实例
    const instance = vnode.component = createComponentInstance(vnode)
    // 2.找到组件的render方法
    setupComponent(instance)
    // 3.执行render方法 给组件创建一个effect watcher
    setupRenderEffect(instance, vnode, container)
  }

  function setupRenderEffect(instance, vnode, container) {
    effect(function componentEffect() {
      if (!instance.isMounted) {
        // 渲染组件中的内容 组件渲染的结果
        const subTree = instance.subTree = instance.render()
        patch(null, subTree, container)
        instance.isMounted = true
      } else {
        // 更新逻辑
        const perv = instance.subTree
        const next = instance.render()
        console.log(perv)
        console.log(next)
      }
    })
  }

  function updateComponent(n1, n2, container) {

  }

  function processElement(n1, n2, container) {
    if (n1 == null) {
      mountElement(n2, container)
    } else {
      patchElement(n1, n2, container)
    }
  }

  function processComponent(n1, n2, container) {
    if (n1 == null) {
      mountComponent(n2, container)
    } else {
      updateComponent(n1, n2, container)
    }
  }

  const patch = (n1, n2, container) => {
    const { shapeFlag } = n2
    // 按位与 同一位置上都是1，才是1
    // 10100 10100
    // 00100 00001
    // 00100 00000
    if (shapeFlag & shapeFlags.ELEMENT) { // 如果是元素
      processElement(n1, n2, container)
    } else if (shapeFlag & shapeFlags.STATEFUL_COMPONENT) { // 如果是组件
      processComponent(n1, n2, container)
    }
  }

  const render = (vnode, container) => {
    // 需要将虚拟节点变成真实节点 挂载到元素上
    patch(null, vnode, container)
  }

  return {
    createApp: createAppApi(render)
  }
}
