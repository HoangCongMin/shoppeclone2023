import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useNavigate, createSearchParams, Link } from 'react-router-dom'
import { QueryConfig } from '../../index'
import Path from '../../../../constants/path'
import { Productconfig } from '../../../../types/productList.type'
import classNames from 'classnames'
import { omit } from 'lodash'

interface pageSize {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProduct({ queryConfig, pageSize }: pageSize) {
  const page = Number(queryConfig.page)
  const activeSort_by = (sortByValue: Exclude<Productconfig['sort_by'], undefined>) => {
    return sortByValue === queryConfig.sort_by
  }

  const navigate = useNavigate()

  const handleSoft = (sortByValue: Exclude<Productconfig['sort_by'], undefined>) => {
    navigate({
      pathname: Path.Home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleOnchange = (sortByValue: Exclude<Productconfig['order'], undefined>) => {
    navigate({
      pathname: Path.Home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: 'price',
        order: sortByValue
      }).toString()
    })
  }

  return (
    <div className=' flex h-14 items-center bg-zinc-200 text-sm'>
      <div className='m-auto flex w-[97%] items-center justify-between'>
        <div className='flex w-[67%] justify-between '>
          <span className='flex h-8 w-[15%] items-center justify-center'>Sắp xếp theo</span>
          <button
            onClick={() => handleSoft((queryConfig.sort_by = 'view'))}
            className={classNames('flex h-8 w-[15%] items-center justify-center', {
              ' bg-orange text-white': activeSort_by('view'),
              'bg-white': !activeSort_by('view')
            })}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSoft((queryConfig.sort_by = 'createdAt'))}
            className={classNames('flex h-8 w-[15%] items-center justify-center', {
              ' bg-orange text-white': activeSort_by('createdAt'),
              'bg-white': !activeSort_by('createdAt')
            })}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSoft((queryConfig.sort_by = 'sold'))}
            className={classNames('flex h-8 w-[15%] items-center justify-center', {
              ' bg-orange text-white': activeSort_by('sold'),
              'bg-white': !activeSort_by('sold')
            })}
          >
            Bán chạy
          </button>
          <div className='flex h-8 w-[30%] items-center justify-center bg-white'>
            <select
              onChange={(e) => handleOnchange(e.target.value as Exclude<Productconfig['order'], undefined>)}
              className='m-auto h-8 w-[90%] outline-none'
              name='gia'
              id='gia'
              value={queryConfig.order || ''}
            >
              <option>giá</option>

              <option value='asc'>giá : từ thấp đến cao</option>
              <option value='desc'>giá : từ cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className='flex w-[12%] items-center justify-between'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='items-cente flex h-8 w-3/5'>
            {page === 1 ? (
              <span className='flex w-3/6 cursor-not-allowed items-center justify-center'>
                <MdKeyboardArrowLeft />
              </span>
            ) : (
              <Link
                to={{
                  pathname: Path.Home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex w-3/6 items-center justify-center bg-white'
              >
                <MdKeyboardArrowLeft />
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex w-3/6 cursor-not-allowed items-center justify-center'>
                <MdKeyboardArrowRight />
              </span>
            ) : (
              <Link
                to={{
                  pathname: Path.Home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex w-3/6 items-center justify-center bg-white'
              >
                <MdKeyboardArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
