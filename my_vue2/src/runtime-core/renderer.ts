import { createAppApi } from "./apiCreateApp"

// options 平台相关方法
export function createRenderer(options) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options) {
  const render = (vnode, container) => {
    
  }
  return {
    createApp: createAppApi(render)
  }
}
