import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    jsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: { enabled: false } // true 生成文件一次即可 并在eslint中加入配置(.eslintrc-auto-import.json) ts配置中加入(auto-imports.d.ts)
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
})

// pnpm i @types/node -D 解决使用node变量报错
