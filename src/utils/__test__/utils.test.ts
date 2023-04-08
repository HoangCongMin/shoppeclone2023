import { AxiosError } from 'axios'
import { describe, it, expect } from 'vitest'
import { axiosError, formatNumberToSocialStyle, formatMoney, saleUtil, getParamSeo, allAPIid, setImage } from '../util'

describe('axiosError', () => {
  it('axiosError tra ve boolean', () => {
    expect(axiosError(new Error())).toBe(false)
  })
  it('axiosError tra ve boolean', () => {
    expect(axiosError(new AxiosError())).toBe(true)
  })
})

describe('formatNumberToSocialStyle', () => {
  it('formatNumberToSocialStyle tra ve string', () => {
    expect(formatNumberToSocialStyle(100000)).toBe('100k')
  })
})

describe('formatMoney', () => {
  it('formatMoney tra ve string', () => {
    expect(formatMoney(100000)).toBe('100.000')
  })
})

describe('saleUtil', () => {
  it('saleUtil tra ve string', () => {
    expect(saleUtil(100000, 80000)).toBe('20%')
  })
})

describe('getParamSeo', () => {
  it('getParamSeo tra ve string', () => {
    expect(getParamSeo({ name: 'dienthoai', id: '1' })).toBe('dienthoai-i-1')
  })
})

describe('allAPIid', () => {
  it('allAPIid tra ve string', () => {
    expect(allAPIid('m-i-1')).toBe('1')
  })
})

describe('setImage', () => {
  it('setImage tra ve string', () => {
    expect(setImage('image')).toBe('https://api-ecom.duthanhduoc.com/images/image')
  })
})
