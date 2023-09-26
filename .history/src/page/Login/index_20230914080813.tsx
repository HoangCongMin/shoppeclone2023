/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import Register from '../../layout/register'
// import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { Schema, schema } from '../../utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/Input/Input'
import { RegisterApi, LoginApi } from '../../apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { axiosError } from '../../utils/util'
import { resPonseApi } from '../../types/utils.type'
import { myCreateContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Path from '../../constants/path'
import { Helmet } from 'react-helmet'
import { user } from '../../types/user.type'

type FromData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const logInSchema = schema.pick(['email', 'password'])
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Login() {
  const Navigate = useNavigate()
  const { setLoginAndRegister, isRegister0k, setIsRegister0k,setProfileUser ,profileUser} = useContext(myCreateContext)
  // const [registerItem, setRegisterItem] = useState(false)
  const dynamicLogin = isRegister0k ? registerSchema : logInSchema
  const {
    register,
    handleSubmit,
    // getValues,
    setError,
    formState: { errors }
  } = useForm<FromData>({ resolver: yupResolver(dynamicLogin) })

  const handleRegister = () => {
    setIsRegister0k(!isRegister0k)
  }
  // const Rules=getRules(getValues)


  const mutation = useMutation({
    mutationFn: (body: Omit<FromData, 'confirm_password'>) => {
      return isRegister0k ? RegisterApi(body) : LoginApi(body)
    }
  })
  const handleClick = handleSubmit((data) => {
    if (isRegister0k) {
      mutation.mutate(omit(data, ['confirm_password']), {
        onSuccess: () => {
          setLoginAndRegister(true), Navigate(Path.Home)
        },
        onError: (errors) => {
          // sử lý lỗi ép kiểu axiosError
          // console.log(errors)
          if (axiosError<resPonseApi<Omit<FromData, 'confirm_password'>>>(errors) && errors.response?.status === 422) {
            const fromError = errors.response.data.data
            if (fromError) {
              Object.keys(fromError).forEach((key) =>
                setError(key as keyof Omit<FromData, 'confirm_password'>, {
                  type: 'server',
                  message: fromError[key as keyof Omit<FromData, 'confirm_password'>]
                })
              )
            }
            // return setError('email', {
            //   type: 'server',
            //   message: errors.response.data.data?.email
            // })
          }
          return null
        }
      })
    } else {
      mutation.mutate(data, {
        onSuccess: (data) => {
          console.log(data)
          setLoginAndRegister(true),setProfileUser(data.data.data?.user as user), Navigate(Path.Home)
        },
        onError: (errors) => {
          // sử lý lỗi ép kiểu axiosError

          if (axiosError<resPonseApi<FromData>>(errors) && errors.response?.status === 422) {
            const fromError = errors.response.data.data
            if (fromError) {
              Object.keys(fromError).forEach((key) =>
                setError(key as keyof FromData, {
                  type: 'server',
                  message: fromError[key as keyof FromData]
                })
              )
            }
            // return setError('email', {
            //   type: 'server',
            //   message: errors.response.data.data?.email
            // })
          }
          return null
        }
      })
    }
  })

  // console.log(errors)

  // const errorFroms = useMemo(() => {
  //  const errormutation=mutation.error
  //  if(errormutation.response?.status === 422){
  //   return errormutation.response?.data.error
  //  }
  //  return null
  // }, [mutation.error])

  // console.log(profileUser)

  const textValue = isRegister0k ? 'Bạn đã có tài khoản?' : 'Bạn mới biết đến Shopee?'

  return (
    <div className='w-full bg-orange'>
      <Helmet>
        <title>đăng nhập</title>
      </Helmet>
      <div className='m-auto grid w-4/5 max-w-screen-2xl grid-cols-5 py-12 	'>
        <div className='col-span-2 col-start-4 my-2.5	bg-white max-[950px]:col-span-3 max-[700px]:col-span-5'>
          <form onSubmit={handleClick} className='	m-auto w-4/5'>
            <div className='mt-5 text-2xl'>{isRegister0k ? 'đăng ký' : 'đăng nhập'}</div>
            <Input
              classNameError={'mt-1 min-h-[1rem] text-sm text-red-500'}
              className={'mt-5 w-full border bg-white p-2 outline-0 outline-black '}
              name={'email'}
              type={'text'}
              placeholder={'email'}
              // Rules={Rules.email}
              errors={errors.email?.message}
              register={register}
            />
            <Input
              classNameDiv={'relative'}
              classNameLogin={'top-5'}
              classNameError={'mt-1 min-h-[1rem] text-sm text-red-500'}
              className={'mt-2 w-full border  bg-white p-2 outline-0	outline-black '}
              name={'password'}
              type={'password'}
              placeholder={'password'}
              // Rules={Rules.password}
              errors={errors.password?.message}
              register={register}
            />

            {isRegister0k && (
              <Input
                classNameError={'mt-1 min-h-[1rem] text-sm text-red-500'}
                className={'mt-2 w-full border  bg-white p-2 outline-0 outline-black	'}
                name={'confirm_password'}
                type={'password'}
                placeholder={'confirm password'}
                //  Rules={Rules.confirm_password}
                classNameDiv={'relative'}
                classNameLogin={'top-[1.25rem]'}
                errors={errors.confirm_password?.message}
                register={register}
              />

              // <>
              //   <input
              //     type='password'
              //     className='mt-2 w-full border  bg-white p-2 outline-0 outline-black	'
              //     placeholder='confirm password'
              //     {...register('confirm_password', Rules.confirm_password)}
              //   />
              //   <div className='mt-1 min-h-[1rem] text-sm text-red-500'>{errors.confirm_password?.message}</div>
              // </>
            )}

            <div className='w-full'>
              <Button
                type='submit'
                isLoading={mutation.isLoading}
                disabled={mutation.isLoading}
                className={'mt-3 mb-5 flex w-full  items-center justify-center bg-orange pt-2 pb-2 text-white'}
              >
                {isRegister0k ? 'dang ky' : 'dang nhap'}
              </Button>
            </div>
            <div className='mb-5 flex w-full items-center'>
              <div className='w-2/5 border'></div>
              <div className='w-1/5 text-center text-xs text-gray-400'>HOẶC</div>
              <div className='w-2/5 border'></div>
            </div>
            <div className='mb-4 text-center text-gray-400'>
              {textValue}
              <span onClick={handleRegister} className='text-orange'>
                {' '}
                {isRegister0k ? 'đăng nhập' : 'đăng ký'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
