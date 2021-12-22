/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const globalObj: {
  [key: string]: any
}
