import { rest } from 'lodash'
import React, { useState } from 'react'
import { AiOutlineMinus } from 'react-icons/ai'
import { GrFormAdd } from 'react-icons/gr'
import InputNumber, { inputProp } from '../InputNumber/InputNumBer'

interface PropQuantityController extends inputProp {
  max?: number
  onInputchange?: (valueItem: number) => void
  onAddNumber?: (valueItem: number) => void
  onMinusone?: (valueItem: number) => void
  onForcos?: (valueItem: number) => void
}

export default function QuantityController({
  max,
  onInputchange,
  onAddNumber,
  onMinusone,
  onForcos,
  value,
  ...rest
}: PropQuantityController) {
  const [valueQuantity, setValueQuantity] = useState<number>(Number(value) || 0)

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    }
    onInputchange && onInputchange(_value)
    setValueQuantity(_value)
  }

  const handleadd = () => {
    let addvalue = valueQuantity + 1
    if (max !== undefined && addvalue > max) {
      addvalue = max
    }
    onAddNumber && onAddNumber(addvalue)
    setValueQuantity(addvalue)
  }

  const handleminusone = () => {
    let minusone = valueQuantity - 1
    if (minusone < 1) {
      minusone = 1
    }
    onMinusone && onMinusone(minusone)
    setValueQuantity(minusone)
  }

  const handleonForcos = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const _value = Number(e.target.value)
    onForcos && onForcos(_value)
  }

  return (
    <div className='flex '>
      <button onClick={handleminusone} className='border-1 flex h-8 w-8 items-center justify-center border'>
        <AiOutlineMinus />
      </button>
      <InputNumber
        classNameError='hidden'
        className='h-8 w-14 border border-x-0 text-center outline-none'
        type='text'
        value={value || valueQuantity}
        onChange={handleOnchange}
        onBlur={handleonForcos}
        {...rest}
      />
      <button onClick={handleadd} className='border-1 flex h-8 w-8 items-center justify-center border'>
        <GrFormAdd />
      </button>
    </div>
  )
}
