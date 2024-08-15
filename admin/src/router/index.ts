import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import routesDynamic from './route'
import { type RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: () => import('@/views/NotFound/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
routesDynamic.forEach((item) => {
  router.addRoute('layout', item)
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    //如果授权已经登录则next,否则重新定向到login
    if (!localStorage.getItem('token')) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
