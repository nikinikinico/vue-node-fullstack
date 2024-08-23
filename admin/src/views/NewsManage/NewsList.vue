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
        <template #default="{ row }">
          <el-button
            circle
            :icon="Star"
            @click="handlePreview(row)"
            type="success"
          ></el-button>
          <el-button circle :icon="Edit"></el-button>
          <el-popconfirm
            title="你确定要删除吗?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button circle :icon="Delete" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog v-model="dialogVisible" title="预览新闻" width="500">
    <div>
      <h2>{{ previewData.title }}</h2>
      <div>{{ formatTime(previewData.editTime) }}</div>
      <el-divider></el-divider>
      <div v-html="previewData.content"></div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { newsList, newsPublish, deleteNews } from '@/api/news'
import type { News } from '@/types/news'
import { formatTime } from '@/util/index'
import { Star, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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
const previewData = ref({})
const dialogVisible = ref(false)
const handlePreview = (row) => {
  previewData.value = row
  dialogVisible.value = true
}
const handleDelete = async (row) => {
  await deleteNews(row._id)
  ElMessage.success('删除成功')
  getTableList()
}
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 30px;
}
</style>
