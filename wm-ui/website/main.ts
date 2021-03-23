
import { createApp } from 'vue'
import App from './app.vue'

// import WmUi from '../lib'
// import WmUi from '../lib/index.esm.js'
import WmUi from 'wm-ui'
import 'theme-chalk/lib/index.css';
createApp(App).use(WmUi).mount('#app')

// 按需加载
// import Button from '../lib/button'
// createApp(App).use(Button).mount('#app')

// 安装依赖
// yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -D
// yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D