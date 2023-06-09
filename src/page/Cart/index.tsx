import { useQuery, useMutation } from '@tanstack/react-query'
import purchases from '../../constants/purchases'
import { purchaseStatusAll } from '../../types/purchases.type'
import { GetPurchases, buyPurchase, updatePurchase, deletePurchase } from '../../apis/purchases.api'
import { formatMoney, formatNumberToSocialStyle } from '../../utils/util'
import QuantityController from '../../components/QuantityController'
import { useEffect, useContext, useState, useMemo } from 'react'
import { resPurchases } from '../../types/purchases.type'
import omit from 'lodash/omit'
import keyBy from 'lodash/keyBy'
import { useLocation } from 'react-router-dom'
import { myCreateContext } from '../../context/context'
import { useTranslation } from 'react-i18next'

export interface purchasesExtendItem extends resPurchases {
  checked: boolean
  disable: boolean
}

export default function Cart() {
  const { t } = useTranslation('cart')
  const location = useLocation()
  const stateBuyNow = (location.state as { purchaseId: string } | null)?.purchaseId

  const { data, refetch } = useQuery({
    queryKey: ['purchases', { status: purchases.inCart as purchaseStatusAll }],
    queryFn: () => GetPurchases({ status: purchases.inCart as purchaseStatusAll })
  })

  const mutation = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const mutationBuyPurchase = useMutation({
    mutationFn: buyPurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const purchasesInCart = data?.data.data

  const { purchasesExtend, setPurchasesExtend } = useContext(myCreateContext)

  const handleCheckedItem = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPurchasesExtend(
      purchasesExtend.map((item) => {
        if (item._id === id) return { ...item, checked: (item.checked = e.target.checked) }

        return item
      })
    )
  const handleCheckedAll = purchasesExtend.every((item) => item.checked)

  const changeHandleCheckedAll = () =>
    setPurchasesExtend((pre) => {
      return pre.map((item) => ({
        ...item,
        checked: !handleCheckedAll
      }))
    })
  const handleUpdateCount = (id: string, value: number, condition: boolean) => {
    if (condition) {
      purchasesExtend.map((item) => {
        if (item._id === id) {
          item.disable = true
          mutation.mutate({
            ...item,
            product_id: item.product._id,
            buy_count: value
          })
        }
      })
    }
  }

  const handleOnChange = (id: string) => (value: number) =>
    setPurchasesExtend(
      purchasesInCart?.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            buy_count: value
          }
        }
        return { ...item }
      }) as purchasesExtendItem[]
    )

  // const handleOnchagen = (purchaseIndex: number) => (value: number) => {
  //   setPurchasesExtend(
  //     produce((draft) => {
  //       draft[purchaseIndex].buy_count = value
  //     })
  //   )
  // }

  const itemChecked = useMemo(() => purchasesExtend.filter((item) => item.checked === true), [purchasesExtend])
  const totalBuyCount = useMemo(
    () => itemChecked.reduce((total, number) => total + number.price * number.buy_count, 0),
    [itemChecked]
  )
  const totalSalePrice = useMemo(
    () => itemChecked.reduce((total, number) => total + number.price_before_discount * number.buy_count, 0),
    [itemChecked]
  )
  const handleRemove = (id: string) => () => deleteMutation.mutate([id])
  const handleRemoveAll = () => deleteMutation.mutate(itemChecked.map((item) => item._id))

  const ma = useMemo(
    () =>
      itemChecked.map((item) =>
        omit({ ...item, product_id: item.product._id, buy_count: item.buy_count }, [
          'checked',
          'disible',
          '_id',
          'price',
          'price_before_discount',
          'status',
          'user',
          'createdAt',
          'updatedAt'
        ])
      ),
    [itemChecked]
  )

  const handleBuyCount = () => {
    if (itemChecked.length > 0) {
      mutationBuyPurchase.mutate(ma as [])
    }
  }

  useEffect(() => {
    setPurchasesExtend((pre) => {
      const extendPurchaseObj = keyBy(pre, '_id')
      return (
        purchasesInCart?.map((item) => {
          const stateBuyNowAll = stateBuyNow === item._id

          return {
            ...item,
            checked: stateBuyNowAll || Boolean(extendPurchaseObj[item._id]?.checked),
            disable: false
          }
        }) || []
      )
    })
  }, [stateBuyNow, purchasesInCart])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <div className='w-full bg-[#f4f4f5] py-16'>
      <div className='m-auto w-10/12 max-w-screen-2xl bg-white shadow-sm '>
        <div className='flex h-14 items-center'>
          <div className='m-auto flex w-[95%] justify-between	'>
            <div className='flex w-[31%] items-center max-[800px]:justify-between'>
              <div className='w-[10%]'>
                <input
                  onChange={changeHandleCheckedAll}
                  checked={handleCheckedAll}
                  className='h-[18px] w-[18px] rounded-md  accent-orange'
                  type='checkbox'
                />
              </div>
              <div className='ml-[4%] truncate	text-sm'>{t('Cart:cart.Product')}</div>
            </div>
            <div className='flex w-7/12 justify-around text-center text-sm text-[#888888]'>
              <div className='w-3/12 	truncate'>{t('Cart:cart.Unit price')}</div>
              <div className='w-3/12	truncate'>{t('Cart:cart.Quantity')}</div>
              <div className='w-3/12	truncate'>{t('Cart:cart.Amount of money')}</div>
              <div className='w-3/12	truncate'>{t('Cart:cart.Operation')}</div>
            </div>
          </div>
        </div>
      </div>
      {purchasesExtend?.map((item, index) => (
        <div className='m-auto mt-4  flex		w-10/12 max-w-screen-2xl items-center bg-white py-6' key={item._id}>
          <div className='m-auto flex w-[95%]  justify-between max-[800px]:flex-col'>
            <div className='flex w-[31%] items-center max-[800px]:w-[100%] '>
              <div className='w-[10%] '>
                <input
                  checked={item.checked}
                  onChange={handleCheckedItem(item._id)}
                  className='h-[18px] w-[18px] rounded-md  accent-orange'
                  type='checkbox'
                />
              </div>
              <div className='ml-[4%] flex items-center	text-sm max-[800px]:w-[60%]'>
                <img className='h-20 w-20' src={item.product.image} alt='' />
                <div className='ml-2 text-sm line-clamp-2'>{item.product.name}</div>
              </div>
            </div>
            <div className='flex w-7/12 items-center justify-around text-center text-sm text-[#888888] max-[800px]:w-[100%] max-[800px]:mt-4 '>
              <div className='flex w-3/12 items-center justify-center'>
                <p className='m-0 truncate text-sm	line-through max-[1100px]:hidden'>
                  ₫{formatMoney(item.price_before_discount)}
                </p>
                <span className='ml-2 truncate text-sm text-black	'>₫{formatMoney(item.price)}</span>
              </div>
              <div className='flex w-3/12 justify-center truncate'>
                <QuantityController
                  value={item.buy_count}
                  max={item.product.quantity}
                  onAddNumber={(value: number) => handleUpdateCount(item._id, value, value <= item.product.quantity)}
                  oneMinusOne={(value: number) => handleUpdateCount(item._id, value, value >= 1)}
                  onInputChange={handleOnChange(item._id)}
                  onFocusOne={(value: number) =>
                    handleUpdateCount(
                      item._id,
                      value,
                      value >= 1 &&
                        value <= item.product.quantity &&
                        value !== (purchasesInCart as purchasesExtendItem[])[index].buy_count
                    )
                  }
                  disabled={item.disable}
                />
              </div>
              <div className='w-3/12 truncate text-sm text-[#EE4D2D]'>₫{formatMoney(item.price * item.buy_count)}</div>
              <button onClick={handleRemove(item._id)} className='w-3/12	 text-sm text-black'>
                {t('Cart:cart.Delete')}
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className='sticky bottom-0 z-10		m-auto mt-4 flex w-10/12 max-w-screen-2xl items-center border border-gray-100 bg-white py-6 shadow'>
        <div className='m-auto flex w-[95%] items-center justify-between bg-white max-[800px]:flex-col'>
          <div className='flex w-[31%] items-center justify-between max-[800px]:w-[100%]'>
            <input
              checked={handleCheckedAll}
              onChange={changeHandleCheckedAll}
              className='h-[18px] w-[18px] rounded-md  accent-orange'
              type='checkbox'
            />
            <p >
              {t('Cart:cart.Select all')} ({purchasesInCart?.length})
            </p>
            <button onClick={handleRemoveAll}>{t('Cart:cart.Delete')}</button>
          </div>

          <div className='flex w-6/12 items-center justify-between max-[800px]:w-[100%] max-[800px]:pt-4'>
            <div>
              <div className='flex items-center'>
                <p >
                  {t('User:User.TotalPrice')} {itemChecked.length} {t('Cart:cart.Product')} :
                </p>
                <span className='text-2xl	text-orange'>₫{formatMoney(totalBuyCount)}</span>
              </div>
              <div className='flex items-center justify-end'>
                <div className='flex items-center justify-between'>
                  <p>{t('Cart:cart.Economize')}</p>
                  <span className='text-sm text-orange'>
                    ₫{formatNumberToSocialStyle(totalSalePrice - totalBuyCount)}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={handleBuyCount} className='w-4/12 bg-orange py-2 font-light	text-white'>
              {t('Cart:cart.Purchase')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
