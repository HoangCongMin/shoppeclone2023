import http from '../utils/http'
import { resPurchases, purchaseStatusAll } from '../types/purchases.type'
import { resPonseApi } from '../types/utils.type'

const url = 'purchases'

export const AddPurchases = (param: { product_id: string; buy_count: number }) => {
  return http.post<resPonseApi<resPurchases>>(`${url}/add-to-cart`, param)
}

export const GetPurchases = (params: { status: purchaseStatusAll }) => {
  return http.get<resPonseApi<resPurchases[]>>(`${url}`, {
    params
  })
}

export const updatePurchase = (body: { product_id: string; buy_count: number }) => {
  return http.put<resPonseApi<resPurchases>>(`${url}/update-purchase`, body)
}

export const deletePurchase = (idItem: string[]) => {
  return http.delete<resPonseApi<{ deleted_count: number }>>(`${url}`, { data: idItem })
}

export const buyPurchase = (body: { product_id: string; buy_count: number }[]) => {
  return http.post<resPonseApi<resPurchases[]>>(`${url}/buy-products`, body)
}
