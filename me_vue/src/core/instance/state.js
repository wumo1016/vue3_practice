import { 
  isPlainObject, 
  hasOwn,
  isReserved,
} from '../../shared/utils'

export function initState(vm) {

  const opts = vm.$options

  if (opts.data) {
    initData(vm)
  }

}

function initData(vm) {
  let data = vm.$options.data
  data = typeof data === 'function' ? getData(data, vm) : data
  vm._data = data
  if(!isPlainObject(data)){
    error('data必须是一个对象或是一个函数并返回对象', vm)
  }

  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods

  keys.map(key => {
    if(methods && hasOwn(methods, key)){
      error(`方法${key}已经被定义成data属性了`, vm)
    }
    if(props && hasOwn(props, key)){
      error(`属性${key}已经被prop定义，请更换一个名字`, vm)
    } else if(!(isReserved(key))){
      proxy(vm, '_data', key)
    }
  })

}

export function getData(data, vm) {
  return data.call(vm)
}

const sharedPropertyDefinition = {
  configurable: true,
  enumerable: true,
}

export function proxy(target, sourceKey, key){
  Object.defineProperty(target, key, {
    ...sharedPropertyDefinition,
    get(){
      return target[sourceKey][key]
    },
    set(value){
      target[sourceKey][key] = value
    }
  })
}
