import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin // 类型必须导出 都在无法生存 .d.ts 文件

export function withInstall<T>(component: T) {
  ;(component as SFCWithInstall<T>).install = function (app: App) {
    app.component((component as any).name, component)
  }
  return component as SFCWithInstall<T>
}
