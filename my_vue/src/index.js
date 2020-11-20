import {
  effect
} from './reactivity'
import {
  nodeOps
} from './runtime-dom'
export * from './reactivity'

export function render(vnode, container) {
  patch(container._vnode, vnode, container)
  container._vnode = vnode // 上一次渲染的虚拟节点
}

/**
 * @param n1: 老的虚拟节点
 * @param n2: 新的虚拟节点
 * @param container: 容器
 */

function patch(n1, n2, container, anchor) {

  if (typeof n2.tag === 'string') {
    // 标签渲染 1.初次渲染 2.diff操作
    processElement(n1, n2, container, anchor)
  } else if (typeof n2.tag === 'object') {
    // 组件渲染
    mountComponent(n2, container)
  }
}

function processElement(n1, n2, container, anchor) {
  if (n1 == null) {
    mountElement(n2, container, anchor)
  } else {
    patchElement(n1, n2, container)
  }
}

function mountElement(vnode, container, anchor) {
  const {
    tag,
    props,
    children
  } = vnode
  // 将虚拟节点与真实节点建立映射关系
  let el = (vnode.el = nodeOps.createElement(tag))
  // 将当前属性赋给当前el
  if (props) {
    for (const key in props) {
      nodeOps.hostPatchProps(el, key, {}, props[key])
    }
  }
  // 如果有子级， 递归操作
  if (Array.isArray(children)) {
    mountChildren(children, el)
  } else if (children) {
    nodeOps.hostSetElementText(el, children)
  }
  // 最后将最外层dom挂载到传入的容器中
  nodeOps.insert(el, container, anchor)
}

function mountChildren(children, container) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    patch(null, child, container)
  }
}

function patchElement(n1, n2, container) {
  let el = (n2.el = n1.el)
  const oldProps = n1.props
  const newProps = n2.props
  patchProps(el, oldProps, newProps)
  // 比对元素中的孩子
  patchChildren(n1, n2, el)
}

function patchProps(el, oldProps, newProps) {
  // 比较属性
  if (oldProps !== newProps) {
    // 1.将新的属性全部设置，以新的为准
    for (const key in newProps) {
      const o = oldProps[key]
      const n = newProps[key]
      if (o !== n) { // 老的属性和新的不一样，以新的为准
        nodeOps.hostPatchProps(el, key, o, n)
      }
    }
    // 2.老的里面有，新的没有，需要删掉
    for (const key in oldProps) {
      if (!newProps.hasOwnProperty(key)) {
        nodeOps.hostPatchProps(el, key, oldProps[key], null)
      }
    }
  }
}

function patchChildren(n1, n2, container) {
  const c1 = n1.children
  const c2 = n2.children
  if (typeof c2 == 'string') {
    // c1 c2 都是字符串
    if (c1 !== c2) {
      nodeOps.hostSetElementText(container, c2)
    }
  } else {
    if (typeof c1 == 'string') {
      nodeOps.hostSetElementText(container, '')
      mountChildren(c2, container)
    } else { // 新旧都有children
      patchKeyedChildren(c1, c2, container)
    }
  }
}

// diff 对比两个孩子
function patchKeyedChildren(c1, c2, container) {
  const e1 = c1.length - 1 // 老的最后一项的索引
  const e2 = c2.length - 1 // 新的最后一项的索引

  // 1.根据新节点 生成一个key => index 的映射表
  const keyedToNewIndexMap = new Map()
  for (let i = 0; i <= e2; i++) {
    const currentEle = c2[i];
    keyedToNewIndexMap.set(currentEle.props.key, i)
  }
  // 2.更新已有元素的属性，并将新的没有的老元素删除
  const newIndexToOldIndexMap = new Array(e2 + 1).fill(-1)
  for (let i = 0; i <= e1; i++) {
    const oldVnode = c1[i];
    const newIndex = keyedToNewIndexMap.get(oldVnode.props.key)
    if (newIndex == undefined) {
      // 老的有 新的没有，就移除
      nodeOps.remove(oldVnode.el)
    } else {
      // 复用(将新 newVnode.el = oldVnode.el )以便将来移动，更新属性
      newIndexToOldIndexMap[newIndex] = i + 1
      patch(oldVnode, c2[newIndex], container)
    }
  }
  // 根据最长递增子序列 来确定不需要移动的索引
  const sequence = getSequence(newIndexToOldIndexMap)
  let j = sequence.length - 1 // 获取末尾索引
  // 3.key一样 移动操作 从后往前插入
  for (let i = e2; i >= 0; i--) {
    let currentEle = c2[i].el
    const anchor = i + 1 <= e2 ? c2[i + 1].el : null
    if (newIndexToOldIndexMap[i] === -1) { // 这是一个新元素
      patch(null, c2[i], container, anchor)
    } else {
      if (i === sequence[j]) { // 过滤掉不需要移动的索引
        j--
      } else { // 移动/插入
        nodeOps.insert(currentEle, container, anchor)
      }
    }
  }
}

function mountComponent(vnode, container) {
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

// 获取最长子序列的索引数组
function getSequence(arr) {
  const p = arr.slice() //  保存原始数据
  const result = [0] //  存储最长增长子序列的索引数组
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1] //  j是子序列索引最后一项
      if (arr[j] < arrI) { //  如果arr[i] > arr[j], 当前值比最后一项还大，可以直接push到索引数组(result)中去
        p[i] = j //  p记录第i个位置的索引变为j
        result.push(i)
        continue
      }
      u = 0 //  数组的第一项
      v = result.length - 1 //  数组的最后一项
      while (u < v) { //  如果arrI <= arr[j] 通过二分查找，将i插入到result对应位置；u和v相等时循环停止
        c = ((u + v) / 2) | 0 //  二分查找 
        if (arr[result[c]] < arrI) {
          u = c + 1 //  移动u
        } else {
          v = c //  中间的位置大于等于i,v=c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1] //  记录修改的索引
        }
        result[u] = i //  更新索引数组(result)
      }
    }
  }
  u = result.length
  v = result[u - 1]
  //把u值赋给result  
  while (u-- > 0) { //  最后通过p数组对result数组进行进行修订，取得正确的索引
    result[u] = v
    v = p[v];
  }
  return result
}
