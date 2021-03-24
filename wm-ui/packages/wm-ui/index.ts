import { App } from 'vue'
import Button from '@wm-ui/button'
import ButtonGroup from '@wm-ui/button-group'
import Row from '@wm-ui/row'
import Col from '@wm-ui/col'
import Icon from '@wm-ui/icon'

const components = [
  Button,
  ButtonGroup,
  Row,
  Col,
  Icon,
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