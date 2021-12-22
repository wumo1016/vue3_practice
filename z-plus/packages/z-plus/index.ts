import { ZIcon } from '@z-plus/components'
import type { App } from 'vue'

const componnets = [ZIcon]

const install = (app: App) => {
  componnets.forEach(comp => {
    app.use(comp)
  })
}

export default {
  install
}

export * from '@z-plus/components'
