import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { parallel } from 'gulp'
import path from 'path'
import { outDir, projectRoot, zpRoot } from './utils/paths'
import { rollup, OutputOptions } from 'rollup'

const buildFull = async () => {
  // rollp打包配置
  const config = {
    input: path.resolve(zpRoot),
    plugins: [nodeResolve(), typescript(), vue(), commonjs()],
    external: id => /^vue/.test(id) // 排除 import vue from 'vue'
  }
  const bundle = await rollup(config)

  // 两种方式 umd 和 esm
  const buildConfig = [
    {
      format: 'umd', // 格式
      file: path.resolve(outDir, 'index.js'), // 打包目的地
      name: 'ZPlus',
      exports: 'named', // 用命令的方式导出
      globals: {
        // 表示使用的Vue是全局的
        vue: 'Vue'
      }
    },
    {
      format: 'esm',
      file: path.resolve(outDir, 'index.esm.js')
    }
  ]

  return Promise.all(
    buildConfig.map(config => bundle.write(config as OutputOptions))
  )
}

// 这是一个任务
export const buildFullComponent = parallel(buildFull)

// pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w
