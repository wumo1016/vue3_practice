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
  Infinity,
  undefined,
  NaN,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  Math,
  Number,
  Date,
  Array,
  Object,
  Boolean,
  String,
  RegExp,
  Map,
  Set,
  JSON,
  Intl,
  BigInt
```
- 如果想自定义 可以在`app.config.globalProperties`上显式的添加