import { Product } from '../../../../types/productList.type'
import { fomatMoney, formatNumberToSocialStyle, getParamSeo } from '../../../../utils/util'
import Rating from '../../../../components/Rating'
import { Link } from 'react-router-dom'
import Path from '../../../../constants/path'

interface Prop {
  itemall: Product
}
export default function ProductLists({ itemall }: Prop) {
  return (
    <Link to={`${Path.Home}${getParamSeo({ name: itemall.name, id: itemall._id })}`}>
      <div className='col-span-1 transform bg-white pb-2 shadow hover:translate-y-[-0.0625rem] hover:shadow-3xl'>
        <div className='relative w-full pt-[100%]'>
          <img className='absolute top-0 left-0 h-full w-full object-cover' src={itemall.image} alt='' />
        </div>
        <div className='m-auto mt-2 min-h-[2rem] w-[90%] text-xs line-clamp-2'>{itemall.name}</div>
        <div className='m-auto w-[90%]'>
          <span className='mr-2	max-w-[100%] text-sm	text-slate-400	line-through	'>
            {' '}
            ₫{fomatMoney(itemall.price_before_discount)}
          </span>
          <span className='max-w-[100%] text-orange'>₫{fomatMoney(itemall.price)}</span>
        </div>
        <div className='m-auto flex w-[90%] items-center justify-between'>
          <Rating
            classNameStarColor={'h-3 w-3 fill-yellow-300 text-yellow-300'}
            classNameStartWhite={'relative h-3 w-3 fill-current text-yellow-300'}
            ratingItem={itemall.rating}
          />
          <div>
            <div className='text-[12px]'>Đã bán {formatNumberToSocialStyle(itemall.sold)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
