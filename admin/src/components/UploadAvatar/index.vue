<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :auto-upload="false"
    :on-change="
      (e) => {
        emits('handleChange', e)
      }
    "
  >
    <img v-if="uploadAvatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { type UploadFile } from 'element-plus'
const emits = defineEmits<{
  (e: 'handleChange', val: UploadFile): void
}>()
defineProps<{
  uploadAvatar: string
}>()
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>
