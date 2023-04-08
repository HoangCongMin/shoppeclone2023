import http from '../utils/http'
import { resPonseApi } from '../types/utils.type'
import { ProductList, ProductConfig, Product } from '../types/productList.type'

export const getProductList = (params: ProductConfig) => http.get<resPonseApi<ProductList>>('products', { params })
export const getProductDetails = (params: string) => http.get<resPonseApi<Product>>(`products/${params}`)
