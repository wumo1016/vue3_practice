import { effect } from './reactivity'
import { nodeOps } from './runtime-dom'
export * from './reactivity'

export function render(vnode, container){
  patch(null, vnode, container)
}

/**
 * @param n1: 老的虚拟节点
 * @param n2: 新的虚拟节点
 * @param container: 容器
 */

function patch(n1, n2, container){
  if(typeof n2.tag === 'string'){
    // 标签渲染
    mountElement(n2, container)
  } else if(typeof n2.tag === 'object'){
    // 组件渲染
    mountComponent(n2, container)
  }
}

function mountComponent(vnode, container){
  // 根据组件创建一个实例
  const instance = {
    vnode,
    render: null, // 当前setup的返回值
    subTree: null, // render方法返回值
  }
  const Component = vnode.tag
  instance.render = Component.setup(vnode.props, instance)
  // 组件单独effect，这样当组件数据更新的时候，只会更新当前组件，而不会更新父组件
  effect(() => {
    // 如果返回的的是对象，将template编译成render函数
    instance.subTree = instance.render && instance.render()
    patch(null, instance.subTree, container)
  })
}

function mountElement(vnode, container){
  const { tag, props, children } = vnode
  // 将虚拟节点与真实节点建立映射关系
  let el = (vnode.el = nodeOps.createElement(tag))
  // 将当前属性赋给当前el
  if(props){
    for (const key in props) {
      nodeOps.hostPatchProps(el, key, props[key])
    }
  }
  // 如果有子级， 递归操作
  if(Array.isArray(children)){
    mountChildren(children, el)
  } else if(children) {
    nodeOps.hostSetElementText(el, children)
  }
  // 最后将最外层dom挂载到传入的容器中
  nodeOps.insert(el, container)
}

function mountChildren(children, container){
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    patch(null, child, container)
  }
}

