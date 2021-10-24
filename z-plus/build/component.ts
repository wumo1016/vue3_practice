import { parallel, series } from 'gulp'
import { sync } from 'fast-glob'
import path from 'path'
import { componentRoot } from './utils/paths'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { rollup, OutputOptions } from 'rollup'
import { buildConfig } from './utils/config'
import { pathRewriter } from './utils'

const buildEachComponent = async () => {
  // 找到 packages/components 下的所有文件夹
  // 分别把components文件下的组件打包放到 dist/es/componnet下 和 dist/lib/components
  const files = sync('*', {
    cwd: componentRoot,
    onlyDirectories: true // 只要文件夹
  })

  const builds = files.map(async (file: string) => {
    const entry = path.resolve(componentRoot, file, 'index.ts') // 每个组件的入口
    const config = {
      input: entry,
      plugins: [nodeResolve(), typescript(), vue(), commonjs()],
      external: id => /^@z-plus/.test(id) || /^vue/.test(id)
    }
    const bundle = await rollup(config)

    const options = Object.values(buildConfig).map(config => ({
      format: config.format,
      file: path.resolve(config.output.path, `components/${file}/index.js`),
      paths: pathRewriter(config.output.name) // @z-plus => z-plus/es z-plus/lib
    }))

    return Promise.all(
      options.map(option => bundle.write(option as OutputOptions))
    )
  })
}

// 这是一个任务
export const buildComponent = series(buildEachComponent)

// pnpm install fast-glob -D -w
