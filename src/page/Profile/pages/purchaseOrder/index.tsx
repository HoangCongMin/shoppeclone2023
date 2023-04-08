import React from 'react'
import purchases from '../../../../constants/purchases'
import { createSearchParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { GetPurchases } from '../../../../apis/purchases.api'
import useQueryParam from '../../../../Hook/useQueryParam'
import Path from '../../../../constants/path'
import { purchaseStatusAll } from '../../../../types/purchases.type'
import { formatMoney } from '../../../../utils/util'
import classNames from 'classnames'

const ListPurchaseOrder = [
  {
    name: 'Trong giỏ hàng',
    key: purchases.inCart
  },
  {
    name: 'Tất cả',
    key: purchases.allItem
  },
  {
    name: 'Xác nhận',
    key: purchases.confirmationShop
  },
  {
    name: 'Chờ lấy hàng',
    key: purchases.pickedUp
  },
  {
    name: 'Đang giao',
    key: purchases.transported
  },
  {
    name: 'Đã giao',
    key: purchases.delivered
  },
  {
    name: 'Đã hủy',
    key: purchases.cancel
  }
]
export default function PurchaseOrder() {
  const paramPurChase: { status?: purchaseStatusAll } = useQueryParam()
  const paramPurChaseStatus: number = paramPurChase.status || purchases.allItem

  const { data } = useQuery({
    queryKey: ['PurchaseOrder', paramPurChaseStatus],
    queryFn: () => {
      return GetPurchases({ status: paramPurChaseStatus as purchaseStatusAll })
    }
  })

  return (
    <div className='w-full'>
      <div className='flex w-full justify-between bg-white'>
        {ListPurchaseOrder.map((item) => (
          <Link
            to={{
              pathname: Path.Oder,
              search: createSearchParams({
                status: String(item.key)
              }).toString()
            }}
            key={item.key}
            className={classNames(
              `flex h-14 w-[14.5%] cursor-pointer items-center justify-center text-center text-base ${
                paramPurChaseStatus === item.key
                  ? 'border-b-2	 border-orange text-orange '
                  : 'border-b-2 border-slate-200 text-black'
              }`
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {data?.data.data?.map((item) => (
        <div key={item.product._id} className='mt-5 w-full bg-white py-3'>
          <div className='m-auto flex w-11/12 items-center justify-between'>
            <div className='flex w-8/12 items-center'>
              <div className='w-[80px]'>
                <img className='w-full' src={item.product.image} alt='' />
              </div>
              <div className='ml-2 w-10/12 line-clamp-1'>{item.product.name}</div>
            </div>
            <div className='w-2.5/12 flex items-center'>
              <div className='text-sm text-[#888888] line-through '>₫{formatMoney(item.price_before_discount)}</div>
              <div className='ml-2'>₫{formatMoney(item.price)}</div>
            </div>
          </div>
          <div className='m-auto flex w-11/12 flex-row-reverse 	'>
            <div className='flex items-center'>
              <div>Tổng Giá Tiền :</div>
              <div className='ml-2 text-2xl text-orange'>₫{formatMoney(item.buy_count * item.price)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
