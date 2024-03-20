import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import deskRouter from './desktop'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  ...(deskRouter as Array<RouteRecordRaw>)
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
