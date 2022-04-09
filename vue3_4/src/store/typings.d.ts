import { DefineStoreOptions } from 'pinia'
import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

declare module 'pinia' {
  interface DefineStoreOptions {
    persist?: boolean | PersistedStateOptions
  }
}
