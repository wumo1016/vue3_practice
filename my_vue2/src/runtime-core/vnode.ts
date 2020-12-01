import { isArray, isObject, isString, shapeFlags } from '../shared/index'
// type类型
export function createVNode(type, props: any = {}, children = null) {

  const shapeFlag = isString(type) ?
    shapeFlags.ELEMENT : isObject(type) ?
      shapeFlags.STATEFUL_COMPONENT : 0

  const vnode = { // 虚拟节点可以dom结构，也可以用来组件
    type,
    props,
    children,
    component: null, // 组件实例
    el: null, // 虚拟节点和真实节点建立一个映射关系
    key: props.key,
    shapeFlag // vue3 虚拟节点的类型 1.元素2.组件
  }

  if (isArray(children)) {
    // a = 1 b = 16 a |= 16
    // a = 0000001
    // b = 0001000
    // a |= b  a = 0001001
    vnode.shapeFlag |= shapeFlags.ARRAY_CHILDREN
  } else {
    vnode.shapeFlag |= shapeFlags.TEXT_CHILDREN
  }

  return vnode
}
