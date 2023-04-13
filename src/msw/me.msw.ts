import { rest } from 'msw'
import { token_1s } from './auth.msw'

const resMe = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '63fde04c6d7c620340852977',
    roles: ['User'],
    email: 'mh@gmail.com',
    createdAt: '2023-02-28T11:06:52.940Z',
    updatedAt: '2023-03-31T12:12:13.572Z',
    date_of_birth: '2007-12-31T17:00:00.000Z',
    phone: '0973201885',
    address: 'thai nguyen lam',
    name: 'minhden',
    avatar: '38000a82-9a8c-4d21-aee4-0daebe0203c3.jpg'
  }
}
const restHandlersMe = [
  rest.get(`https://api-ecom.duthanhduoc.com/${'me'}`, (req, res, ctx) => {
    if (req.headers.get('authorization') === token_1s) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Lỗi',
          data: {
            message: 'Token hết hạn',
            name: 'EXPIRED_TOKEN'
          }
        })
      )
    }
    return res(ctx.status(200), ctx.json(resMe))
  })
]

export default restHandlersMe
