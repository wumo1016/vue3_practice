import type { App, Component } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const components: {
  [key: string]: Component
} = {
  SvgIcon
}

export default (app: App) => {
  Object.keys(components).map(key => {
    app.component(key, components[key])
  })
}
