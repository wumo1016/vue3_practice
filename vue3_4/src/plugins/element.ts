import type { App, Component } from 'vue'
import {
  ElButton,
  ElMessage,
  ElNotification,
  ElMessageBox,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElScrollbar,
  ElDrawer,
  ElColorPicker,
  ElSwitch,
  ElForm,
  ElFormItem,
  ElInput,
  ElCard,
  ElTree,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElSelect,
  ElOption,
  ElUpload,
  ElCalendar,
  ElConfigProvider,
  ElIcon
} from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'dayjs/locale/zh-cn' // 默认直接使用了 Day.js 项目的时间日期国际化设置, 并且会自动全局设置已经导入的 Day.js 国际化配置。

import { Plus } from '@element-plus/icons-vue'

export default (app: App): void => {
  // 按需导入组件列表
  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElRow,
    ElCol,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTooltip,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElScrollbar,
    ElDrawer,
    ElColorPicker,
    ElSwitch,
    ElForm,
    ElFormItem,
    ElInput,
    ElCard,
    ElTree,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDialog,
    ElSelect,
    ElOption,
    ElUpload,
    ElCalendar,
    ElConfigProvider,
    ElIcon,
    Plus
  ]

  components.forEach(component => {
    app.component(component.name, component as Component)
  })

  // 文档说明 https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}
