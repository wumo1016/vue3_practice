import { spawn } from 'child_process'
import { projectRoot } from './paths'

export const withTaskName = <T>(name: string, fn: T) =>
  Object.assign(fn, {
    displayName: name
  })
// 在node中使用子进程来运行脚本
export const run = async (command: string) =>
  new Promise(r => {
    // cmd-命令 args-参数
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd: projectRoot, // 运行目录
      stdio: 'inherit', // 直接将子进程的输出共享给父进程
      shell: true
    })
    app.on('close', r)
  })
