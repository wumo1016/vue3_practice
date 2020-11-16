
const _toString = Object.prototype.toString

// 严格判断是否是对象
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}
// 检查key是否是对象自己实例上的属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
// 判断一个字符串开头是否包含 $ 或 _
export function isReserved (str) {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}
