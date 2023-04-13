import { InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

interface inputProp extends InputHTMLAttributes<HTMLInputElement> {
  Rules?: RegisterOptions
  errors?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  classNameError?: string
  classNameDiv?: string
}

export default function Input({
  className,
  Rules,
  errors,
  register,
  name,
  classNameError,
  classNameDiv,
  placeholder,
  ...rest
}: inputProp) {
  const Inptregister = register && name ? register(name, Rules) : {}

  const [eye, setEye] = useState(false)

  const handleEye = () => {
    setEye((pre) => !pre)
  }

  const handleType = () => {
    if (rest.type === 'password') {
      return eye ? 'text' : 'password'
    }
    return rest.type
  }
  return (
    <div className={classNameDiv}>
      <input placeholder={placeholder} className={className} {...Inptregister} {...rest} type={handleType()} />
      <div className={classNameError}>{errors}</div>
      {rest.type === 'password' && eye && (
        <AiFillEye onClick={handleEye} className='absolute right-1 top-3 text-orange' />
      )}
      {rest.type === 'password' && !eye && (
        <AiFillEyeInvisible onClick={handleEye} className='absolute right-1 top-3 text-orange' />
      )}
    </div>
  )
}
