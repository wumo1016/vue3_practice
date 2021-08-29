import { ElButton, ElInput } from 'element-plus'

function createEditorConfig() {
  const componentList = []
  const componentMap = {}

  return {
    componentList,
    componentMap,
    register(component) {
      this.componentList.push(component)
      this.componentMap[component.key] = component
    }
  }
}

export const registerConfig = createEditorConfig()

registerConfig.register({
  key: 'text',
  label: '文本',
  preview() {
    return '预览文本'
  },
  render() {
    return '渲染文本'
  }
})

registerConfig.register({
  key: 'button',
  label: '按钮',
  preview() {
    return <ElButton>预览按钮</ElButton>
  },
  render() {
    return <ElButton type="primary">渲染按钮</ElButton>
  }
})

registerConfig.register({
  key: 'input',
  label: '输入框',
  preview() {
    return <ElInput placeholder="预览输入框"></ElInput>
  },
  render() {
    return <ElInput placeholder="渲染输入框"></ElInput>
  }
})
