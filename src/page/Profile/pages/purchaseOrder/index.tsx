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
import { useTranslation } from 'react-i18next'


export default function PurchaseOrder() {
  const { t } = useTranslation('user')


  const ListPurchaseOrder = [
    {
      name: t('User:User.In the cart'),
      key: purchases.inCart
    },
    {
      name: t('User:User.All'),
      key: purchases.allItem
    },
    {
      name: t('User:User.Confirm'),
      key: purchases.confirmationShop
    },
    {
      name: t('User:User.Waiting for goods'),
      key: purchases.pickedUp
    },
    {
      name: t('User:User.Delivering'),
      key: purchases.transported
    },
    {
      name: t('User:User.Delivered'),
      key: purchases.delivered
    },
    {
      name: t('User:User.Cancelled'),
      key: purchases.cancel
    }
  ]

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
      <div className='flex w-full justify-between bg-white max-[900px]:flex-col'>
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
              `flex h-14 w-[14.5%] cursor-pointer items-center justify-center text-center text-base max-[900px]:w-[100%] ${
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
              <div>{t('User:User.TotalPrice')}</div>
              <div className='ml-2 text-2xl text-orange'>₫{formatMoney(item.buy_count * item.price)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
