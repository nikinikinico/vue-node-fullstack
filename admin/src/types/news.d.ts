import type { NewsType } from '@/enums'

export type News = {
  _id?: string
  title: string
  content: string
  category: NewsType
  cover: string
  isPublish: 0 | 1
  file?: Blob | null
  createTime?: Date
  editTime?: Date
}
