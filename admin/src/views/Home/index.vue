<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统" content="首页">
    </el-page-header>

    <el-card style="max-width: 100%">
      <el-row>
        <el-col :span="6">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col :span="4.5"> 个人简介： </el-col>
            <el-col :span="19.5"> {{ store.userInfo?.introduction }} </el-col>
          </el-row>
          <h2 style="line-height: 100px">{{ welcomeText }}</h2>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="max-width: 100%">
      <template #header>
        <div class="card_header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel
        v-if="loopList.length"
        :interval="4000"
        type="card"
        height="200px"
      >
        <el-carousel-item v-for="item in loopList" :key="item.id">
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { computed, ref } from 'vue'
import avater from '@/assets/images/avater.png'
type loop = {
  id: string
  url: string
}
const store = useUserStore()
const welcomeText = computed(() => {
  const message =
    new Date().getHours() < 12
      ? '今天也要努力工作,要开心每一天~'
      : '您可能累了，喝杯咖啡提提神吧~'
  return message
})
const avatarUrl = computed(() => {
  return import.meta.env.VITE_STATICURL + store.userInfo?.avatar || avater
})

const loopList = ref<Array<loop>>([])
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
}

// 添加这部分来修改产品卡片头部的样式
.card-header {
  // 修改字体颜色
  color: #333;
  // 添加字体大小
  font-size: 16px;
}

:deep(.el-card__header) {
  // 修改<template #header>样式
  padding: 16px; // 调整内边距
  line-height: 0.6; // 行高
}

// 轮播图样式
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
