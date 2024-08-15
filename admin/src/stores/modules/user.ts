import { ref } from 'vue'
import { defineStore } from 'pinia'
export const userUserStore = defineStore(
  'user',
  () => {
    const token = ref()

    return { token }
  },
  { persist: true }
)
