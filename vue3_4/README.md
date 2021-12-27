## v-bind
- 一次绑定多个属性
```javascript
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
<div v-bind="objectOfAttrs"></div>
```

## 模板中可访问的全局变量
```javascript
Infinity undefined NaN isFinite isNaN parseFloat parseInt
decodeURI decodeURIComponent encodeURI encodeURIComponent
Math Number Date Array Object Boolean String RegExp Map
Set JSON Intl BigInt
```
- 如果想自定义 可以在`app.config.globalProperties`上显式的添加

## 动态指令
```html
<a v-bind:[attributeName]="url"> ... </a>
<!-- 缩写 -->
<a :[attributeName]="url"> ... </a>
```
- 指令名必须为字符串

## 动态事件
```html
<a v-on:[eventName]="doSomething"> ... </a>
<!-- 缩写 -->
<a @[eventName]="doSomething">
```
- 指令名必须为字符串

## 响应式数据
- 响应式系统是通过属性进行追踪的 所以不能直接替换一个响应式对象
```javascript
let obj = reactive({
  name: 'wyb'
})
const change = () => {
  // wrong
  obj = reactive({
    name: 'wyb1'
  })
  // right
  Object.assign(obj, {
    name: 'wyb1'
  })
}
```
- 从响应式对象中解构属性时 同样会失去响应式
```javascript
let obj = reactive({
  name: 'wyb'
})
const change = () => {
  let { name } = obj
  name += '1'
}
```
- 顶层的`ref`在模板中使用会被自动解套 而深层的不会(访问数组和Map中的set也不会被解套)
```javascript
{{ name }}
{{ obj.name }} <!-- unwrapped -->
```
```javascript
const name = ref('wyb')
const obj = { name: ref('wyb') }
```

## 类与样式绑定
- 给子组件绑定类时 如果子组件存在多个根节点 需要在指定根节点上接收这个类
> 子组件
```html
<div :class="[$attrs.class, 'test1']">第一行</div>
<div>第二行</div>
```
> 父组件
```html
<Child class="test" />
```

## watch && watchEffect
```javascript
// ref
watch(x, val => {
  console.log(val)
})
// 函数
watch(() => x.value, val => {
  console.log(val)
})
// 数组
watch([x, () => y.value], ([val1, val2]) => {
  console.log(val1, val2)
})
// watchEffect会自动监听函数内所有响应式数据(取值操作)
const x = ref(0)
const y = ref(0)
watchEffect(() => {
  const res = x.value + y.value
  console.log(res)
})
// watch默认是在组件更新之前被调用 如果想在watch中拿到更新后的dom
// watchEffect同理
// 也可以直接使用 watchPostEffect
watch(source, callback, {
  flush: 'post'
})
```

## 模板ref
```html
// 普通ref
<template>
  <input type="text" ref="input" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const input = ref(null)
onMounted(() => {
  console.log(input.value)
})
</script>
// 动态ref 首席渲染和组件更新的时候都会调用
<template>
  <input type="text" :ref="inputRef" />
</template>
<script setup lang="ts">
const inputRef = el => {
  console.log(el)
}

// 组件ref 拿到的值就是组件实例
// 如果子组件是options api 或 没有使用 script+setup 则拿到的就是this
// 如果使用了 script+setup 则只会拿到子组件中使用 defineExpose 暴露的变量
</script>
```

## props
- 基本使用 使用defineProps接收props 可以直接在模板中使用
```html
// parent.vue
<template>
  <input type="text" v-model="name" />
  <Child :name="name" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Child from './child.vue'
const name = ref('wyb')
</script>
// child.vue
<template>
  <div>第一行{{ name }}</div>
</template>
<script setup lang="ts">
const props = defineProps({ name: String }) 
// 使用数组 defineProps(['name'])
// 结合ts defineProps<{ name?: string }>()
console.log(props.name)
</script>
```
- 绑定多个prop
```html
// parent.vue
<template>
  <Child v-bind="obj" />
</template>
<script setup lang="ts">
import { reactive } from '@vue/reactivity'
import Child from './child.vue'
const obj = reactive({
  name: 'wyb',
  age: 18
})
</script>
// child.vue
<template>
  <div>第一行{{ name }}</div>
  <div>第一行{{ age }}</div>
</template>
<script setup lang="ts">
defineProps<{ name?: string; age: number }>()
</script>
```

## 事件交互
```html
// parent.vue
<template>
  <Child @test="test" />
</template>
<script setup lang="ts">
import Child from './child.vue'
const test = params => {
  console.log(params)
}
</script>
// child.vue
<template>
  <div @click="emit('test', 'wyb')">第一行</div>
</template>
<script setup lang="ts">
const emit = defineEmits(['test']) // 必须定义
</script>
```

## Attribute 继承
- 子组件作为本组件的唯一根节点时 本组件没有声明过的属性才会被子组件继承
- 禁用 Attribute 需要在组件选项中设置 `inheritAttrs: false` 如果还想使用 script+setup语法 就单独定义一个script用于设置
```html
<script>
export default {
  inheritAttrs: false
}
</script>
<script setup>
// ...setup 部分逻辑
</script>
```
- 多个根节点组件 可以用 `v-bind="$attrs"` 显示的给某一个组件绑定
- 在本组件访问未显式声明的属性 可以使用 `const attrs = useAttrs()`