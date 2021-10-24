// 串行和并行
import { series } from 'gulp'
import { run, withTaskName } from './utils'

export default series(
  withTaskName('clean', () => run('rm -rf ./dist')),
  withTaskName(
    'buildPackages',
    () => run('pnpm run --filter ./packages --parallel build') // 会找到所有目标文件夹下的build命令执行
  ),
  withTaskName(
    'buildFullComponent',
    () => run('pnpm run build buildFullComponent') // 执行命令时会调用rollup 我们给rollup传递参数buildFullComponent(这是一个任务名) 它就会执行
  )
)

export * from './full-componnet'
