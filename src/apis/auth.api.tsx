import http from '../utils/http'
import { AuthResponse } from '../types/auth.type'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const RegisterApi = (body: { email: string; password: string }) => http.post<AuthResponse>(URL_REGISTER, body)

export const LoginApi = (body: { email: string; password: string }) => http.post<AuthResponse>(URL_LOGIN, body)

export const Logout = () => http.post(URL_LOGOUT)

