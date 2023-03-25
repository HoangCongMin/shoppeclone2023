import { useQuery, useMutation } from '@tanstack/react-query'
import purchases from '../../constants/purchases'
import { Purchasesstatusall } from '../../types/purchases.type'
import { GetPurchases, buyPurchase, updatePurchase, deletePurchase } from '../../apis/purchases.api'
import { fomatMoney, formatNumberToSocialStyle } from '../../utils/util'
import QuantityController from '../../components/QuantityController'
import { useEffect, useContext, useState } from 'react'
import { Respurchases } from '../../types/purchases.type'
import { omit, keyBy } from 'lodash'
import { useLocation } from 'react-router-dom'
import { mycreateContext } from '../../context/context'

export interface purchasesExtendItem extends Respurchases {
  checked: boolean
  disible: boolean
}
export default function Cart() {
  const location = useLocation()
  const stateBuyNow = (location.state as { purchaseId: string } | null)?.purchaseId

  const { data, refetch } = useQuery({
    queryKey: ['purchases', { status: purchases.incart as Purchasesstatusall }],
    queryFn: () => GetPurchases({ status: purchases.incart as Purchasesstatusall })
  })

  const mutation = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const mutatioBuyPurchase = useMutation({
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

  const { setPurchasesExtend, purchasesExtend } = useContext(mycreateContext)
  // const [purchasesExtend, setPurchasesExtend] = useState<purchasesExtendItem[]>([])

  const handleCheckedItem = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPurchasesExtend(
      purchasesExtend.map((item) => {
        if (item._id === id) return { ...item, checked: (item.checked = e.target.checked) }

        return item
      })
    )
  const handlecheckedall = purchasesExtend.every((item) => item.checked)

  const changehandlecheckedall = () =>
    setPurchasesExtend((pre) =>
      pre.map((item) => ({
        ...item,
        checked: !handlecheckedall
      }))
    )
  const handleupdatecnount = (id: string, value: number, condition: boolean) => {
    if (condition) {
      purchasesExtend.map((item) => {
        if (item._id === id) {
          item.disible = true
          mutation.mutate({
            ...item,
            product_id: item.product._id,
            buy_count: value
          })
        }
      })
    }
  }

  const handleOnchagen = (id: string) => (value: number) =>
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

  const itemChecked = purchasesExtend.filter((item) => item.checked === true)
  const totalBuyCount = itemChecked.reduce((total, number) => total + number.price * number.buy_count, 0)
  const totalSalePrice = itemChecked.reduce(
    (total, number) => total + number.price_before_discount * number.buy_count,
    0
  )
  const handleRemove = (id: string) => () => deleteMutation.mutate([id])
  const handleRemoveall = () => deleteMutation.mutate(itemChecked.map((item) => item._id))

  const ma = itemChecked.map((item) =>
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
  )

  const handleBuyCount = () => {
    if (itemChecked.length > 0) {
      mutatioBuyPurchase.mutate(ma as [])
    }
  }

  useEffect(() => {
    setPurchasesExtend((pre) => {
      const extensPurchaseObj = keyBy(pre, '_id')
      return (
        purchasesInCart?.map((item) => {
          const stateBuyNowAll = stateBuyNow === item._id

          return {
            ...item,
            checked: stateBuyNowAll || Boolean(extensPurchaseObj[item._id]?.checked),
            disible: false
          }
        }) || []
      )
    })
  }, [purchasesInCart, stateBuyNow])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <div className='w-full bg-[#f4f4f5] py-5'>
      <div className='m-auto w-10/12 max-w-screen-2xl bg-white shadow-sm '>
        <div className='flex h-14 items-center'>
          <div className='m-auto flex w-[95%] justify-between	'>
            <div className='flex w-[31%] items-center'>
              <div className='w-[10%]'>
                <input
                  onChange={changehandlecheckedall}
                  checked={handlecheckedall}
                  className='h-[18px] w-[18px] rounded-md  accent-orange'
                  type='checkbox'
                />
              </div>
              <div className='ml-[4%] text-sm	'>Sản Phẩm</div>
            </div>
            <div className='flex w-7/12 justify-around text-center text-sm text-[#888888]'>
              <div className='w-3/12	'>Đơn Giá</div>
              <div className='w-3/12	'>Số Lượng</div>
              <div className='w-3/12	'>Số Tiền</div>
              <div className='w-3/12	'>Thao Tác</div>
            </div>
          </div>
        </div>
      </div>
      {purchasesExtend?.map((item, index) => (
        <div className='m-auto mt-4  flex		w-10/12 max-w-screen-2xl items-center bg-white py-6' key={item._id}>
          <div className='m-auto flex w-[95%] justify-between'>
            <div className='flex w-[31%] items-center'>
              <div className='w-[10%]'>
                <input
                  checked={item.checked}
                  onChange={handleCheckedItem(item._id)}
                  className='h-[18px] w-[18px] rounded-md  accent-orange'
                  type='checkbox'
                />
              </div>
              <div className='ml-[4%] flex items-center	text-sm'>
                <img className='h-20 w-20' src={item.product.image} alt='' />
                <div className='ml-2 text-sm line-clamp-2'>{item.product.name}</div>
              </div>
            </div>
            <div className='flex w-7/12 items-center justify-around text-center text-sm text-[#888888]'>
              <div className='flex w-3/12 items-center justify-center'>
                <p className='text-sm line-through'>₫{fomatMoney(item.price_before_discount)}</p>
                <span className='ml-2 text-sm text-black'>₫{fomatMoney(item.price)}</span>
              </div>
              <div className='flex w-3/12 justify-center'>
                <QuantityController
                  value={item.buy_count}
                  max={item.product.quantity}
                  onAddNumber={(value: number) => handleupdatecnount(item._id, value, value <= item.product.quantity)}
                  onMinusone={(value: number) => handleupdatecnount(item._id, value, value >= 1)}
                  onInputchange={handleOnchagen(item._id)}
                  onForcos={(value: number) =>
                    handleupdatecnount(
                      item._id,
                      value,
                      value >= 1 &&
                        value <= item.product.quantity &&
                        value !== (purchasesInCart as purchasesExtendItem[])[index].buy_count
                    )
                  }
                  disabled={item.disible}
                />
              </div>
              <div className='w-3/12 text-sm text-[#EE4D2D]'>₫{fomatMoney(item.price * item.buy_count)}</div>
              <button onClick={handleRemove(item._id)} className='w-3/12	 text-sm text-black'>
                xoa
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className='sticky bottom-0 z-10		m-auto mt-4 flex w-10/12 max-w-screen-2xl items-center border border-gray-100 bg-white py-6 shadow'>
        <div className='m-auto flex w-[95%] items-center justify-between bg-white '>
          <div className='flex w-[31%] items-center justify-between'>
            <input
              checked={handlecheckedall}
              onChange={changehandlecheckedall}
              className='h-[18px] w-[18px] rounded-md  accent-orange'
              type='checkbox'
            />
            <p>Chọn Tất Cả ({purchasesInCart?.length})</p>
            <button onClick={handleRemoveall}>xoa</button>
          </div>

          <div className='flex w-6/12 items-center justify-between'>
            <div>
              <div className='flex items-center'>
                <p>Tổng thanh toán (0 Sản phẩm):</p>
                <span className='text-2xl	text-orange'>₫{fomatMoney(totalBuyCount)}</span>
              </div>
              <div className='flex items-center justify-end'>
                <div className='flex w-5/12 items-center justify-between'>
                  <p>Tiết kiệm</p>
                  <span className='text-sm text-orange'>
                    ₫{formatNumberToSocialStyle(totalSalePrice - totalBuyCount)}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={handleBuyCount} className='w-4/12 bg-orange py-2 font-light	text-white'>
              Mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
