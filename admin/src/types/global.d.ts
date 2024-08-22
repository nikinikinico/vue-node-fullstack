declare module '@tsparticles/vue3'
import 'vue-router'
interface ImportMetaEnv {
  VITE_BASEURL: string
  VITE_STATICURL: string
}
declare module 'vue-router' {
  interface RouteMeta {
    roles?: number[] // 这里定义 roles 属性为可选的字符串数组
    requiresAuth: boolean
  }
}
