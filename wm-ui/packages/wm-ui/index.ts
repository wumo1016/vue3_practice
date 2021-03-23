import { App } from 'vue'
import Button from '@wm-ui/button'
import Icon from '@wm-ui/icon'

const components = [
  Button,
  Icon
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