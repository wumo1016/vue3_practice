import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        page1: resolve(__dirname, 'page1.html'),
        page2: resolve(__dirname, 'page2.html'),
      },
    },
  },
})