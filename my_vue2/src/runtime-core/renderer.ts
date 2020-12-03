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

  function mountElement(vnode, container, anchor) {
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
    hostInsert(el, container, anchor)
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
        if (nextShapeFlag & shapeFlags.ARRAY_CHILDREN) {  // 新的是数组 => 挂载新的
          mountChildren(c2, el)
        }
      } else if (prevShapeFlag & shapeFlags.ARRAY_CHILDREN) { // 旧的是数组 => diff算法
        patchKeydChildren(c1, c2, el)
      }
    }
  }

  function patchKeydChildren(c1, c2, el) {
    // 最后一项的索引
    let e1 = c1.length - 1
    let e2 = c2.length - 1
    // 循环索引
    let i = 0
    // 先处理key一样的
    // 从前往后比对 abc abcd
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = c2[i]
      if (isSameVnodeType(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      i++
    }
    // 从后往前比对 abc dabc
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if (isSameVnodeType(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      e1--
      e2--
    }
    // 处理key不一样的
    // 新增 abc => abcde => i:3 e1:2 e2:4 abc deabc => i:0 e1:-1 e2:1
    // 删除 abcde =>  abc => i:3 e1:4 e2:2 abcde cde => i:0 e1:1 e2:-1
    if (i > e1) { // 表示新增
      // 先根据 e2+1 元素，跟数组长度对比
      const nextPos = e2 + 1
      const anchor = nextPos < c2.length ? c2[nextPos].el : null
      while (i <= e2) {
        patch(null, c2[i], el, anchor)
        i++
      }
    } else if (i > e2) { // 表示删除
      while (i <= e1) { // 删除的部份
        hostRemove(c1[i].el)
        i++
      }
    } else { // 完全无序 diff
      // abcde  => adbec => i:1 e1:4 e2:4
      // 建立key索引映射表 只需要将i和e2之间的(包含)元素做映射
      const keyToIndex = new Map()
      for (let index = i; index <= e2; index++) {
        const newChild = c2[index]
        keyToIndex.set(newChild.key, index)
      }
      const toBePatched = e2-i+1
      const newIndexToOldmapIndex = Array(e2-i+1).fill(-1)
      for (let index = i; index <= e1; index++) {
        const prevChild = c1[index]
        const newIndex = keyToIndex.get(prevChild.key)
        // 旧的元素不在新的里面，直接删除
        if(!newIndex){
          hostRemove(prevChild.el)
        } else { // 相同key的元素更新其节点 标记当前新节点在旧节点中的索引
          newIndexToOldmapIndex[newIndex-i] = index + 1 // +1是为了防止结果是0
          patch(prevChild, c2[newIndex], el)
        }
      }
      const increasingIndexSequence = getSequence(newIndexToOldmapIndex)
      let j = increasingIndexSequence.length - 1

      for (let index = toBePatched - 1; index >= 0; index--) {
        const nextIndex = i + index
        const nextChild = c2[nextIndex].el
        const anchor = nextIndex + 1 < c2.length ? c2[nextIndex + 1].el : null // 当前索引的前一项
        if(newIndexToOldmapIndex[index] == -1){
          patch(null, nextChild, el)
        } else {
          if(j < 0 || index != increasingIndexSequence[j]){
            hostInsert(nextChild, el, anchor)
          } else {
            j--
          }
        }
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

  function processElement(n1, n2, container, anchor) {
    if (n1 == null) {
      mountElement(n2, container, anchor)
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

  const patch = (n1, n2, container, anchor = null) => {
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
      processElement(n1, n2, container, anchor)
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
