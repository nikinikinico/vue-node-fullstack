<template>
  <el-page-header icon="" title="新闻管理" content="添加新闻"> </el-page-header>
  <el-form
    ref="newsFormRef"
    :model="newsForm"
    :rules="newsFormRules"
    label-width="auto"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="newsForm.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <Edit v-model="newsForm.content" />
    </el-form-item>
    <el-form-item label="类别" prop="category">
      <el-select v-model="newsForm.category">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <Upload
        :uploadAvatar="newsForm.cover"
        @handle-change="changeCover"
      ></Upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm"
        >添加新闻</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script setup lang="ts">
import { NewsType } from '@/enums'
import type { News } from '@/types/news'
import {
  ElMessage,
  type FormInstance,
  type FormRules,
  type UploadFile
} from 'element-plus'
import { reactive, ref } from 'vue'
import Edit from '@/components/Editor/index.vue'
import Upload from '@/components/UploadAvatar/index.vue'
import { useRouter } from 'vue-router'
import { newsAdd } from '@/api/news'
const newsFormRef = ref<FormInstance>()
const newsForm = ref<News>({
  title: '',
  content: '',
  category: 1,
  cover: '',
  file: null,
  isPublish: 0
})
const newsFormRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传图片', trigger: 'blur' }]
})
const options = [
  { label: '最新动态', value: NewsType.Latest },
  { label: '通知公告', value: NewsType.Notify },
  { label: '典型案例', value: NewsType.Typical }
]
const changeCover = (uploadFile: UploadFile) => {
  if (uploadFile.raw) {
    newsForm.value.cover = URL.createObjectURL(uploadFile.raw)
    newsForm.value.file = uploadFile.raw
  }
}
const router = useRouter()
const submitForm = async () => {
  await newsFormRef.value?.validate()
  await newsAdd(newsForm.value)
  ElMessage.success('添加成功')
  router.push('/news-manage/newslist')

  console.log(newsForm.value)
}
</script>

<style scoped lang="scss">
.demo-ruleForm {
  margin-top: 50px;
}
</style>
