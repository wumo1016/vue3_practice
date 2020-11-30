export const isObject = val => typeof val === 'object' && val !== null

export const isSymbol = val => typeof val === 'symbol'

export const isArray = Array.isArray
// 是否是整型
export const isInteger = key => '' + parseInt(key, 10) === key

const hasOwnProerty = Object.prototype.hasOwnProperty
export const hasOwn = (val, key) => hasOwnProerty.call(val, key)

export const hasChanged = (val, oldVal) => val !== oldVal
