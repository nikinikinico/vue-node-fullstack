import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import routesDynamic from './route'
import { type RouteRecordRaw } from 'vue-router'
import createRouteGuard from './guard/index'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/not-found',
        component: () => import('@/views/NotFound/index.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      requiresAuth: false
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
//动态添加所有路由
routesDynamic.forEach((item) => {
  router.addRoute('layout', item)
})
//路由守卫
createRouteGuard(router)

export default router
