import { createVNode } from "./vnode"

export function createAppApi(render) {
  return (rootCompoment) => {
    const app = {
      mount(container) {
        const vnode = createVNode(rootCompoment)
        render(vnode, container)
      }
    }
    return app
  }
}
