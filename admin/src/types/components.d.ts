import Editor from '@/components/Editor/index.vue'
import Upload from '@/components/UploadAvatar/index.vue'
declare module 'vue' {
  export interface GlobalComponents {
    Editor: typeof Editor
    Upload: typeof Upload
  }
}
