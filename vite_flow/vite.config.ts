/// <reference types="vitest"/>
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
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: { web: [/.tsx$/] }
  }
})

// pritter 需要加入以下两条配置
// "editor.formatOnSave": true, // 保存时格式化代码
// "editor.defaultFormatter": "esbenp.prettier-vscode", // 使用 prettier 进行格式化

// pnpm i @types/node -D 解决使用node变量报错

// vitest => 测试完后不会退出 vitest run => 测试完后直接退出

// git remote add origin git地址
// git push origin 分支
