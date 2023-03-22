import { resPonseApi } from './utils.type'
import { user } from './user.type'

// chuyền dữ liệu vào resPonseApi
export type Authrespon = resPonseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: user
}>
