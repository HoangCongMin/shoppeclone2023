import React, { useState } from 'react'
import range from 'lodash/range'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMasage?: string
}
export default function SelectFrom({ onChange, value, errorMasage }: Props) {
  const [dateState, setDateState] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = {
      date: value?.getDate() || 1,
      month: value?.getMonth() || 0,
      year: value?.getFullYear() || 1990,
      [e.target.name]: e.target.value
    }

    setDateState(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex w-[75%] justify-between max-[900px]:w-[100%]'>
      <div className='h-10 w-[32%] rounded-sm border border-gray-300'>
        <select name='date' onChange={handleChange} value={value?.getDate() || dateState.date} className='w-full'>
          <option disabled>Ngày</option>
          {range(1, 32).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className='h-10 w-[32%] rounded-sm border border-gray-300'>
        <select name='month' onChange={handleChange} value={value?.getMonth() || dateState.month} className='w-full'>
          <option disabled>Thang</option>
          {range(0, 12).map((item) => (
            <option value={item} key={item}>
              {item + 1}
            </option>
          ))}
        </select>
      </div>
      <div className='h-10 w-[32%] rounded-sm border border-gray-300'>
        <select name='year' onChange={handleChange} value={value?.getFullYear() || dateState.year} className='w-full'>
          <option disabled>Nam</option>
          {range(1990, 2024).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>{errorMasage}</div>
    </div>
  )
}
