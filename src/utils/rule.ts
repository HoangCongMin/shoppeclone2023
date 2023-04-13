import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

import { AnyObject } from 'yup'

type rule = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues: UseFormGetValues<any>): rule => ({
  email: {
    required: {
      value: true,
      message: 'email la bat buoc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'email khong dung dinh dang'
    },
    maxLength: {
      value: 160,
      message: 'do dai email tu 5 - 160'
    },
    minLength: {
      value: 5,
      message: 'do dai email tu 5 - 160'
    }
  },
  password: {
    required: {
      value: true,
      message: 'password la bat buoc'
    },
    maxLength: {
      value: 160,
      message: 'do dai email tu 5 - 160'
    },
    minLength: {
      value: 5,
      message: 'do dai email tu 5 - 160'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'confirm_password la bat buoc'
    },
    maxLength: {
      value: 160,
      message: 'do dai email tu 5 - 160'
    },
    minLength: {
      value: 5,
      message: 'do dai email tu 5 - 160'
    },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'nhap lai mk hop le' : undefined
  }
})

function priceminmax(this: yup.TestContext<AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('email la bat buoc')
    .min(5, 'do dai email tu 5 - 160')
    .max(160, 'do dai email tu 5 - 160')
    .email('email khong dung dinh dang'),
  password: yup
    .string()
    .required('password la bat buoc')
    .min(5, 'do dai password tu 5 - 160')
    .max(160, 'do dai password tu 5 - 160'),
  confirm_password: yup
    .string()
    .required('password la bat buoc')
    .min(5, 'do dai email tu 5 - 160')
    .max(160, 'do dai email tu 5 - 160')
    .oneOf([yup.ref('password')], 'nhap lai mk hop le'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'gia khong phu hop',

    test: priceminmax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'gia khong phu hop',

    test: priceminmax
  }),
  search: yup.string().required('ten san pham la bat buoc').trim()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'toi da 160 ky tu'),
  phone: yup.string().max(20, 'toi da 20 ky tu'),
  address: yup.string().max(160, 'toi da 160 ky tu'),
  date_of_birth: yup.date().max(new Date(), 'hay chon 1 ngay trong qua khu'),
  avatar: yup.string().max(1000, 'toi da 1000 ky tu'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: yup
    .string()
    .required('password la bat buoc')
    .min(5, 'do dai email tu 5 - 160')
    .max(160, 'do dai email tu 5 - 160')
    .oneOf([yup.ref('confirm_password')], 'nhap lai mk hop le') as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
})

// kế thừa type của schema
export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
