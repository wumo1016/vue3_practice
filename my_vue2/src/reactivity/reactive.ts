import { isObject } from "../shared/index"
import { mutableHandler } from "./mutableHandler"

export function reactive(target) {
  // 需要将目标变成响应式对象 Proxy
  // 核心操作就是当读取变量的时候作依赖收集，数据变化的时候重新执行 effect
  return createReactiveObject(target, mutableHandler)
}

const proxyMap = new WeakMap()
function createReactiveObject(target, baseHandler) {
  // 如果不是对象，直接返回对象
  if (!isObject(target)) {
    return target
  }
  const existProxy = proxyMap.get(target)
  if (existProxy) {
    return existProxy
  }
  const proxy = new Proxy(target, baseHandler)
  // 将代理的对象和代理后的结果作一个映射表
  // 因为如果有同一个对象多次使用reactive，只代理一次即可
  proxyMap.set(target, proxy)
  return proxy
}
