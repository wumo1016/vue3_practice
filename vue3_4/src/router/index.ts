import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/fmea',
      name: 'Fmea',
      component: () => import('@/views/fmea-tree/index.vue')
    }
  ]
})

export default router
