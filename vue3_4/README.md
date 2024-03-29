# vite2_vue3

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## 依赖注入
- 应用级供给 `app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')`
- 注入默认值 `const value = inject('message', '这是默认值')`

## 自定义指令
- 组件级指令 在`script+setup`语法中直接定义以v开头的变量即可
```html
<template>
  <input v-focus />
</template>
<script setup>
const vFocus = {
  mounted: (el) => el.focus()
}
</script>
```
- 全局指令
```javascript
const app = createApp({})
app.directive('focus', {})
```

## style支持v-bind
```html
<script setup>
import { ref } from 'vue'
const color = ref('red')
</script>
<style scoped>
div {
  color: v-bind(color);
}
</style>
```
