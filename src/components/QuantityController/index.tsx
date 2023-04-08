import rest from 'lodash/rest'
import React, { useState } from 'react'
import { AiOutlineMinus } from 'react-icons/ai'
import { GrFormAdd } from 'react-icons/gr'
import InputNumber, { inputProp } from '../InputNumber/InputNumBer'

interface PropQuantityController extends inputProp {
  max?: number
  onInputChange?: (valueItem: number) => void
  onAddNumber?: (valueItem: number) => void
  oneMinusOne?: (valueItem: number) => void
  onFocusOne?: (valueItem: number) => void
}

export default function QuantityController({
  max,
  onInputChange,
  onAddNumber,
  oneMinusOne,
  onFocusOne,
  value,
  ...rest
}: PropQuantityController) {
  const [valueQuantity, setValueQuantity] = useState<number>(Number(value) || 0)

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    }
    onInputChange && onInputChange(_value)
    setValueQuantity(_value)
  }

  const handleAdd = () => {
    let addValue = valueQuantity + 1
    if (max !== undefined && addValue > max) {
      addValue = max
    }
    onAddNumber && onAddNumber(addValue)
    setValueQuantity(addValue)
  }

  const handleMinusOne = () => {
    let minusOne = valueQuantity - 1
    if (minusOne < 1) {
      minusOne = 1
    }
    oneMinusOne && oneMinusOne(minusOne)
    setValueQuantity(minusOne)
  }

  const handleOnFocusOne = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const _value = Number(e.target.value)
    onFocusOne && onFocusOne(_value)
  }

  return (
    <div className='flex '>
      <button onClick={handleMinusOne} className='border-1 flex h-8 w-8 items-center justify-center border'>
        <AiOutlineMinus />
      </button>
      <InputNumber
        classNameError='hidden'
        className='h-8 w-14 border border-x-0 text-center outline-none'
        type='text'
        value={value || valueQuantity}
        onChange={handleOnchange}
        onBlur={handleOnFocusOne}
        {...rest}
      />
      <button onClick={handleAdd} className='border-1 flex h-8 w-8 items-center justify-center border'>
        <GrFormAdd />
      </button>
    </div>
  )
}
