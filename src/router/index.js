import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/views/Layout'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Home')
      },
      {
        path: '/category/:id',
        component: () => import('../views/Category/index.vue')
      },
      {
        path: '/category/sub/:id',
        component: () => import('../views/Category/sub.vue')
      }

    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/test',
    component: () => import('@/views/Test/index.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
