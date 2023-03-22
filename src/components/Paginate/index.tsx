import classNames from 'classnames'
// import { before, rearg } from 'lodash'
import { Link, createSearchParams } from 'react-router-dom'
import Path from '../../constants/path'
import { QueryConfig } from '../../page/Product/index'
// import { Productconfig } from '../../types/productList.type'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

interface Prop {
  // queryConfig: object
  queryConfig: QueryConfig

  pageSize: number
  // data: number
}

const range = 2
export default function Paginate({
  queryConfig,
  pageSize
}: // data
Prop) {
  // const pages = Number(data)
  const pages = Number(queryConfig.page)

  // console.log(pageSizes)

  // const pageSize = Number(pageSizes)
  const renderPaginate = () => {
    let dotAfter = false
    let dotBefro = false

    const dodotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='mr-5 flex h-8 w-10 items-center justify-center text-[#00000066]'>
            ...
          </button>
        )
      }
      return null
    }

    const dodotBefro = (index: number) => {
      if (!dotBefro) {
        dotBefro = true
        return (
          <button key={index} className='mr-5 flex h-8 w-10 items-center justify-center text-[#00000066]'>
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageName = index + 1
        if (pages <= range * 2 + 1 && pageName > pages + range && pageName < pageSize - range + 1) {
          return dodotAfter(index)
        } else if (pages > range * 2 + 1 && pages < pageSize - range * 2) {
          if (pageName < pages - range && pageName > range) {
            return dodotBefro(index)
          }
          if (pageName > pages + range && pageName < pageSize - range + 1) {
            return dodotAfter(index)
          }
        } else if (pages >= pageSize - range * 2 && pageName > range && pageName < pages - range) {
          return dodotBefro(index)
        }

        return (
          <Link
            to={{
              pathname: Path.Home,
              search: createSearchParams({
                ...queryConfig,
                page: pageName.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              `mx-1 flex h-8 w-10 items-center justify-center text-[1.245rem]	 ${
                pageName === pages ? 'rounded-sm bg-orange text-white' : 'border-transparent text-[#00000066]'
              }`
            )}
          >
            {pageName}
          </Link>
        )
      })
  }
  return (
    <div className='m-auto mt-10 flex flex-wrap items-center justify-center	'>
      {pages === 1 ? (
        <span>
          <span className='mr-5 flex h-8 w-10 cursor-not-allowed items-center justify-center text-[#00000066]'>
            <IoIosArrowBack />
          </span>
        </span>
      ) : (
        <Link
          to={{
            pathname: Path.Home,
            search: createSearchParams({
              ...queryConfig,
              page: (pages - 1).toString()
            }).toString()
          }}
          className='mr-5 flex h-8 w-10 items-center justify-center text-[#00000066]'
        >
          <IoIosArrowBack />
        </Link>
      )}
      {renderPaginate()}
      {pages === pageSize ? (
        <span className='ml-5 flex h-8 w-10 cursor-not-allowed items-center justify-center text-[#00000066]'>
          <IoIosArrowForward />
        </span>
      ) : (
        <Link
          to={{
            pathname: Path.Home,
            search: createSearchParams({
              ...queryConfig,
              page: (pages + 1).toString()
            }).toString()
          }}
          className='ml-5 flex h-8 w-10 items-center justify-center text-[#00000066]'
        >
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  )
}
