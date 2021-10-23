// 串行和并行
import { series } from 'gulp'
import { run, withTaskName } from './utils'

export default series(
  withTaskName('clean', () => run('rm -rf ./dist')),
  withTaskName(
    'buildPackages',
    () => run('pnpm run --filter ./packages --parallel build') // 会找到所有目标文件夹下的build命令执行
  )
)
