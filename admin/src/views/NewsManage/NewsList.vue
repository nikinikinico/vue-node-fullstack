<template>
  <el-page-header icon="" title="新闻管理" content="新闻列表"></el-page-header>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category" label="分类">
        <template #default="{ row }">
          {{ categoryFormat(row.category) }}
        </template>
      </el-table-column>
      <el-table-column prop="editTime" label="更新时间">
        <template #default="{ row }">
          {{ formatTime(row.editTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="isPublish" label="是否发布">
        <template #default="{ row }">
          <el-switch
            v-model="row.isPublish"
            :active-value="1"
            :inactive-value="0"
            :before-change="() => handleSwitchChange(row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-button circle :icon="Star" type="success"></el-button>
          <el-button circle :icon="Edit"></el-button>
          <el-button circle :icon="Delete" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { newsList, newsPublish } from '@/api/news'
import type { News } from '@/types/news'
import { formatTime } from '@/util/index'
import { Star, Edit, Delete } from '@element-plus/icons-vue'
const tableData = ref<Array<News>>([])
const getTableList = async () => {
  const res = await newsList()
  tableData.value = res.data
}
getTableList()

const categoryFormat = (v: number) => {
  const arr = ['最新动态', '典型案例', '通知公告']
  return arr[v - 1]
}
const handleSwitchChange = async (row: News) => {
  try {
    const res = await newsPublish({
      ...row,
      isPublish: Math.abs(row.isPublish - 1) as 0 | 1
    })
    row.editTime = res.data.editTime
    return true
  } catch (error) {
    return false
  }
}
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 30px;
}
</style>
