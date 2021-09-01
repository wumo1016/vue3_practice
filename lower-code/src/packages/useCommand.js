import { onUnmounted, readonly } from 'vue'
import deepcopy from '_deepcopy@2.1.0@deepcopy'
import events from './events'

export default data => {
  const state = {
    cur: -1, // 前进后退的索引值
    queue: [], // 存放自己的擦欧总命令
    commands: {}, // 制作命令和执行功能的映射表
    commanArray: [], // 存放所有的命令
    detoryArray: []
  }

  const register = command => {
    state.commanArray.push(command)
    state.commands[command.name] = () => {
      const { redo, undo } = command.execute()
      redo()
      if (!command.pushQueue) return
      const { cur, queue } = state

      // 组件1 => 组件2 => 组件3 => 撤回2次 => 组件4
      // 组件1 => 组件4
      if (queue.length > 0) {
        queue.slice(0, cur + 1)
      }

      state.queue.push({ redo, undo }) // 保存前进与后退
      state.cur++
    }
  }

  register({
    name: 'redo',
    keybord: 'ctrl+y',
    execute() {
      return {
        redo() {
          console.log('重做')
        }
      }
    }
  })

  register({
    name: 'undo',
    keyboard: 'ctrl+z',
    execute() {
      return {
        redo() {
          console.log('撤销')
        }
      }
    }
  })

  register({
    name: 'drag',
    pushQueue: true,
    // 默认执行
    init() {
      this.before = null
      // 监控拖拽开始事件 保存状态
      const start = () => {
        this.before = deepcopy(data.value.blocks)
      }
      // 拖拽之后
      const end = () => {
        state.commands.drag()
      }
      events.on('start', start)
      events.on('end', end)
      return () => {
        events.off('start', start)
        events.off('end', end)
      }
    },
    execute() {
      let before = this.before // 之前的状态
      let after = data.value.blocks // 之后的状态
      return {
        redo() {
          data.value = { ...data.value, blocks: after }
          console.log(12345)
        },
        undo() {
          data.value = { ...data.value, blocks: before }
        }
      }
    }
  })
  // ;(() => {
  //   state.commanArray.forEach(
  //     command => command.init && state.detoryArray.push(command.init())
  //   )
  // })()
  state.commanArray.forEach(
    command => command.init && state.detoryArray.push(command.init())
  )

  onUnmounted(() => {
    state.detoryArray.forEach(fn => fn && fn())
  })
  return state
}
