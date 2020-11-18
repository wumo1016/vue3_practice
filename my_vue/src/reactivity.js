let activeEffect;

export function effect(fn){
  // 默认effect 需要先执行一次
  activeEffect = fn
  fn()
  activeEffect = null // 页面渲染完成要清空
}

export function reactive(target){
  return new Proxy(target, { // 不用重写每一个属性
    set(target, key, value, receiver){ // 拦截器,性能更高,兼容性差
      const res = Reflect.set(target, key, value, receiver)
      tigger(target, key)
      return res
    },
    get(target, key, receiver){ // 递归处理
      const res = Reflect.get(target, key, receiver)
      track(target, key)
      if(typeof res === 'object'){
        return reactive(res)
      }
      return res
    }
  })
}

const targetMap = new WeakMap()
function track(target, key){ // 依赖收集
  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if(!deps){
    depsMap.set(key, deps = new Set())
  }
  if(activeEffect && !deps.has(activeEffect)){
    deps.add(activeEffect)
  }
}

function tigger(target, key){ // 派发更新
  const depsMap = targetMap.get(target)
  if(!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(effect => effect())
}
