import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useNavigate, createSearchParams, Link } from 'react-router-dom'
import { QueryConfig } from '../../index'
import Path from '../../../../constants/path'
import { ProductConfig } from '../../../../types/productList.type'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'

interface pageSize {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProduct({ queryConfig, pageSize }: pageSize) {
  const page = Number(queryConfig.page)
  const activeSort_by = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    return sortByValue === queryConfig.sort_by
  }

  const navigate = useNavigate()

  const handleSoft = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
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

  const handleOnchange = (sortByValue: Exclude<ProductConfig['order'], undefined>) => {
    navigate({
      pathname: Path.Home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: 'price',
        order: sortByValue
      }).toString()
    })
  }

  const { t } = useTranslation()

  return (
    <div className=' flex h-14 items-center 	 bg-zinc-200 text-sm max-[850px]:h-auto'>
      <div className='m-auto flex w-[97%] items-center justify-between max-[850px]:flex-col '>
        <div className='flex w-[67%] justify-between  max-[1000px]:w-[85%] max-[850px]:flex-col  '>
          <span className='flex h-8 w-[15%] items-center justify-center max-[850px]:mt-2 max-[700px]:w-[40%] '>
            {t('AsideFiller.Sorted by')}
          </span>
          <button
            onClick={() => handleSoft((queryConfig.sort_by = 'view'))}
            className={classNames('flex h-8 w-[15%] items-center justify-center max-[850px]:mt-2 max-[700px]:w-[40%]', {
              ' bg-orange text-white': activeSort_by('view'),
              'bg-white': !activeSort_by('view')
            })}
          >
            {t('AsideFiller.Popular')}
          </button>
          <button
            onClick={() => handleSoft((queryConfig.sort_by = 'createdAt'))}
            className={classNames('flex h-8 w-[15%] items-center justify-center max-[850px]:mt-2 max-[700px]:w-[40%]', {
              ' bg-orange text-white': activeSort_by('createdAt'),
              'bg-white': !activeSort_by('createdAt')
            })}
          >
            {t('AsideFiller.NewTest')}
          </button>
          <button
            onClick={() => handleSoft((queryConfig.sort_by = 'sold'))}
            className={classNames('flex h-8 w-[15%] items-center justify-center max-[850px]:mt-2 max-[700px]:w-[40%]', {
              ' bg-orange text-white': activeSort_by('sold'),
              'bg-white': !activeSort_by('sold')
            })}
          >
            {t('AsideFiller.Selling')}
          </button>
          <div className='flex h-8 w-[30%] items-center justify-center bg-white max-[850px]:mt-2 max-[700px]:w-[40%]'>
            <select
              onChange={(e) => handleOnchange(e.target.value as Exclude<ProductConfig['order'], undefined>)}
              className='m-auto h-8 w-[90%] outline-none'
              name='gia'
              id='gia'
              value={queryConfig.order || ''}
            >
              <option>{t('AsideFiller.Price')}</option>

              <option value='asc'>
                {t('AsideFiller.Price')} : {t('AsideFiller.Price from low to high')}
              </option>
              <option value='desc'>
                {t('AsideFiller.Price')} : {t('AsideFiller.Price from high to low')}
              </option>
            </select>
          </div>
        </div>
        <div className='flex w-[12%] items-center justify-between max-[850px]:my-2 max-[700px]:w-[20%]'>
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
                className='flex w-3/6 items-center  justify-center bg-white'
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
