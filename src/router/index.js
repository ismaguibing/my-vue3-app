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
      },
      {
        path: '/product/:id',
        component: () => import('@/views/goods')
      }

    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/login/callback',
    component: () => import('@/views/Login/callback.vue')
  },
  {
    path: '/test',
    component: () => import('@/views/Test/index.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior () {
    return {
      top: 0,
      left: 0
    }
  },
  routes
})

export default router
