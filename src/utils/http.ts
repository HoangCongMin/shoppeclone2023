import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { setlocalStorage, getlocalStorage, clearlocalStorage, setProfile } from './auth'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from '../apis/auth.api'

class Http {
  instance: AxiosInstance
  private accesstoken: string
  constructor() {
    this.accesstoken = getlocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
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
          console.log(url)
          this.accesstoken = response.data.data.access_token
          setlocalStorage(this.accesstoken)
          setProfile(response.data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accesstoken = ''
          console.log(this.accesstoken)
          clearlocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== 422) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
