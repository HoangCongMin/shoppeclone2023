import { describe, it, expect, beforeEach } from 'vitest'
import { Http } from '../http'
import { setLocalStorage, setLocalStorageReFreshToken } from '../../utils/auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0wOFQxNjoyMzo0OC45NTNaIiwiaWF0IjoxNjgwOTcxMDI4LCJleHAiOjE2ODA5NzEwMjl9.Pte1MEkjepzR-gn3cI24ODp6bviGbTKZakMQsNTzSYQ'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0wOFQxNjoyMzo0OC45NTNaIiwiaWF0IjoxNjgwOTcxMDI4LCJleHAiOjE2ODk2MTEwMjh9.qfsShaAnban7JJYpAdqp2PG6qwgpc65mEq9iBoNpLSA'
describe('axios test', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  it('get api', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(200)
  })
  it('login is ok', async () => {
    await http.post('login', { email: 'mh@gmail.com', password: 'minh123456789' })
    const res = await http.get('me')

    expect(res.status).toBe(200)
  })

  it('refresh_token is', async () => {
    setLocalStorage(access_token)
    setLocalStorageReFreshToken(refresh_token)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    console.log(res.config.headers.authorization)
    expect(res.status).toBe(200)
  })
  it('logout is ok', async () => {
    await http.post('login', { email: 'mh@gmail.com', password: 'minh123456789' })
    const res = await http.post('logout')
    expect(res.status).toBe(200)
  })
})
