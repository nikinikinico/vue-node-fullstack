<template>
  <div>
    <el-page-header icon="" title="企业门户管理系统" content="个人中心">
    </el-page-header>
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.userInfo?.username }}</h3>
          <h3>{{ store.userInfo?.role === 1 ? '管理员' : '编辑' }}</h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            style="max-width: 600px"
            :model="userForm"
            :rules="userFromRules"
            label-width="auto"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-select placeholder="Select" v-model="userForm.gender">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="个人简介" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <UploadAvatar
                :uploadAvatar="uploadAvatar"
                @handleChange="handleChange"
              ></UploadAvatar>
            </el-form-item>

            <el-form-item>
              <el-col :span="3"></el-col>
              <el-button :span="19" type="primary" @click="submitForm()">
                更新信息
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import avater from '@/assets/images/avater.png'
import {
  ElMessage,
  type FormInstance,
  type FormRules,
  type UploadFile
} from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { Gender } from '@/enums/index'
import { type UserForm } from '@/types/user'
import UploadAvatar from '@/components/UploadAvatar/index.vue'
import { userUpload } from '@/api/user'
const store = useUserStore()
const avatarUrl = computed(() => {
  return import.meta.env.VITE_STATICURL + store.userInfo?.avatar || avater
})
const userFormRef = ref<FormInstance>()
const userForm = ref<UserForm>({
  username: store.userInfo?.username,
  gender: store.userInfo?.gender,
  introduction: store.userInfo?.introduction,
  avatar: store.userInfo?.avatar,
  file: null
})
const userFromRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  introduction: [{ required: true, message: '个人介绍', trigger: 'blur' }],
  avatar: [{ required: true, message: '上传头像', trigger: 'blur' }]
})
const options = [
  {
    label: '保密',
    value: Gender.Unknown
  },
  {
    label: '男',
    value: Gender.Male
  },
  {
    label: '女',
    value: Gender.Female
  }
]
const uploadAvatar = computed(() => {
  return userForm.value.avatar
    ? userForm.value.avatar.includes('blob')
      ? userForm.value.avatar
      : import.meta.env.VITE_STATICURL + userForm.value.avatar
    : ''
})
const handleChange = (uploadFile: UploadFile) => {
  if (uploadFile.raw) {
    userForm.value.avatar = URL.createObjectURL(uploadFile.raw)
    userForm.value.file = uploadFile.raw
  }
}
const submitForm = async () => {
  await userFormRef.value?.validate()
  const params = new FormData()
  for (let i in userForm.value) {
    params.append(i, userForm.value[i])
  }
  const res = await userUpload(params)
  store.changeUserInfo(res.data)
  ElMessage.success('更新成功')
  userForm.value.file = null
}
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }
}
</style>
