//动态添加的路由组件
import { type RouteRecordRaw } from 'vue-router'
import { Role } from '@/enums/index'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      requiresAuth: true,
      roles: [Role.Admin, Role.Edit]
    }
  },
  {
    path: '/center',
    component: () => import('@/views/Center/index.vue'),
    meta: { requiresAuth: true, roles: [Role.Admin, Role.Edit] }
  },
  {
    path: '/user-manage/adduser',
    component: () => import('@/views/UserManage/UserAdd.vue'),
    meta: { requiresAuth: true, roles: [Role.Admin] }
  },
  {
    path: '/user-manage/userlist',
    component: () => import('@/views/UserManage/UserList.vue'),
    meta: { requiresAuth: true, roles: [Role.Admin] }
  },
  {
    path: '/news-manage/addnews',
    component: () => import('@/views/NewsManage/NewsAdd.vue'),
    meta: { requiresAuth: true, roles: [Role.Admin, Role.Edit] }
  },
  {
    path: '/news-manage/newslist',
    component: () => import('@/views/NewsManage/NewsList.vue'),
    meta: { requiresAuth: true, roles: [Role.Admin, Role.Edit] }
  },
  {
    path: '/product-manage/addproduct',
    component: () => import('@/views/ProductManage/ProductAdd.vue'),
    meta: { requiresAuth: true, roles: [Role.Admin, Role.Edit] }
  },
  {
    path: '/product-manage/productlist',
    component: () => import('@/views/ProductManage/ProductList.vue'),
    meta: { requiresAuth: true, roles: [Role.Admin, Role.Edit] }
  },
  {
    path: '/',
    redirect: '/index',
    meta: { requiresAuth: true, roles: [Role.Admin, Role.Edit] }
  }
]
export default routes
