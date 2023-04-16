import Input from '../../../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { userSchema, UserSchema } from '../../../../utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { updateMe } from '../../../../apis/user.api'
import { toast } from 'react-toastify'
import omit from 'lodash/omit'
import { axiosError } from '../../../../utils/util'
import { resPonseApi } from '../../../../types/utils.type'
import { useTranslation } from 'react-i18next'

type FromData = Pick<UserSchema, 'confirm_password' | 'password' | 'new_password'>
const DataUserSchema = userSchema.pick(['confirm_password', 'password', 'new_password'])

export default function ChangePassWord() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset
  } = useForm<FromData>({
    defaultValues: {
      confirm_password: '',
      password: '',
      new_password: ''
    },
    resolver: yupResolver(DataUserSchema)
  })

  const ChangePassWordMutation = useMutation({
    mutationFn: updateMe
  })
  const handleChangePassWord = handleSubmit(async (data) => {
    try {
      const res = await ChangePassWordMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (axiosError<resPonseApi<FromData>>(error) && error.response?.status === 422) {
        const errorChangePassWord = error.response.data.data
        if (errorChangePassWord) {
          Object.keys(errorChangePassWord).forEach((item) =>
            setError(item as keyof FromData, { message: errorChangePassWord[item as keyof FromData], type: 'server' })
          )
        }
      }
    }
  })

  const { t } = useTranslation('user')

  return (
    <div className='w-full bg-white pb-6'>
      <div className='m-auto w-[95%]'>
        <div className='border-b border-slate-200 py-5'>
          <h1 className='text-lg font-medium	text-[#333]	'>{t('User:User.Add password')}</h1>
          <div className='text-sm text-[#555]'>
            {t('User:User.For account security, please do not share your password with others')}
          </div>
        </div>
        <div className='mt-5 flex items-center'>
          <form className='w-[80%]' onSubmit={handleChangePassWord}>
            <div className='relative m-auto mt-5 flex w-[70%] items-center justify-between'>
              <div className='w-[25%] text-right text-sm text-[#757575] max-[1000px]:hidden'>
                {t('User:User.New password')}
              </div>
              <Input
                classNameDiv='w-[70%] h-10 rounded-sm border border-gray-300 max-[1000px]:w-full'
                className='h-full w-full p-2 outline-none'
                placeholder={`${t('User:User.New password')}`}
                register={register}
                name='new_password'
                type={'password'}
                errors={errors.new_password?.message}
              />
            </div>
            <div className='relative m-auto mt-5 flex w-[70%] items-center justify-between'>
              <div className='w-[25%] text-right text-sm text-[#757575] max-[1000px]:hidden'>
                {t('User:User.Confirm password')}
              </div>
              <Input
                classNameDiv='w-[70%] h-10 rounded-sm border border-gray-300 max-[1000px]:w-full '
                className='h-full w-full p-2 outline-none'
                placeholder={`${t('User:User.Confirm password')}`}
                register={register}
                name='confirm_password'
                type={'password'}
                errors={errors.confirm_password?.message}
              />
            </div>
            <div className='relative m-auto mt-5 flex w-[70%] items-center justify-between'>
              <div className=' w-[25%] text-right text-sm text-[#757575] max-[1000px]:hidden'>
                {t('User:User.old password')}
              </div>
              <Input
                classNameDiv='w-[70%] h-10 rounded-sm border border-gray-300 max-[1000px]:w-full'
                className='h-full w-full p-2 outline-none'
                placeholder={`${t('User:User.old password')}`}
                register={register}
                name='password'
                type={'password'}
                errors={errors.password?.message}
              />
            </div>
            <div className='m-auto mt-6 flex w-[70%] justify-between'>
              <div className='w-[25%]'></div>
              <div className='w-[70%]'>
                <button type='submit' className='  h-10 w-24 cursor-pointer rounded  bg-orange text-sm text-[#fff]'>
                  {t('User:User.Confirm')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
