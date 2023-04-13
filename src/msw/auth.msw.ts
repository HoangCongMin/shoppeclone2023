import { rest } from 'msw'
import { URL_LOGIN, URL_REFRESH_TOKEN, URL_LOGOUT } from '../apis/auth.api'

const auth_Login = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0xMlQwODoyOTozNC40NTBaIiwiaWF0IjoxNjgxMjg4MTc0LCJleHAiOjE2ODIyODgxNzN9.nNSx40PSSnk9T4iUiLfRz5VHMy_2SUohPo-n2nHQcWc',
    expires: 999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0xMlQwODoyOTozNC40NTBaIiwiaWF0IjoxNjgxMjg4MTc0LCJleHAiOjE2ODk5MjgxNzR9.aa_Eu-fyqdUyaWWSb6WyVI1TKxDFxYrIMe20DpPHSKs',
    expires_refresh_token: 8640000,
    user: {
      _id: '63fde04c6d7c620340852977',
      roles: ['User'],
      email: 'mh@gmail.com',
      createdAt: '2023-02-28T11:06:52.940Z',
      updatedAt: '2023-03-31T12:12:13.572Z',
      __v: 0,
      date_of_birth: '2007-12-31T17:00:00.000Z',
      phone: '0973201885',
      address: 'thai nguyen lam',
      name: 'minhden',
      avatar: '38000a82-9a8c-4d21-aee4-0daebe0203c3.jpg'
    }
  }
}

export const token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0xMlQxMjozMzoxOS41MzNaIiwiaWF0IjoxNjgxMzAyNzk5LCJleHAiOjE2ODEzMDI4MDB9.MIF7TDpxrVE6R_MzI7-9raQke_Z3_XUD9oESyrUyIyc'

export const refresh_token_all =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0xMlQxMjozMzoxOS41MzNaIiwiaWF0IjoxNjgxMzAyNzk5LCJleHAiOjE2ODk5NDI3OTl9.LwiWqLlVDWcIqafBxOIyYL9oJ0CSPPWFMuSFKpfzy0Q'

const refresh_tokenOk = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0xMlQxMjozODoyMi4wNjNaIiwiaWF0IjoxNjgxMzAzMTAyLCJleHAiOjE2ODE5MDc5MDJ9.8rKCyhtgaS-vPtf3To3JtS5JBZfufw_D_4mc9UYZ1G8'
  }
}

export const token_all =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0xM1QwODowMDo1OS40ODVaIiwiaWF0IjoxNjgxMzcyODU5LCJleHAiOjE2ODIzNzI4NTh9.Xht5hAQViQqGiZR9zcfBu1515uwK90XE8S33uGDE-bQ'

const handleLogOutTest = {
  message: 'Đăng xuất thành công'
}

const restHandlers = rest.post(`https://api-ecom.duthanhduoc.com/${URL_LOGIN}`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(auth_Login))
})

const restHandlersRefresh_token = rest.post(
  `https://api-ecom.duthanhduoc.com/${URL_REFRESH_TOKEN}`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(refresh_tokenOk))
  }
)

const handleLogOut = rest.post(`https://api-ecom.duthanhduoc.com/${URL_LOGOUT}`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(handleLogOutTest))
})

const authRequests = [restHandlers, restHandlersRefresh_token, handleLogOut]

export default authRequests
