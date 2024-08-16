<template>
  <el-header>
    <div class="left">
      <el-icon @click="emits('handleCollapsed')">
        <Menu></Menu>
      </el-icon>
      <span style="margin-left: 10px">XXXX管理系统</span>
    </div>
    <div class="right">
      <span>欢迎{{ store.userInfo?.username }}回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="30" color="white">
            <User />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { Menu, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
const store = useUserStore()
const router = useRouter()
const handleCenter = () => {
  router.push('/center')
}
const handleLogut = () => {
  localStorage.removeItem('token')
  store.clearUserInfo()
  router.push('/login')
}
const emits = defineEmits<{
  (e: 'handleCollapsed'): void
}>()
</script>
<style scoped lang="scss">
.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,
.right {
  display: flex;
  align-items: center;
}
.left {
  i {
    margin: auto;
    cursor: pointer;
  }
}
.right {
  .el-dropdown {
    margin: auto;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
