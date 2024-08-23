<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      :modelValue="modelValue"
      @update:modelValue="updateContent"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, ref } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadNewsImage, deleteNewsImage } from '@/api/news'
import { IEditorConfig } from '@wangeditor/editor'
type ImageElement = SlateElement & {
  src: string
  alt: string
  url: string
  href: string
}
type InsertFnType = (url: string, alt: string, href: string) => void
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const insertImageList = ref<Array<string>>([])
defineProps<{
  modelValue: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const updateContent = (e: string) => {
  emits('update:modelValue', e)
}
const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = {
  // TS 语法
  // const editorConfig = {                       // JS 语法
  MENU_CONF: {}

  // 其他属性...
}
editorConfig.MENU_CONF['uploadImage'] = {
  async customUpload(file: File, insertFn: InsertFnType) {
    const formdata = new FormData()
    formdata.append('file', file)
    const res = await uploadNewsImage(formdata)
    const url = import.meta.env.VITE_STATICURL + res.data
    insertFn(url, url, url)
  }
}
editorConfig.MENU_CONF['insertImage'] = {
  onInsertedImage(imageNode: ImageElement | null) {
    if (imageNode == null) return
    insertImageList.value.push(imageNode.src)
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const deleteImages = async () => {
  const saveList = (editorRef.value.getElemsByType('image') || []).map(
    (item) => item?.src
  )
  let list = insertImageList.value.filter((item) => {
    return !saveList.includes(item)
  })
  list = list.map((v) => v.replace(import.meta.env.VITE_STATICURL, ''))
  await deleteNewsImage(list)
}
const mode = 'simple'
defineExpose({ deleteImages })
</script>
