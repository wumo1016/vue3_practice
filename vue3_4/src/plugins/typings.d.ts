import type { ElMessageBox, ElMessage, ElNotification } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage
    $notify: typeof ElNotification
    $confirm: typeof ElMessageBox.confirm
    $alert: typeof ElMessageBox.alert
    $prompt: typeof ElMessageBox.prompt
  }
}
