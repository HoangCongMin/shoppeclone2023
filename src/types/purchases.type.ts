import { Product } from '../types/productList.type'

type purchaseStatus = -1 | 1 | 2 | 3 | 4 | 5
export type purchaseStatusAll = purchaseStatus | 0

export interface resPurchases {
  _id: string
  buy_count: number
  price: purchaseStatus
  price_before_discount: number
  status: number
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
