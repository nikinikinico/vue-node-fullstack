import { useUserStore } from '@/stores'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router
} from 'vue-router'
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const userStore = useUserStore()
      if (
        !to.meta.requiresAuth ||
        (to.meta.roles &&
          userStore.userInfo &&
          to.meta.roles.includes(userStore.userInfo.role))
      ) {
        next()
      } else {
        next('/not-found')
      }
    }
  )
}
