import { createApp } from 'vue'

import App from './app.vue'

createApp(App).mount('#app')

function test() {
  console.log(123)
}

console.log(test())
