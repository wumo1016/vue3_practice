import { createApp } from 'vue'
import App from './App.vue'

import '@zi-shui/theme-chalk/src/index.scss'
import Icon from '@zi-shui/components/icon'
import Tree from '@zi-shui/components/tree/index'

const plugins = [Icon, Tree]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin)) // 将组件注册成了全局组件 ，可以直接使用了

app.mount('#app')
