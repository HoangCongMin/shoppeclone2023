import http from '../utils/http'
import categories from '../types/categories.type'
import { resPonseApi } from '../types/utils.type'

export const getCategories = () => http.get<resPonseApi<categories[]>>('categories')
