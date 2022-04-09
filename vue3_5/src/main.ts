import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/base.scss'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
