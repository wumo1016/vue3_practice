// 串行和并行
import { series, parallel } from 'gulp'
import { run, withTaskName } from './utils'

export default series(
  withTaskName('clean', () => run('rm -rf dist')),
  withTaskName('buildPackages', () =>
    run('pnpm run --filter ./packages --parallel build')
  )
)
