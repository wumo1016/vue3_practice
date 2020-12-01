import { effect } from "../reactivity/index"
import { hasOwn, shapeFlags } from "../shared/index"
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
    remove: hostRemove
  } = options

  function mountElement(vnode, container) {
    const { type, shapeFlag, children, props } = vnode
    const el = vnode.el = hostCreatElement(type)
    // 创建儿子
    if (shapeFlag & shapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, children)
    } else if (shapeFlag & shapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el)
    }
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    hostInsert(el, container)
  }

  function mountChildren(children, container) {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container)
    }
  }

  function patchElement(n1, n2) {
    const el = n2.el = n1.el
    const oldProps = n1.props
    const newProps = n2.props
    // 比较前后的属性差异
    patchProps(oldProps, newProps, el)
    // 比较孩子
    patchChildren(n1, n2, el)
  }

  function patchProps(oldProps, newProps, el) {
    if (oldProps !== newProps) {
      // 新的需要覆盖旧的
      for (const key in newProps) {
        const prev = oldProps[key]
        const next = newProps[key]
        if (prev !== next) {
          hostPatchProp(el, key, prev, next)
        }
      }
      // 旧有新没有
      for (const key in oldProps) {
        if (!hasOwn(newProps, key)) {
          hostPatchProp(el, key, oldProps[key], null)
        }
      }
    }
  }

  function patchChildren(n1, n2, el) {
    const c1 = n1.children
    const c2 = n2.children
    // 元素类型
    const prevShapeFlag = n1.shapeFlag
    const nextShapeFlag = n2.shapeFlag
    // 新的是文本 => 覆盖掉旧的即可
    if (nextShapeFlag & shapeFlags.TEXT_CHILDREN) {
      if (c1 !== c2) {
        hostSetElementText(el, c2)
      }
    } else {
      // 旧的是文本 => 移除旧的
      if (prevShapeFlag & shapeFlags.TEXT_CHILDREN) {
        hostSetElementText(el, '')
        if(nextShapeFlag & shapeFlags.ARRAY_CHILDREN){  // 新的是数组 => 挂载新的
          mountChildren(c2, el)
        }
      } else if(prevShapeFlag & shapeFlags.ARRAY_CHILDREN){ // 旧的是数组 => diff算法
          
      }
    }

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
        const prev = instance.subTree
        const next = instance.render()
        patch(prev, next, container)
      }
    })
  }

  function updateComponent(n1, n2, container) {

  }

  function processElement(n1, n2, container) {
    if (n1 == null) {
      mountElement(n2, container)
    } else {
      patchElement(n1, n2)
    }
  }

  function processComponent(n1, n2, container) {
    if (n1 == null) {
      mountComponent(n2, container)
    } else {
      updateComponent(n1, n2, container)
    }
  }

  function isSameVnodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key
  }

  const patch = (n1, n2, container) => {
    const { shapeFlag } = n2
    // 按位与 同一位置上都是1，才是1
    // 10100 10100
    // 00100 00001
    // 00100 00000

    // 如果同一个节点的前后的标签不一样
    if (n1 && !isSameVnodeType(n1, n2)) {
      // 删除老节点
      hostRemove(n1.el)
      n1 = null
    }

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
