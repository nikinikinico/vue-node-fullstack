//动态添加的路由组件
import { type RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/center',
    component: () => import('@/views/Center/index.vue')
  },
  {
    path: '/user-manage/adduser',
    component: () => import('@/views/UserManage/UserAdd.vue')
  },
  {
    path: '/user-manage/userlist',
    component: () => import('@/views/UserManage/UserList.vue')
  },
  {
    path: '/news-manage/addnews',
    component: () => import('@/views/NewsManage/NewsAdd.vue')
  },
  {
    path: '/news-manage/newslist',
    component: () => import('@/views/NewsManage/NewsList.vue')
  },
  {
    path: '/product-manage/addproduct',
    component: () => import('@/views/ProductManage/ProductAdd.vue')
  },
  {
    path: '/product-manage/productlist',
    component: () => import('@/views/ProductManage/ProductList.vue')
  },
  {
    path: '/',
    redirect: '/index'
  }
]
export default routes
