import { hasChanged, hasOwn, isArray, isInteger, isObject, isSymbol } from "../shared/index"
import { reactive } from "./reactive"
import { tigger, track } from "./effect"

function createGetter() {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    // 如果取得值是symbol类型 忽略
    if (isSymbol(key)){
      return res
    }
    track(target, key)
    // 如果是对象再次代理
    if(isObject(res)){
      return reactive(res)
    }
    // 依赖收集
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    // 新增/修改 属性
    const oldVal = target[key]
    // 判断是否有当前属性 1.数组(如果索引小于数组长度，就是修改) 2.对象
    const hadKey = isArray(target) && isInteger(key) ? Number(key) < target.length : hasOwn(target, key)
    const res = Reflect.set(target, key, value)
    if(!hadKey){ // 新增属性
      tigger(target, 'add', key, value)
    } else if(hasChanged(value, oldVal)) { // 修改属性
      tigger(target, 'edit', key, value, oldVal)
    }
    return res
  }
}

const get = createGetter() // 为了预置参数
const set = createSetter()

export const mutableHandler = {
  get,
  set
}
