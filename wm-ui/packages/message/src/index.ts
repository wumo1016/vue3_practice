import type { IMessageParams } from './types'
import MessageComp from './message.vue'
import { createVNode, render, VNode } from 'vue'

const instanceQueue = new Set<VNode>()

const Message = (options: IMessageParams) => {

  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let offset = options.offset || 20
  Array.from(instanceQueue).forEach(ins => {
    offset += ins.el.offsetHeight + 20
  })

  const useClose = options.onClose
  let opts = {
    ...options,
    offset,
    onClose: () => {
      useClose?.() // es10的链判断运算符
    }
  }

  const vnode = createVNode(MessageComp, opts as any)
  vnode.props.onDestory = () => {
    instanceQueue.delete(vnode)
    Array.from(instanceQueue).forEach(ins => {
      ins.el.style.top = ins.el.style.top.replace('px', '') - 50 - 20 + 'px'
    })
    render(null, container)
  }
  const container = document.createElement('div')
  render(vnode, container)
  document.body.appendChild(container.firstElementChild)

  instanceQueue.add(vnode)
}

export default Message