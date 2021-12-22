import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { parallel } from 'gulp'
import path from 'path'
import { outDir, zpRoot } from './utils/paths'
import { rollup, OutputOptions } from 'rollup'
import asyncfs from 'fs'
const fs = asyncfs.promises
import { buildConfig } from './utils/config'
import { pathRewriter } from './utils'

const buildFull = async () => {
  // rollp打包配置
  const config = {
    input: path.resolve(zpRoot, 'index.ts'),
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

async function buildEntry() {
  const entryFiles = await fs.readdir(zpRoot, { withFileTypes: true })
  const entryPoints = entryFiles
    .filter(f => f.isFile())
    .filter(f => !['package.json'].includes(f.name))
    .map(f => path.resolve(zpRoot, f.name))

  const config = {
    input: entryPoints,
    plugins: [nodeResolve(), vue(), typescript()],
    external: (id: string) => /^vue/.test(id) || /^@z-plus/.test(id)
  }
  const bundle = await rollup(config)
  return Promise.all(
    Object.values(buildConfig)
      .map(config => ({
        format: config.format,
        dir: config.output.path,
        paths: pathRewriter(config.output.name)
      }))
      .map(option => bundle.write(option as OutputOptions))
  )
}

// 这是一个任务
export const buildFullComponent = parallel(buildFull, buildEntry)

// pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w
