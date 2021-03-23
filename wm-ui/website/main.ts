
import { createApp } from 'vue'
import App from './app.vue'

import WmUi from 'wm-ui'
import 'theme-chalk/index.scss';

createApp(App).use(WmUi).mount('#app')

// 安装依赖
// yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -D
// yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D