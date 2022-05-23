import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'

import store from '@/store'
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
      },
      {
        path: '/cart',
        component: () => import('@/views/cart')
      },
      {
        path: '/member/checkout',
        component: () => import('@/views/member/pay/checkout.vue')
      },
      {
        path: '/member/pay',
        component: () => import('@/views/member/pay/index.vue')
      },
      {
        path: '/pay/callback',
        component: () => import('@/views/member/pay/callback.vue')
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

// 配置路由导航守卫，拦截 /member开头的所有的地址
router.beforeEach((to, from, next) => {
  // 判断用户登没登录
  const token = store.state.user.proFile.token
  if (token) {
    next()
  } else {
    if (to.path.includes('/member')) {
      // 需要登录才能访问
      localStorage.setItem('redirectUrl', to.fullPath)
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath
        }
      })
    } else {
      next()
    }
  }
})

export default router
