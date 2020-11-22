import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () =>
      import(/*  webpackChunkName: "mine" */ '@/views/mine/index.vue')
  },
  {
    path: '/prifile',
    name: 'Prifile',
    component: () =>
      import(/*  webpackChunkName: "prifile" */ '@/views/prifile/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
