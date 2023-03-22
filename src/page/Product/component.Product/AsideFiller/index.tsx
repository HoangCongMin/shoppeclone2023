import { TfiMenuAlt } from 'react-icons/tfi'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { MdPlayArrow } from 'react-icons/md'
import Button from '../../../../components/Button'
import InputNumber from '../../../../components/InputNumber/InputNumBer'
import categories from '../../../../types/categories.type'
import { QueryConfig } from '../../index'
import Path from '../../../../constants/path'
import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { schema, Schema } from '../../../../utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { NonUnderfile } from '../../../../types/utils.type'
import Rateting from '../rateting'
import { omit } from 'lodash'
import InputV2 from '../../../../components/InputV2'

interface Props {
  dataCategories: categories[]
  queryConfig: QueryConfig
}

type FormData = NonUnderfile<Pick<Schema, 'price_max' | 'price_min'>>

const priceschema = schema.pick(['price_max', 'price_min'])
export default function AsideFiller({ dataCategories, queryConfig }: Props) {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceschema)
  })

  const Navigate = useNavigate()

  const submit = handleSubmit((data) =>
    Navigate({
      pathname: Path.Home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  )

  const handleRemoveall = () =>
    Navigate({
      pathname: Path.Home,
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'rating_filter', 'category'])).toString()
    })

  return (
    <div className='w-[15.7%]'>
      <div className='mb-[10px] flex h-14 items-center border-b	'>
        <TfiMenuAlt />
        <Link className='ml-3 text-lg font-bold' to='/'>
          Tất cả danh mục
        </Link>
      </div>
      <ul className='border-b	pb-5'>
        {dataCategories.map((item) => (
          <li
            key={item._id}
            className={classNames('flex items-center py-[8px] pl-3 pr-2.5 text-sm font-bold	', {
              'text-orange': item._id === queryConfig.category
            })}
          >
            <Link
              className='relative flex items-center pl-1'
              to={{
                pathname: Path.Home,
                search: createSearchParams({
                  ...queryConfig,
                  category: item._id
                }).toString()
              }}
            >
              {item._id === queryConfig.category && (
                <MdPlayArrow className='absolute top-1 left-[-13px] h-3 w-3 fill-orange' />
              )}

              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className='border-b	py-5'>
        <h3 className='mb-[10px]	font-medium'>Khoảng Giá</h3>
        <form className='mt-5 mb-2.5 flex items-center justify-between'>
          <Controller
            name='price_min'
            control={control}
            render={({ field }) => (
              <InputNumber
                className='h-8 w-full rounded border-[1px]	border-solid border-slate-300	px-2 outline-none'
                classNamediv='w-[43%]'
                type='text'
                placeholder='₫ TỪ'
                onChange={(e) => field.onChange(e)}
                value={field.value}
                ref={field.ref}
                classNameError='hidden'
              />
            )}
          />
          {/* <InputV2
            name='price_min'
            control={control}
            className='h-8 w-full rounded border-[1px]	border-solid border-slate-300	px-2 outline-none'
            classNamediv='w-[43%]'
            type='number'
            placeholder='₫ TỪ'
            onChange={() => {
              trigger('price_max')
            }}
            classNameError='hidden'
          /> */}

          <div className='h-[1px] w-[5%] border-b  border-solid border-stone-400'></div>
          <Controller
            name='price_max'
            control={control}
            render={({ field }) => (
              <InputNumber
                className='h-8 w-full rounded border-[1px]	border-solid border-slate-300	px-2 outline-none'
                classNamediv='w-[43%]'
                type='text'
                placeholder='₫ ĐẾN'
                onChange={(e) => field.onChange(e)}
                value={field.value}
                ref={field.ref}
                classNameError='hidden'
              />
            )}
          />
        </form>
        {errors.price_min?.message && (
          <div className='mt-1 min-h-[1rem] text-sm text-red-500'>{errors.price_min?.message}</div>
        )}
        <Button
          onClick={submit}
          type='submit'
          className={'mt-5 mb-5 flex w-full  items-center justify-center bg-orange pt-2 pb-2 text-white'}
        >
          {' '}
          Áp dụng{' '}
        </Button>
      </div>
      <div className='	py-5'>
        <h3 className='mb-2.5	text-[15px] font-medium	'>Theo Danh Mục</h3>
        <ul className=' w-4/5'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <li key={index} className='flex items-center justify-between'>
                <Rateting queryConfig={queryConfig} item={index} />
                <div className='text-sm'>{index !== 0 && 'trở lên'}</div>
              </li>
            ))}
        </ul>
        <Button
          onClick={handleRemoveall}
          className={'mt-6 mb-5 flex w-full  items-center justify-center bg-orange pt-2 pb-2 text-white'}
        >
          xoá tất cả
        </Button>
      </div>
    </div>
  )
}
