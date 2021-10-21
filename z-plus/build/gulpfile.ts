// 串行和并行
import { series, parallel } from 'gulp'
import { run, withTaskName } from './utils'

export default series(withTaskName('clean', async () => run('rm -rf dist')))
