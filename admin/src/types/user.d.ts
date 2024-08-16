export type UserInfo = {
  _id: string
  username: string
  password?: string
  gender?: number //性别，0，1，2
  introduction?: string //简介
  avatar?: string
  role: number //管理员1，编辑2
}
export type UserForm = {
  username: string | undefined
  gender: number | undefined
  introduction: string | undefined
  avatar: string | undefined
  file: File | null
  role?: Number
  [key: string]: any
}
