import http from '../utils/http'
import { Authrespon } from '../types/auth.type'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const RegisterApi = (body: { email: string; password: string }) => http.post<Authrespon>(URL_REGISTER, body)

export const LoginApi = (body: { email: string; password: string }) => http.post<Authrespon>(URL_LOGIN, body)

export const Logout = () => http.post(URL_LOGOUT)
