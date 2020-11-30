import { createRenderer } from "../runtime-core/index"
import { nodeOps } from "./nodeOps"
import { patchProp } from "./patchprops"

const renderOptions = { ...nodeOps, patchProp } // dom操作

function ensureRenderer() {
  return createRenderer(renderOptions)
}

export function createApp(rootCompoment) {
  // 根据组件，创建一个渲染器
  const app = ensureRenderer().createApp(rootCompoment)
  const { mount } = app // 和平台无关mount
  app.mount = function(container){ // 重写mount
    const el = document.querySelector(container)
    el.innerHTML = ''
    mount(el)
  }
  return app
}
