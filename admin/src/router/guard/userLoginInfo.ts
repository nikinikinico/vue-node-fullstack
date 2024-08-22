import { useUserStore } from '@/stores'
import type { Router } from 'vue-router'
export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (to.name === 'login') {
      next()
    } else {
      if (userStore.userInfo?._id) {
        next()
      } else {
        try {
          await userStore.getUserInfo()
          next()
        } catch (error) {
          userStore.clearUserInfo()
          next({
            name: 'login'
          })
        }
      }
    }
  })
}
