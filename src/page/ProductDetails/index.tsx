import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProductDetails, getProductList } from '../../apis/product.api'
import { useParams } from 'react-router-dom'
import Rating from '../../components/Rating'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { formatMoney, saleUtil, allAPIid } from '../../utils/util'
import { BsCartPlus } from 'react-icons/bs'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product, ProductConfig } from '../../types/productList.type'
import ProductLists from '../Product/component.Product/ProductList'
import QuantityController from '../../components/QuantityController'
import { AddPurchases } from '../../apis/purchases.api'
import purchases from '../../constants/purchases'
import { purchaseStatusAll } from '../../types/purchases.type'
import { useNavigate } from 'react-router-dom'
import Path from '../../constants/path'
import { useTranslation } from 'react-i18next'

export default function ProductDetails() {
  const { id: idProAll } = useParams()
  const [buyCount, setBuyCount] = useState<number>(1)
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (data: { product_id: string; buy_count: number }) => AddPurchases(data)
  })

  const mutationBuyNow = useMutation({
    mutationFn: AddPurchases
  })

  const handleBuyNow = async () => {
    const res = await mutationBuyNow.mutateAsync({
      buy_count: buyCount,
      product_id: data?.data.data?._id as string
    })
    const purchase = res.data.data
    navigate(Path.cart, { state: { purchaseId: purchase?._id } })
  }

  const id = allAPIid(idProAll as string)
  const { data } = useQuery({
    queryKey: ['ProductDetails', id],
    queryFn: () => getProductDetails(id as string)
  })
  const ProductDetailsAll = data?.data.data
  const [currentIndexImg, setCurrentIndexImg] = useState([0, 5])

  const currentImage = useMemo(
    () => (ProductDetailsAll ? ProductDetailsAll.images.slice(...currentIndexImg) : []),
    [ProductDetailsAll, currentIndexImg]
  )

  const queryClient = useQueryClient()

  const handleAddBuyCount = () => {
    mutation.mutate(
      { buy_count: buyCount, product_id: data?.data.data?._id as string },

      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['ListItem', { status: purchases.inCart as purchaseStatusAll }] })
        }
      }
    )
  }
  const handleBuyCount = (value: number) => setBuyCount(value)
  const imageRef = useRef<HTMLImageElement>(null)

  const [imageItem, setImageItem] = useState('')

  const handleHover = (item: string) => setImageItem(item)

  const next = () => {
    if (currentIndexImg[1] < (ProductDetailsAll as Product)?.images.length) {
      setCurrentIndexImg((pre) => [pre[0] + 1, pre[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImg[0] > 0) {
      setCurrentIndexImg((pre) => [pre[0] - 1, pre[1] - 1])
    }
  }

  const queryConfig: ProductConfig = { limit: '20', page: '1', category: data?.data.data?.category._id }

  const { data: productListAll } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return getProductList(queryConfig)
    }
  })

  useEffect(() => {
    if (ProductDetailsAll && ProductDetailsAll.images.length > 0) {
      setImageItem(ProductDetailsAll.images[0])
    }
  }, [ProductDetailsAll])

  const { t } = useTranslation(['productDetail'])


  if (!data?.data.data) {
    return null
  }

  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const imagesAll = imageRef.current as HTMLImageElement
    const rec = e.currentTarget.getBoundingClientRect()
    const { naturalHeight, naturalWidth } = imagesAll
    // cach 1 lay offsetX offsetY
    // const { offsetX, offsetY } = e.nativeEvent
    // cach 2 khong lay duoc  offsetX offsetY
    const offsetY = e.pageY - (rec.y + window.scrollY)
    const offsetX = e.pageX - (rec.x + window.screenX)

    const top = offsetY * (1 - naturalHeight / rec.height)
    const left = offsetX * (1 - naturalWidth / rec.width)
    imagesAll.style.height = naturalHeight + 'px'
    imagesAll.style.width = naturalWidth + 'px'
    imagesAll.style.top = top + 'px'
    imagesAll.style.left = left + 'px'
  }

  const handleOnMouseLeave = () => {
    imageRef.current?.removeAttribute('style')
  }

  return (
    <div className='w-full bg-[#e5e7eb] pt-11 pb-20'>
      <div className='m-auto flex w-10/12 max-w-screen-2xl justify-between bg-white py-10'>
        <div className='w-6/12 pt-3'>
          <div className=' m-auto w-[95%]'>
            <div
              className='relative overflow-hidden pt-[100%]	'
              onMouseMove={handleOnMouseMove}
              onMouseLeave={handleOnMouseLeave}
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
              {currentImage.map((item) => {
                const isActive = imageItem === item
                return (
                  <div key={item} className='relative' onMouseEnter={() => handleHover(item)}>
                    <img className='h-full w-full' src={item} alt='' />
                    {isActive && <div className='absolute inset-0 border-2 border-[#ee4d2d]' />}
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
                  <span className='ml-1 text-sm text-[#767676] '>{t('ProductDetail:ProductDetail.Sold')}</span>
                  <AiOutlineQuestionCircle className='ml-1 text-sm text-[#767676]	' />
                </div>
              </div>
            </div>
            <div className=' mt-3 w-full bg-[#fafafa]'>
              <div className='m-auto flex h-16 w-[95%]	 items-center'>
                <div className='text-base text-[#929292] line-through'>{`₫${formatMoney(
                  data.data.data.price_before_discount
                )}`}</div>
                <div className='ml-3 text-3xl text-[#ee4d2d]	'>{`₫${formatMoney(data.data.data.price)}`}</div>
                <div className='ml-3 rounded bg-[#ee4d2d] px-1	py-0.5	text-xs	font-semibold	text-white	'>{`${saleUtil(
                  data.data.data.price_before_discount,
                  data.data.data.price
                )} ${t('ProductDetail:ProductDetail.discount')}`}</div>
              </div>
            </div>
            <div className='mt-4 flex  w-full items-center'>
              <div className='w-[16%] text-sm text-[#757575]'>{t('ProductDetail:ProductDetail.Quantity')}</div>

              <QuantityController
                onInputChange={handleBuyCount}
                onAddNumber={handleBuyCount}
                oneMinusOne={handleBuyCount}
                max={ProductDetailsAll?.quantity}
              />
              <div className='ml-4 text-sm text-[#757575]'>{`${data.data.data.quantity} ${t('ProductDetail:ProductDetail.products available')}`}</div>
            </div>
            <div className='mt-7 flex w-full'>
              <button
                onClick={handleAddBuyCount}
                className='border-1 h-12 w-[32%]	border border-orange bg-bgorange text-orange'
              >
                <div className=' m-auto flex w-[75%] items-center justify-center'>
                  <BsCartPlus className='text-xl	' />
                  <span className='text-base ml-2	'>{t('ProductDetail:ProductDetail.add to cart')}</span>
                </div>
              </button>
              <button
                onClick={handleBuyNow}
                className='ml-4 flex h-12 w-[17%] items-center justify-center bg-orange text-white'
              >
                {t('ProductDetail:ProductDetail.Buy now')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='m-auto mt-8 w-10/12 max-w-screen-2xl	 bg-white p-[10px]'>
        <div className='px-4 pt-4'>
          <div className='bg-[#00000005] p-[14px] text-lg	'>{t('ProductDetail:ProductDetail.PRODUCT DETAILS')}</div>
          <div className='m-auto mt-7 w-[97.5%]' dangerouslySetInnerHTML={{ __html: data.data.data.description }} />
        </div>
      </div>
      <div className='m-auto w-10/12 max-w-screen-2xl	'>
        <div className='mt-6 grid grid-cols-5 gap-2.5	'>
          {productListAll?.data.data?.products.map((item: Product) => (
            <div key={item._id}>
              <ProductLists itemAll={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
