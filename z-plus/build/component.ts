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
import { pathRewriter } from './utils'
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
}

async function genTypes() {
  // 生成.d.ts文件 我们需要有一个tsconfig
  const project = new Project({
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
      strict: true
    },
    tsConfigFilePath: path.resolve(projectRoot, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  })

  // **/* 查找任意目录下的任意文件
  const filePaths = await glob('**/*', {
    cwd: componentRoot,
    onlyFiles: true,
    absolute: true
  })

  const sourceFiles: any[] = []
  await Promise.all(
    filePaths.map(async file => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf8')
        const sfc = VueCompiler.parse(content)
        const { script } = sfc.descriptor
        if (script) {
          const content = script.content
          sourceFiles.push(project.createSourceFile(file + '.ts', content))
        }
      } else if (file.endsWith('.ts')) {
        sourceFiles.push(project.addSourceFileAtPath(file)) // 所有的ts文件放在一起 发射成.d.ts文件
      }
    })
  )

  // 默认是放到内存中 需要手动生成
  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async sourceFile => {
    const emitOutput = sourceFile.getEmitOutput()
    // console.log(emitOutput, 11111111111111111111);
    const tasks = emitOutput.getOutputFiles().map(async outputFile => {
      const filePath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(filePath), {
        recursive: true
      })
      await fs.writeFile(filePath, pathRewriter('es')(outputFile.getText()))
    })
    await Promise.all(tasks)
  })

  await Promise.all(tasks)
}

// 这是一个任务
export const buildComponent = series(buildEachComponent, genTypes)

// pnpm install fast-glob -D -w
