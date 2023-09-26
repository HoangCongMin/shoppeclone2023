import axios, { type AxiosInstance, AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  setProfile,
  setLocalStorageReFreshToken,
  getLocalStorageReFreshToken
} from './auth'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER, URL_REFRESH_TOKEN } from '../apis/auth.api'



export class Http {
  instance: AxiosInstance
  private accesstoken: string
  private reFreshToken: string
  private reFreshTokenRequest: Promise<string> | null

  constructor() {
    this.accesstoken = getLocalStorage()
    this.reFreshToken = getLocalStorageReFreshToken()
    this.reFreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
        // 'expire-access-token': 10,
        // 'expire-refresh-token': 600
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accesstoken && config.headers) {
          config.headers.authorization = this.accesstoken
          return config
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        if (url === URL_LOGIN || url === URL_REGISTER) {
          this.accesstoken = response.data.data.access_token
          setLocalStorage(this.accesstoken)
          setProfile(response.data.data.user)
          setLocalStorageReFreshToken(response.data.data.refresh_token)
        } else if (url === URL_LOGOUT) {
          this.accesstoken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== 422 && !HttpStatusCode.Unauthorized) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        const config = error.response?.config
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          if (error.response?.status === HttpStatusCode.Unauthorized && config?.url !== URL_REFRESH_TOKEN) {
            this.reFreshTokenRequest = this.reFreshTokenRequest
              ? this.reFreshTokenRequest
              : this.handleReFreshToken().finally(() => {
                  setTimeout(() => {
                    this.reFreshTokenRequest = null
                  })
                })
            return this.reFreshTokenRequest.then((data) => {
              return this.instance({ ...config, headers: { ...config?.headers, authorization: data } })
            })
          }
          clearLocalStorage()
          this.accesstoken = ''
          this.reFreshToken = ''
        }
        return Promise.reject(error)
      }
    )
  }
  handleReFreshToken() {
    return this.instance
      .post(URL_REFRESH_TOKEN, { refresh_token: this.reFreshToken })
      .then((data) => {
        setLocalStorage(data.data.data.access_token)
        this.accesstoken = data.data.data.access_token
        return data.data.data.access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accesstoken = ''
        this.reFreshToken = ''
        throw new error()
      })
  }
}

const http = new Http().instance

export default http
