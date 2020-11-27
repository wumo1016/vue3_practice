import { isArray, isInteger } from "../shared/index"

export function effect(fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

let activeEffect, uid = 0
const effectStack = [] // effect栈
function createReactiveEffect(fn, options) {
  const effect = function () {
    if (effectStack.includes(effect)) return // 防止递归执行
    try {
      activeEffect = effect
      effectStack.push(activeEffect)
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
    /* 
    try {
      activeEffect = effect
      return fn()
    } finally {
      activeEffect = null
    }
    不像上面写得原因是，到state.address 的时候activeEffect=null了
    effect(() => {
      state.name
      effect(() => {
        state.age
      })
      state.address 
    })
    */
  }
  effect.id = uid++
  effect.deps = [] // 表示effect中依赖了哪些属性
  effect.options = options
  return effect
}
// 将effect和属性联系起来 { obj: { age: [ effect, effect ] }  }
const targetMap = new WeakMap()
export function track(target, key) {
  if (activeEffect == undefined) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(key)
  }
}

export function tigger(target, type, key, value?, oldVal?) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const run = effects => effects && effects.forEach(effect => effect())

  // 数组特殊情况 例如：使用了 state[2] 修改了 state.length = 1
  if(key === 'length' && isArray(target)){
    depsMap.forEach((dep, k) => {
      if(k === 'length' || k >= value){
        run(dep)
      }
    });
  } else {
    if (key != void 0) { // 说明修改了某个key void 0 == undefined
      const effects = depsMap.get(key)
      run(effects)
    }
    switch(type){
      case 'add': {
        if(isArray(target)){ // 如果通过索引增加选项
          if(isInteger(key)){
            run(depsMap.get('length')) // 如果页面中直接使用了数组，回对length进行收集
          }
        }
      }
    }
  }
}
