import { describe, it, expect } from 'vitest'
import { renderRouter, result } from '../../utils/testUtil'

describe('ProductDetails', () => {
  it('ProductDetails Snapshots', async () => {
    renderRouter({ Path: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' })
    await result(5000)
    expect(document.body).toMatchSnapshot()
  })
})
