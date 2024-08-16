import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
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
    return { token, userInfo, changeUserInfo, clearUserInfo }
  },
  { persist: true }
)
