// 专门打包util 指令 hook的配置文件
import { series, parallel, src, dest } from 'gulp'
import { buildConfig } from './utils/config'
import { outDir, projectRoot } from './utils/paths'
import ts from 'gulp-typescript'
import path from 'path'
import { withTaskName } from './utils'
const resolve = paths => path.resolve(__dirname, paths)

export function buildPackages(dirname: string, name: string) {
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)
    return series(
      withTaskName(`build: ${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json')
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules'] // 打包所有ts文件 但是排除后面的文件
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true, // 打包需要生成配置文件
              strict: false,
              module: config.module
            })()
          )
          .pipe(dest(output))
      }),
      withTaskName(`copy: ${dirname}`, () => {
        return src(`${output}/**`).pipe(
          dest(path.resolve(outDir, config.output.name, name))
        )
      })
    )
  })

  return parallel(...tasks)
}
