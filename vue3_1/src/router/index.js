import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/plan',
    component: () => import('@/views/plan/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
