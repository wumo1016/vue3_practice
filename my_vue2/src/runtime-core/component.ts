import { isFunction } from "../shared/index"

export function createComponentInstance(vnode){
  const instance = {
    type: vnode.type, // 就是setup的参数
    props: {},
    vnode,
    isMounted: false,
    render: null,
    setupState: null,
    subTree: null, 
  }
  return instance
}

export function setupComponent(instance){
  // 1.对属性初始化
  // 2.对插槽初始化
  // 3.调用setup方法
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance){
  const options = instance.type
  const { setup } = options
  if(setup){
    const setupResult = setup()
    // 判断返回值
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, result){
  if(isFunction(result)){
    instance.render = result
  } else {
    instance.setupState = result
  }
  finashComponentSetup(instance)
}


function finashComponentSetup(instance){
  const options = instance.type
  // 如果传入的有render方法，以render方法为准
  if(options.render){
    instance.redner = options.render
  } else if(!instance.redner) { // 说明使用的template,需要将template编译成render函数
    // compile(Component.template)
  }
  // applyOptions() vue2 中data computed等vue 中setup的返回的结果作合并
}
 