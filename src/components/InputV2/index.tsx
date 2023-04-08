import { InputHTMLAttributes, useState } from 'react'
import { useController, UseControllerProps, FieldValues, FieldPath } from 'react-hook-form'

type InputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameError: string
  classNameDiv: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

export default function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputProp<TFieldValues, TName>) {
  const { classNameDiv, className, classNameError, value = '', type, onChange, ...rest } = props
  const { field, fieldState } = useController(props)

  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fromValue = e.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(fromValue) || fromValue === '')
    if (numberCondition) {
      setLocalValue(fromValue)
      field.onChange(e)
      onChange && onChange(e)
    }
  }
  return (
    <div className={classNameDiv}>
      <input {...field} {...rest} className={className} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
