import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

interface Prop {
  ratingItem: number
  classNameStarColor: string
  classNameStartWhite: string
}
export default function Rating({ ratingItem, classNameStarColor, classNameStartWhite }: Prop) {
  const handleWidth = (index: number) => {
    if (index <= ratingItem) {
      return '100%'
    }
    if (index > ratingItem && index - ratingItem < 1) {
      return (ratingItem - Math.floor(ratingItem)) * 100 + '%'
    }
    return '0%'
  }
  return (
    <div className='flex'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div className='absolute top-0 left-0 h-full overflow-hidden ' style={{ width: handleWidth(index + 1) }}>
              <AiFillStar className={classNameStarColor} />
            </div>
            <AiOutlineStar className={classNameStartWhite} />
          </div>
        ))}
    </div>
  )
}
