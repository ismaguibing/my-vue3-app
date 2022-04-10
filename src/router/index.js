import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/views/Layout'

const routes = [
  { path: '/', component: Layout },
  { path: '/login', component: () => import('@/views/Login/index.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
