import { App } from 'vue'
import Icon from '@wm-ui/icon'
import Button from '@wm-ui/button'
import ButtonGroup from '@wm-ui/button-group'
import Row from '@wm-ui/row'
import Col from '@wm-ui/col'
import Checkbox from '@wm-ui/checkbox'
import CheckboxGroup from '@wm-ui/checkbox-group'
import Transfer from '@wm-ui/transfer'
import Message from '@wm-ui/message'

const components = {
  Icon,
  Button,
  ButtonGroup,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  Transfer,
  Message
}

const install = (app: App): void => {
  Object.keys(components).forEach(key => {
    const component = components[key]
    app.use(component)
  })
}

export default {
  install,
  ...components,
}

// 打包esm
// yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-vue -D