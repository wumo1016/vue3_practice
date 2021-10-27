// 串行和并行
import { parallel, series } from 'gulp'
import { run, withTaskName } from './utils'
import { genTypes } from './gen-types'
import { outDir, zpRoot } from './utils/paths'

const copySourceCode = () => async () => {
  await run(`cp ${zpRoot}/package.json ${outDir}/package.json`)
}

export default series(
  withTaskName('clean', () => run('rm -rf ./dist')),
  parallel(
    withTaskName(
      'buildPackages',
      () => run('pnpm run --filter ./packages --parallel build') // 会找到所有目标文件夹下的build命令执行
    ),
    withTaskName(
      'buildFullComponent',
      () => run('pnpm run build buildFullComponent') // 直接执行任务 buildFullComponent 执行命令时会调用rollup 我们给rollup传递参数buildFullComponent(这是一个任务名) 它就会执行
    ),
    withTaskName('buildComponent', () => run('pnpm run build buildComponent'))
  ),
  parallel(genTypes, copySourceCode())
)

export * from './full-component'
export * from './component'
