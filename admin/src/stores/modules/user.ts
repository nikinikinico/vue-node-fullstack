import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
import { getCurrentUser } from '@/api/user'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref()
    // 用户信息
    const userInfo = ref<UserInfo>()
    const changeUserInfo = (info: UserInfo) => {
      userInfo.value = { ...userInfo.value, ...info }
    }
    const clearUserInfo = () => {
      userInfo.value = { _id: '', username: '', role: 2 }
    }
    const getUserInfo = async () => {
      const res = await getCurrentUser()
      if (res.data) {
        changeUserInfo(res.data)
      }
    }
    return { token, userInfo, changeUserInfo, clearUserInfo, getUserInfo }
  },
  {
    persist: {
      paths: ['token']
    }
  }
)
