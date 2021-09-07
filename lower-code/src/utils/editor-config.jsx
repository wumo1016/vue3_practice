import { ElButton, ElInput } from 'element-plus'
import Range from '../components/range'

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

const createInputProp = label => ({
  type: 'input',
  label
})

const createColorProp = label => ({
  type: 'color',
  label
})

const createSelectProp = (label, options) => ({
  type: 'select',
  label,
  options
})

registerConfig.register({
  key: 'text',
  label: '文本',
  preview() {
    return '预览文本'
  },
  render({ props }) {
    return (
      <span style={{ color: props.color, fontSize: props.size }}>
        {props.text || '渲染文本'}
      </span>
    )
  },
  props: {
    text: createInputProp('输入文本内容'),
    color: createColorProp('字体颜色'),
    size: createSelectProp('字体大小', [
      {
        label: '14px',
        value: '14px'
      },
      {
        label: '20px',
        value: '20px'
      },
      {
        label: '24px',
        value: '24px'
      }
    ])
  }
})

registerConfig.register({
  key: 'button',
  label: '按钮',
  preview() {
    return <ElButton>预览按钮</ElButton>
  },
  render({ props }) {
    return (
      <ElButton type={props.type} type={props.size}>
        {props.text || '渲染按钮'}
      </ElButton>
    )
  },
  props: {
    text: createInputProp('按钮内容'),
    type: createSelectProp('按钮类型', [
      {
        label: '基础按钮',
        value: 'primary'
      },
      {
        label: '成功按钮',
        value: 'success'
      },
      {
        label: '警告按钮',
        value: 'warning'
      },
      {
        label: '危险按钮',
        value: 'danger'
      },
      {
        label: '文本按钮',
        value: 'text'
      }
    ]),
    size: createSelectProp('按钮尺寸', [
      {
        label: '默认',
        value: ''
      },
      {
        label: '中等',
        value: 'medium'
      },
      {
        label: '小',
        value: 'small'
      },
      {
        label: '极小',
        value: 'mini'
      }
    ])
  }
})

registerConfig.register({
  key: 'input',
  label: '输入框',
  preview() {
    return <ElInput placeholder="预览输入框"></ElInput>
  },
  render({ model }) {
    return <ElInput placeholder="渲染输入框" {...model.default}></ElInput>
  },
  model: {
    default: '绑定字段'
  }
})

registerConfig.register({
  key: 'range',
  label: '范围选择器',
  preview() {
    return <Range placeholder="预览输入框"></Range>
  },
  render({ model }) {
    return (
      <Range
        {...{
          start: model.start.modelValue,
          'onUpdate:start': model.start['onUpdate:modelValue'],
          end: model.end.modelValue,
          'onUpdate:end': model.end['onUpdate:modelValue']
        }}
      ></Range>
    )
  },
  model: {
    start: '开始字段',
    end: '结束字段'
  }
})
