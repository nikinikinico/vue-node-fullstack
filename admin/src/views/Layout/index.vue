<template>
  <el-container>
    <Side :collapse="collapse" />
    <el-container direction="vertical">
      <Header @handle-collapsed="collapse = !collapse"></Header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from './components/TopHeader.vue'
import Side from './components/SideMenu.vue'
import { ref } from 'vue'
const collapse = ref(false)
</script>

<style scoped lang="scss">
.el-main {
  overflow: auto;
  height: calc(100v - 60px);
}
</style>
