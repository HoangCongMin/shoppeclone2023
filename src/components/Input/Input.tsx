import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface inputProp extends InputHTMLAttributes<HTMLInputElement> {
  Rules?: RegisterOptions
  errors?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  classNameError?: string
  classNamediv?: string
}

export default function Input({
  className,
  Rules,
  errors,
  register,
  name,
  classNameError,
  classNamediv,
  ...rest
}: inputProp) {
  const Inptregister = register && name ? register(name, Rules) : {}
  return (
    <div className={classNamediv}>
      <input className={className} {...Inptregister} {...rest} />
      <div className={classNameError}>{errors}</div>
    </div>
  )
}
