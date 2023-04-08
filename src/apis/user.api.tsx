import http from '../utils/http'
import { resPonseApi } from '../types/utils.type'
import { user } from '../types/user.type'
interface updateMeUser extends Omit<user, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  avatar?: string
  new_password?: string
}

export const getUser = http.get<resPonseApi<user>>('me')

export const updateMe = (body: updateMeUser) => http.put<resPonseApi<updateMeUser>>('user', body)

export const upLoad_Avatar = (body: FormData) =>
  http.post<resPonseApi<string>>('user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
