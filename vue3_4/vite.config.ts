import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const resolve = (paths: string) =>
  fileURLToPath(new URL(paths, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [resolve('./src/icons/svg')], // 指定需要缓存的图标文件夹
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__'
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@v': resolve('./src/views')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false, // 解决打包编译报错
        // javascriptEnabled: true // scss 支持内联 JavaScript
        // additionalData: "@import '@/styles/variables.module.scss';" // 引入全局样式
      }
    }
  }
})
