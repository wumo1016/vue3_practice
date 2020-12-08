import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test',
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
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/*  webpackChunkName: "profile" */ '@/views/profile/index.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () =>
      import(/*  webpackChunkName: "profile" */ '@/views/practice/reactive.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
