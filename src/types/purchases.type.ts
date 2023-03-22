import { Product } from '../types/productList.type'

type Purchasesstatus = -1 | 1 | 2 | 3 | 4 | 5
export type Purchasesstatusall = Purchasesstatus | 0

export interface Respurchases {
  _id: string
  buy_count: number
  price: Purchasesstatus
  price_before_discount: number
  status: number
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
