<template>
  <div>
    <el-page-header
      icon=""
      title="用户管理"
      content="添加用户"
    ></el-page-header>
  </div>
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
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" type="password" />
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="userForm.role">
        <el-option label="管理员" :value="1"></el-option>
        <el-option label="编辑" :value="2"></el-option>
      </el-select>
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
      <el-button type="primary" @click="submitForm">添加用户</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  ElMessage,
  type FormInstance,
  type FormRules,
  type UploadFile
} from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { Role } from '@/enums/index'
import UploadAvatar from '@/components/UploadAvatar/index.vue'
import { type UserForm } from '@/types/user'
import { Gender } from '@/enums/index'
import { userAdd } from '@/api/user'
import { useRouter } from 'vue-router'
const userFormRef = ref<FormInstance>()
const userForm = ref<UserForm>({
  username: '',
  password: '',
  role: Role.Edit,
  introduction: '',
  avatar: '',
  file: null,
  gender: Gender.Unknown
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
const userFromRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  introduction: [{ required: true, message: '个人介绍', trigger: 'blur' }],
  avatar: [{ required: true, message: '上传头像', trigger: 'blur' }]
})
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
const router = useRouter()
const submitForm = async () => {
  await userFormRef.value?.validate()
  const params = new FormData()
  for (let i in userForm.value) {
    params.append(i, userForm.value[i])
  }
  await userAdd(params)
  ElMessage.success('添加成功')
  router.push('/user-manage/userlist')
}
</script>

<style scoped lang="scss">
.demo-ruleForm {
  margin-top: 50px;
}
</style>
