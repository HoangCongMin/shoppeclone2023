// kiểu dữ liệu trường user nhận về

type Roles = 'user' | 'admin'

export interface user {
  _id: string
  roles: Roles[]
  email: string
  name?: string
  date_of_birth?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
  avatar?: string
}
