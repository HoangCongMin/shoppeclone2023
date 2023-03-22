import { user } from '../types/user.type'

export const getlocalStorage = () => localStorage.getItem('access_token') || ''

export const setlocalStorage = (access_token: string) => localStorage.setItem('access_token', access_token)

export const clearlocalStorage = () => localStorage.clear()

export const setProfile = (user: user) => {
  return localStorage.setItem('user', JSON.stringify(user))
}

export const getProfile = () => {
  const userjson = localStorage.getItem('user')
  return userjson ? JSON.parse(userjson) : null
}
