import AsideFiller from './component.Product/AsideFiller'
import ProductLists from './component.Product/ProductList'
import SortProduct from './component.Product/SortProduct'
import { useQuery } from '@tanstack/react-query'
import { getProductList } from '../../apis/product.api'
import useQueryParam from '../../Hook/useQueryParam'
import { Product, ProductConfig } from '../../types/productList.type'
import Paginate from '../../components/Paginate'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { getCategories } from '../../apis/categories.api'
import { Helmet } from 'react-helmet'

export type QueryConfig = {
  [key in keyof ProductConfig]: string
}
export default function Products() {
  const queryParem: ProductConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParem.page || '1',
      limit: queryParem.limit || '30',
      order: queryParem.order,
      sort_by: queryParem.sort_by,
      category: queryParem.category,
      exclude: queryParem.exclude,
      rating_filter: queryParem.rating_filter,
      price_max: queryParem.price_max,
      price_min: queryParem.price_min,
      name: queryParem.name
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['Product', queryConfig],
    queryFn: () => {
      return getProductList(queryConfig as ProductConfig)
    },
    keepPreviousData: true
  })

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  return (
    <div className='w-full bg-zinc-100	'>
      <Helmet>
        <title>Product Item</title>
      </Helmet>
      <div className=' m-auto flex w-[84.5%] max-w-screen-2xl justify-between	'>
        <AsideFiller queryConfig={queryConfig} dataCategories={dataCategories?.data.data || []} />
        <div className='w-[82.4%]'>
          <SortProduct queryConfig={queryConfig} pageSize={data?.data.data?.pagination?.page_size || 1} />
          <div>
            <div className='mt-6 grid grid-cols-5 gap-2.5	'>
              {data?.data.data?.products.map((item: Product) => (
                <div key={item._id}>
                  <ProductLists itemAll={item} />
                </div>
              ))}
            </div>
          </div>
          <Paginate
            // data={data?.data.data?.pagination?.page || 1}
            queryConfig={queryConfig}
            pageSize={data?.data.data?.pagination?.page_size || 1}
          />
        </div>
      </div>
    </div>
  )
}
