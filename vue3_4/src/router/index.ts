import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Dashboard',
    component: () => import('@v/dashboard/index.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@v/test/index.vue')
  },
  {
    path: '/line-tree',
    name: 'LineTree',
    component: () => import('@v/line-tree/test.vue')
  }
]

export const routes: Array<RouteRecordRaw> = [...constantRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
