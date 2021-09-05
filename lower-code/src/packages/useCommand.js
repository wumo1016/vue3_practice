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
    // 拖拽完成执行的命令
    state.commands[command.name] = (...args) => {
      const { redo, undo } = command.execute(...args)
      redo()
      if (!command.pushQueue) return
      let { cur, queue } = state

      // 组件1 => 组件2 => 组件3 => 撤回2次 => 组件4
      // 组件1 => 组件4
      // 再次添加前 如果有撤销动作 将撤销的添加动作删除
      if (queue.length > 0) {
        state.queue = queue.slice(0, cur + 1)
      }

      state.queue.push({ redo, undo }) // 保存前进与后退
      state.cur++
    }
  }
  // 注册重做函数
  register({
    name: 'redo',
    keybord: 'ctrl+y',
    execute() {
      return {
        redo() {
          let item = state.queue[state.cur + 1]
          if (item) {
            item.redo && item.redo()
            state.cur++
          }
        }
      }
    }
  })
  // 注册撤销函数
  register({
    name: 'undo',
    keyboard: 'ctrl+z',
    execute() {
      return {
        redo() {
          if (state.cur === -1) return
          let item = state.queue[state.cur]
          if (item) {
            item.undo && item.undo()
            state.cur--
          }
        }
      }
    }
  })
  // 注册拖拽函数
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
        },
        undo() {
          data.value = { ...data.value, blocks: before }
        }
      }
    }
  })
  // 注册直接更新data函数
  register({
    name: 'updateData',
    pushQueue: true,
    execute(newData) {
      let before = data.value
      let after = newData
      return {
        redo() {
          data.value = after
        },
        undo() {
          data.value = before
        }
      }
    }
  })
  // 注册置顶 找到所有未选中block中最大的再加1
  register({
    name: 'placeTop',
    pushQueue: true,
    execute(focusData) {
      let before = deepcopy(data.value.blocks)
      let after = () => {
        let { focus, unFocus } = focusData.value
        let maxIndex = unFocus.reduce(
          (max, block) => Math.max(block.zIndex, max),
          -Infinity
        )
        focus.forEach(block => {
          block.zIndex = maxIndex + 1
        })
        return data.value.blocks
      }
      return {
        redo() {
          data.value = { ...data.value, blocks: after() }
        },
        undo() {
          data.value = { ...data.value, blocks: before }
        }
      }
    }
  })
  // 注册置底 找到所有未选中block中最大的再加1
  register({
    name: 'placeBottom',
    pushQueue: true,
    execute(focusData) {
      let before = deepcopy(data.value.blocks)
      let after = () => {
        let { focus, unFocus } = focusData.value
        let minIndex = unFocus.reduce(
          (min, block) => Math.min(block.zIndex, min),
          Infinity
        )
        // minIndex不能出现负值 如果都是0 就让其他的没选中的+1
        if (minIndex < 1) {
          minIndex = 1
          unFocus.forEach(block => {
            block.zIndex += 1
          })
        }
        focus.forEach(block => {
          block.zIndex = minIndex - 1
        })
        return data.value.blocks
      }
      return {
        redo() {
          data.value = { ...data.value, blocks: after() }
        },
        undo() {
          data.value = { ...data.value, blocks: before }
        }
      }
    }
  })
  // 注册删除
  register({
    name: 'delete',
    pushQueue: true,
    execute(focusData) {
      let before = deepcopy(data.value.blocks)
      let after = focusData.value.unFocus
      return {
        redo() {
          data.value = { ...data.value, blocks: after }
        },
        undo() {
          data.value = { ...data.value, blocks: before }
        }
      }
    }
  })
  // 注册更新某一个节点数据
  register({
    name: 'updateBlock',
    pushQueue: true,
    execute(newBlock, oldBlock) {
      let before = data.value.blocks
      let after = () => {
        const blocks = [...data.value.blocks]
        const index = blocks.indexOf(oldBlock)
        blocks.splice(index, 1, newBlock)
        return blocks
      }
      return {
        redo() {
          data.value = { ...data.value, blocks: after() }
        },
        undo() {
          data.value = { ...data.value, blocks: before }
        }
      }
    }
  })

  state.commanArray.forEach(
    command => command.init && state.detoryArray.push(command.init())
  )

  // 注册键盘事件
  const keyBoard = () => {
    const keyCodes = {
      90: 'z',
      89: 'y'
    }
    const onKeydown = e => {
      const { ctrlKey, keyCode } = e
      const codeString = keyCodes[keyCode]
      let keySring = ''
      if (ctrlKey && codeString) {
        keySring = `ctrl+${codeString}`
        state.commanArray.forEach(({ keyboard, name }) => {
          if (keyboard && keyboard === keySring) {
            state.commands[name]()
            e.preventDefault()
          }
        })
      }
    }
    document.addEventListener('keydown', onKeydown)
    // 返回销毁事件
    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }

  state.detoryArray.push(keyBoard())
  onUnmounted(() => {
    state.detoryArray.forEach(fn => fn && fn())
  })
  return state
}
