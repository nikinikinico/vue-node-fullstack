<template>
  <div>
    <el-page-header
      icon=""
      title="用户管理"
      content="用户列表"
    ></el-page-header>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar.length > 0">
              <el-avatar
                :size="50"
                :src="baseUrl + scope.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar :size="50" :src="avatar"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.role === 1">管理员</el-tag>
            <el-tag type="success" v-if="scope.row.role === 2">编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑用户" width="500">
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

        <el-form-item label="个人简介" prop="introduction">
          <el-input v-model="userForm.introduction" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeModal">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { userDelete, userList, userUpdate } from '@/api/user'
import { onMounted, reactive, ref } from 'vue'
import type { UserInfo, EditUserForm } from '@/types/user'
import avatar from '@/assets/images/avater.png'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Role } from '@/enums/index'
const baseUrl = import.meta.env.VITE_STATICURL
const tableData = ref<Array<UserInfo>>([])
onMounted(async () => {
  getTableList()
})
const getTableList = async () => {
  const res = await userList()
  tableData.value = res.data
}
const dialogVisible = ref(false)
const handleEdit = async (row: EditUserForm) => {
  userForm.value = row
  dialogVisible.value = true
}
const closeModal = () => {
  userFormRef.value?.resetFields()
  dialogVisible.value = false
}
const handleEditConfirm = async () => {
  await userFormRef.value?.validate()
  console.log(userForm.value, 'value')
  await userUpdate(userForm.value)
  ElMessage.success('更新成功')
  closeModal()
  getTableList()
}
const handleDelete = async (row: EditUserForm) => {
  await userDelete(row._id as string)

  ElMessage.success('删除成功')
  getTableList()
}

const userFormRef = ref<FormInstance>()
const userForm = ref<EditUserForm>({
  _id: '',
  username: '',
  password: '',
  role: Role.Edit,
  introduction: ''
})
const userFromRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  introduction: [{ required: true, message: '个人介绍', trigger: 'blur' }]
})
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 30px;
}
</style>
