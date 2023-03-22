import http from '../utils/http'
import { Respurchases, Purchasesstatusall } from '../types/purchases.type'
import { resPonseApi } from '../types/utils.type'

const url = 'purchases'

export const AddPurchases = (param: { product_id: string; buy_count: number }) => {
  return http.post<resPonseApi<Respurchases>>(`${url}/add-to-cart`, param)
}

export const GetPurchases = (params: { status: Purchasesstatusall }) => {
  return http.get<resPonseApi<Respurchases[]>>(`${url}`, {
    params
  })
}

export const updatePurchase = (body: { product_id: string; buy_count: number }) => {
  return http.put<resPonseApi<Respurchases>>(`${url}/update-purchase`, body)
}

export const deletePurchase = (idItem: string[]) => {
  return http.delete<resPonseApi<{ deleted_count: number }>>(`${url}`, { data: idItem })
}

export const buyPurchase = (body: { product_id: string; buy_count: number }[]) => {
  return http.post<resPonseApi<Respurchases[]>>(`${url}/buy-products`, body)
}
