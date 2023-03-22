import Path from '../../../../constants/path'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { createSearchParams, Link } from 'react-router-dom'
import { QueryConfig } from '../../index'

interface Prop {
  item: number
  queryConfig: QueryConfig
}
export default function Rateting({ item, queryConfig }: Prop) {
  // const navigate = useNavigate()
  return (
    <div className='flex w-[65%] items-center justify-between'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Link
            to={{
              pathname: Path.Home,
              search: createSearchParams({
                ...queryConfig,
                rating_filter: String(5 - item)
              }).toString()
            }}
            key={index}
          >
            {index < 5 - item ? (
              <AiFillStar className='text-yellow-300' />
            ) : (
              <AiOutlineStar className='text-yellow-300' />
            )}
          </Link>
        ))}
    </div>
  )
}
