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
```javascript
<a v-bind:[attributeName]="url"> ... </a>
<!-- 缩写 -->
<a :[attributeName]="url"> ... </a>
```
- 指令名必须为字符串

## 动态事件
```javascript
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