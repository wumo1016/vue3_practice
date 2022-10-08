import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import jsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
  plugins: [
    vue(),
    jsx()
  ],
  resolve: {
    alias: []
  }
})

// @vitejs/plugin-vue => 使vite 持vue语法
// @vitejs/plugin-vue-jsx => 使vite 持jsx/tsx语法
// 安装 typescript、vue-tsc 检测ts
// vue-tsc --noEmit 检测ts但不生成输出文件
// 代码检查: pnpm i eslint eslint-plugin-vue eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin -D