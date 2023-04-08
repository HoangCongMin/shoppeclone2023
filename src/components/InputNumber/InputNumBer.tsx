import { InputHTMLAttributes, forwardRef, useState } from 'react'
// import { RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface inputProp extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string
  classNameError?: string
  classNameDiv?: string
}
const InputNumber = forwardRef<HTMLInputElement, inputProp>(function InputtypeNumber(
  { className, errors, classNameError, classNameDiv, value = '', onChange, ...rest },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(e)
      setLocalValue(value)
    }
  }
  return (
    <div className={classNameDiv}>
      <input className={className} onChange={handleChange} value={value || localValue} ref={ref} {...rest} />
      <div className={classNameError}>{errors}</div>
    </div>
  )
})

export default InputNumber
