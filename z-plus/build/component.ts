import { parallel, series } from 'gulp'
import { sync } from 'fast-glob'
import path from 'path'
import { componentRoot, outDir, projectRoot } from './utils/paths'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { rollup, OutputOptions } from 'rollup'
import { buildConfig } from './utils/config'
import { pathRewriter, run } from './utils'
import { Project } from 'ts-morph'
import glob from 'fast-glob'
import asyncfs from 'fs'
const fs = asyncfs.promises
import * as VueCompiler from '@vue/compiler-sfc'

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
  return Promise.all(builds)
}
/**
 * @Author: wyb
 * @Descripttion: 生成类型文件
 * @param {*}
 */
async function genTypes() {
  const project = new Project({
    // 生成.d.ts 我们需要有一个tsconfig
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(outDir, 'types'),
      baseUrl: projectRoot,
      paths: {
        '@z-plus/*': ['packages/*']
      },
      skipLibCheck: true,
      strict: false
    },
    tsConfigFilePath: path.resolve(projectRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  })

  const filePaths = await glob('**/*', {
    // ** 任意目录  * 任意文件
    cwd: componentRoot,
    onlyFiles: true,
    absolute: true
  })

  const sourceFiles: any[] = []

  await Promise.all(
    filePaths.map(async function (file) {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf8')
        const sfc = VueCompiler.parse(content)
        const { script } = sfc.descriptor
        if (script) {
          let content = script.content // 拿到脚本  icon.vue.ts  => icon.vue.d.ts
          const sourceFile = project.createSourceFile(file + '.ts', content)
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file) // 把所有的ts文件都放在一起 发射成.d.ts文件
        sourceFiles.push(sourceFile)
      }
    })
  )
  await project.emit({
    // 默认是放到内存中的
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput()
    const tasks = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      const filepath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(filepath), {
        recursive: true
      })
      // @z-plus -> z-plus/es -> .d.ts 肯定不用去lib下查找
      await fs.writeFile(filepath, pathRewriter('es')(outputFile.getText()))
    })
    await Promise.all(tasks)
  })

  await Promise.all(tasks)
}
/**
 * @Author: wyb
 * @Descripttion: 复制类型文件到对应的文件夹中
 * @param {*}
 */
function copyTypes() {
  const src = path.resolve(outDir, 'types/components/')
  const copy = module => {
    let output = path.resolve(outDir, module, 'components')
    return () => run(`cp -r ${src}/* ${output}`)
  }
  return parallel(copy('es'), copy('lib'))
}
/**
 * @Author: wyb
 * @Descripttion: 由于引入组件的时候直接是 componnet 并没有引入 component/index.ts 所以需要单独将index.ts转成index.js放到components下
 * @param {*}
 */
async function buildComponentEntry() {
  const config = {
    input: path.resolve(componentRoot, 'index.ts'),
    plugins: [typescript()],
    external: () => true
  }
  const bundle = await rollup(config)
  return Promise.all(
    Object.values(buildConfig)
      .map(config => ({
        format: config.format,
        file: path.resolve(config.output.path, 'components/index.js')
      }))
      .map(config => bundle.write(config as OutputOptions))
  )
}

// 这是一个任务
export const buildComponent = series(
  buildEachComponent,
  genTypes,
  copyTypes(),
  buildComponentEntry
)

// pnpm install fast-glob -D -w
