import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProductDetails, getProductList } from '../../apis/product.api'
import { useParams } from 'react-router-dom'
import Rating from '../../components/Rating'
import { AiOutlineQuestionCircle, AiOutlineMinus } from 'react-icons/ai'
import { fomatMoney, saleUtil, allAPIid } from '../../utils/util'
import { BsCartPlus } from 'react-icons/bs'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product, Productconfig } from '../../types/productList.type'
import ProductLists from '../Product/component.Product/ProductList'
import QuantityController from '../../components/QuantityController'
import { AddPurchases } from '../../apis/purchases.api'
import purchases from '../../constants/purchases'
import { Purchasesstatusall } from '../../types/purchases.type'

export default function ProductDetails() {
  const { id: idprall } = useParams()
  const [buyCount, setBuyCount] = useState<number>(1)

  // console.log(buyCount)

  const mutation = useMutation({
    mutationFn: (data: { product_id: string; buy_count: number }) => AddPurchases(data)
  })

  const id = allAPIid(idprall as string)
  const { data } = useQuery({
    queryKey: ['ProductDetails', id],
    queryFn: () => getProductDetails(id as string)
  })
  const ProductDetailsall = data?.data.data
  const [currentIndexImg, setCurrentIndexImg] = useState([0, 5])

  const curentImage = useMemo(
    () => (ProductDetailsall ? ProductDetailsall.images.slice(...currentIndexImg) : []),
    [ProductDetailsall, currentIndexImg]
  )

  const queryClient = useQueryClient()

  const handleAddBuyCount = () => {
    mutation.mutate(
      { buy_count: buyCount, product_id: data?.data.data?._id as string },

      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['ListItem', { status: purchases.incart as Purchasesstatusall }] })
        }
      }
    )
  }
  const handleBuycont = (value: number) => setBuyCount(value)
  const imageRef = useRef<HTMLImageElement>(null)

  const [imageItem, setImageItem] = useState('')

  const handleHover = (item: string) => setImageItem(item)

  const next = () => {
    if (currentIndexImg[1] < (ProductDetailsall as Product)?.images.length) {
      setCurrentIndexImg((pre) => [pre[0] + 1, pre[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImg[0] > 0) {
      setCurrentIndexImg((pre) => [pre[0] - 1, pre[1] - 1])
    }
  }

  const queryConfig: Productconfig = { limit: '20', page: '1', category: data?.data.data?.category._id }

  const { data: Productlistall } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return getProductList(queryConfig)
    }
  })

  useEffect(() => {
    if (ProductDetailsall && ProductDetailsall.images.length > 0) {
      setImageItem(ProductDetailsall.images[0])
    }
  }, [ProductDetailsall])

  if (!data?.data.data) {
    return null
  }

  const handleononMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const imagesall = imageRef.current as HTMLImageElement
    const rec = e.currentTarget.getBoundingClientRect()
    const { naturalHeight, naturalWidth } = imagesall
    // cach 1 lay offsetX offsetY
    // const { offsetX, offsetY } = e.nativeEvent
    // cach 2 khong lay duoc  offsetX offsetY
    const offsetY = e.pageY - (rec.y + window.scrollY)
    const offsetX = e.pageX - (rec.x + window.screenX)

    const top = offsetY * (1 - naturalHeight / rec.height)
    const left = offsetX * (1 - naturalWidth / rec.width)
    imagesall.style.height = naturalHeight + 'px'
    imagesall.style.width = naturalWidth + 'px'
    imagesall.style.top = top + 'px'
    imagesall.style.left = left + 'px'
  }

  const handleonMouseLeave = () => {
    imageRef.current?.removeAttribute('style')
  }

  return (
    <div className='w-full bg-[#e5e7eb]'>
      <div className='m-auto flex w-10/12 justify-between bg-white'>
        <div className='w-6/12 pt-3'>
          <div className=' m-auto w-[95%]'>
            <div
              className='relative overflow-hidden pt-[100%]	'
              onMouseMove={handleononMouseMove}
              onMouseLeave={handleonMouseLeave}
            >
              <img
                className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                src={imageItem}
                alt='item-smart'
                ref={imageRef}
              />
            </div>
            <div className=' relative mt-4 grid grid-cols-5 gap-1'>
              <button onClick={prev} className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 '>
                <MdKeyboardArrowLeft className='text-[25px] text-white 	' />
              </button>
              {curentImage.map((item) => {
                const isAtive = imageItem === item
                return (
                  <div key={item} className='relative' onMouseEnter={() => handleHover(item)}>
                    <img className='h-full w-full' src={item} alt='' />
                    {isAtive && <div className='absolute inset-0 border-2 border-[#ee4d2d]' />}
                  </div>
                )
              })}
              <button onClick={next} className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20'>
                <MdKeyboardArrowRight className='text-[25px] text-white ' />
              </button>
            </div>
          </div>
        </div>

        <div className='w-9/12'>
          <div className='m-auto w-[96%] pt-3'>
            <h1 className='text-xl	font-medium	'>{data?.data.data?.name}</h1>
            <div className='mt-3'>
              <div className='flex w-4/12	justify-between	'>
                <div className='flex items-center'>
                  <p className='text-orange'>{data?.data.data?.rating}</p>
                  <div className='ml-1'>
                    <Rating
                      classNameStartWhite={'relative h-4 w-4 fill-current text-orange text-sm'}
                      classNameStarColor={'h-4 w-4 fill-orange text-orange text-sm'}
                      ratingItem={data?.data.data?.rating as number}
                    />
                  </div>
                </div>
                <div className='h-6	border-r-[1px] border-solid border-gray-400'></div>
                <div className='flex items-center'>
                  <p className='text-base	'>{data?.data.data?.sold}</p>
                  <span className='ml-1 text-sm text-[#767676] '>Đã bán</span>
                  <AiOutlineQuestionCircle className='ml-1 text-sm text-[#767676]	' />
                </div>
              </div>
            </div>
            <div className=' mt-3 w-full bg-[#fafafa]'>
              <div className='m-auto flex h-16 w-[95%]	 items-center'>
                <div className='text-base text-[#929292] line-through'>{`₫${fomatMoney(
                  data.data.data.price_before_discount
                )}`}</div>
                <div className='ml-3 text-3xl text-[#ee4d2d]	'>{`₫${fomatMoney(data.data.data.price)}`}</div>
                <div className='ml-3 rounded bg-[#ee4d2d] px-1	py-0.5	text-xs	font-semibold	text-white	'>{`${saleUtil(
                  data.data.data.price,
                  data.data.data.price_before_discount
                )} giảm`}</div>
              </div>
            </div>
            <div className='mt-4 flex  w-full items-center'>
              <div className='w-[16%] text-sm text-[#757575]'>Số lượng</div>

              <QuantityController
                onInputchange={handleBuycont}
                onAddNumber={handleBuycont}
                onMinusone={handleBuycont}
                max={ProductDetailsall?.quantity}
              />
              <div className='ml-4 text-sm text-[#757575]'>{`${data.data.data.quantity} sản phẩm có sẵn`}</div>
            </div>
            <div className='mt-7 flex w-full'>
              <button
                onClick={handleAddBuyCount}
                className='border-1 h-12 w-[32%]	border border-orange bg-bgorange text-orange'
              >
                <div className=' m-auto flex w-[75%] items-center justify-between'>
                  <BsCartPlus className='text-xl	' />
                  <span className='text-base	'>thêm vào giỏ hàng</span>
                </div>
              </button>
              <button className='ml-4 flex h-12 w-[17%] items-center justify-center bg-orange text-white'>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='m-auto mt-8 w-10/12 bg-white p-[10px]'>
        <div className='px-4 pt-4'>
          <div className='bg-[#00000005] p-[14px] text-lg	'>CHI TIẾT SẢN PHẨM</div>
          <div className='m-auto mt-7 w-[97.5%]' dangerouslySetInnerHTML={{ __html: data.data.data.description }} />
        </div>
      </div>
      <div className='m-auto w-10/12'>
        <div className='mt-6 grid grid-cols-5 gap-2.5	'>
          {Productlistall?.data.data?.products.map((item: Product) => (
            <div key={item._id}>
              <ProductLists itemall={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
