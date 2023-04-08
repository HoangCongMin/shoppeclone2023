import { BiSearch } from 'react-icons/bi'

import classNames from 'classnames'
import useSreach from '../../Hook/useSreach'

interface props {
  classNameBorder?: string
  classButton?: string
}

export default function Seacrh({ classNameBorder, classButton }: props) {
  const { register, handleSearch } = useSreach()

  return (
    <form onSubmit={handleSearch} className={classNames(`flex items-center bg-white  ${classNameBorder}`)}>
      <input {...register('search')} className='h-8 w-11/12 px-2 outline-none' type='text' placeholder='search' />
      <button
        type='submit'
        className={classNames(`flex h-8 w-1/12 flex-col items-center bg-orange pt-2 ${classButton}`)}
      >
        <BiSearch className='fill-white' />
      </button>
    </form>
  )
}
