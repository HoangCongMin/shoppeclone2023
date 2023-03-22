import axios, { AxiosError } from 'axios'

// ép kiểu lỗi AxiosError
export function axiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function fomatMoney(number: number) {
  return new Intl.NumberFormat('de-DE').format(number)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function saleUtil(price: number, priceSale: number) {
  return Math.round(((price - priceSale) / price) * 100) + '%'
}
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const getParamSeo = ({ name, id }: { name: string; id: string }) =>
  removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`

export const allAPIid = (nameid: string) => {
  const arr = nameid.split('-i-')
  return arr[arr.length - 1]
}
