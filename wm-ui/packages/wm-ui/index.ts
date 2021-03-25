import { App } from 'vue'
import Icon from '@wm-ui/icon'
import Button from '@wm-ui/button'
import ButtonGroup from '@wm-ui/button-group'
import Row from '@wm-ui/row'
import Col from '@wm-ui/col'
import Checkbox from '@wm-ui/checkbox'
import CheckboxGroup from '@wm-ui/checkbox-group'
import WmTransfer from '@wm-ui/transfer'

const components = [
  Icon,
  Button,
  ButtonGroup,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  WmTransfer,
]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}

// 打包esm
// yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-vue -D