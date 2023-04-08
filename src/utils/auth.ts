import { user } from '../types/user.type'

export const localStorageClearContext = new EventTarget()

export const getLocalStorage = () => localStorage.getItem('access_token') || ''

export const getLocalStorageReFreshToken = () => localStorage.getItem('refresh_token') || ''


export const setLocalStorage = (access_token: string) => localStorage.setItem('access_token', access_token)
export const setLocalStorageReFreshToken = (refresh_token: string) =>
  localStorage.setItem('refresh_token', refresh_token)

export const clearLocalStorage = () => {
  localStorage.clear()
  const statusClear = new Event('statusClear')
  localStorageClearContext.dispatchEvent(statusClear)
}

export const setProfile = (user :user) => {
  return localStorage.setItem('user', JSON.stringify(user))
}

export const getProfile = () => {
  const userJson = localStorage.getItem('user')
  return userJson ? JSON.parse(userJson) : null
}
