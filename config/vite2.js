/*
 * @Description: 
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-02-23 09:19:53
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// 自定义打包的静态目录名称
const mkdirName = 'static';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { // 配置别名
      "@": resolve(__dirname, "src"),
    },
  },
  css:{ // 样式配置
    modules: { // * css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: { // * 预编译支持css/less/scss
      css: {
        javascriptEnabled: true, // css 支持内联 JavaScript
      },
      less: {
        javascriptEnabled: true, // less 支持内联 JavaScript
      },
      scss: {
        javascriptEnabled: true,  // scss 支持内联 JavaScript
        // additionalData: "@import '@/styles/index.scss';" // 引入全局样式
      },
    },
  },
  plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus(),
  ],
  server: {
    port: 8088, // 指定开发服务器端口。
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源，
    proxy: {
      // 使用 proxy 实例
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      // Proxying websockets or socket.io
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: { // 多页面配置， 如果有需求，就在这里配置，如果不需要，可以把 input 这里删除掉
        main: resolve(__dirname, 'index.html'),
        // home: resolve(__dirname, "src/home/index.html"),
        // about: resolve(__dirname, "src/about/index.html"),
      },
      output: { // 资源打包分类
        chunkFileNames: `${mkdirName}/js/[name]-[hash].js`,
        entryFileNames: `${mkdirName}/js/[name]-[hash].js`,
        assetFileNames: `${mkdirName}/[ext]/[name]-[hash].[ext]`,
      },
    },
    assetsDir: mkdirName, // 默认： assets 目录
    terserOptions: { // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})