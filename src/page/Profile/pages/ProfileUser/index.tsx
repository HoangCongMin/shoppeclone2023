import React, { useEffect, useContext, useRef, useState, useMemo } from 'react'
import Button from '../../../../components/Button'
import { userSchema, UserSchema } from '../../../../utils/rule'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getUser, updateMe, upLoad_Avatar } from '../../../../apis/user.api'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../../../components/Input/Input'
import InputNumBer from '../../../../components/InputNumber/InputNumBer'
import SelectFrom from '../../components/selectFrom'
import { myCreateContext } from '../../../../context/context'
import { setProfile } from '../../../../utils/auth'
import { user } from '../../../../types/user.type'
import { setImage } from '../../../../utils/util'
import { axiosError } from '../../../../utils/util'
import { resPonseApi } from '../../../../types/utils.type'
import UploadAvatar from '../../../../components/UploadAvatar'
import { useTranslation } from 'react-i18next'

type FromData = Pick<UserSchema, 'address' | 'avatar' | 'name' | 'date_of_birth' | 'phone'>
type FromDataError = Omit<FromData, 'date_of_birth'> & { date_of_birth?: string }
const userSchemaItem = userSchema.pick(['address', 'avatar', 'date_of_birth', 'name', 'phone'])

export default function ProfileUser() {
  const { setProfileUser } = useContext(myCreateContext)
  const [file, setFile] = useState<File>()

  const { data, refetch } = useQuery({
    queryKey: ['getUser'],
    queryFn: () => getUser
  })
  const mutation = useMutation({
    mutationFn: updateMe
  })

  const upLoadAvatar = useMutation({
    mutationFn: upLoad_Avatar
  })

  const dataUser = data?.data.data
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
    control,
    watch,
    setError
  } = useForm<FromData>({
    defaultValues: {
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1),
      name: '',
      phone: ''
    },
    resolver: yupResolver(userSchemaItem)
  })

  const avatar = watch('avatar')

  useEffect(() => {
    if (dataUser) {
      setValue('address', dataUser.address),
        setValue('name', dataUser.name),
        setValue('phone', dataUser.phone),
        setValue('date_of_birth', dataUser.date_of_birth ? new Date(dataUser.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [dataUser, setValue])

  const handleFromValue = handleSubmit(async (data) => {
    try {
      let imageItemChange = avatar
      if (file) {
        const imageItem = new FormData()
        imageItem.append('image', file)
        const res = await upLoadAvatar.mutateAsync(imageItem)
        imageItemChange = res.data.data
      }
      const res = await mutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: imageItemChange
      })
      setProfileUser(res.data.data as user)
      setProfile(res.data.data as user)
      refetch()
    } catch (error) {
      if (axiosError<resPonseApi<FromDataError>>(error) && error.response?.status === 422) {
        const fromError = error.response.data.data
        if (fromError) {
          Object.keys(fromError).forEach((key) =>
            setError(key as keyof FromDataError, {
              type: 'server',
              message: fromError[key as keyof FromDataError]
            })
          )
        }
      }
    }
  })



  const { t } = useTranslation('user')
  return (
    <div className='w-full rounded-sm bg-white	pb-6	shadow-sm'>
      <div className='m-auto w-[94%] '>
        <div className='border-b border-slate-200 py-[18px]'>
          <h1 className='text-lg	font-medium capitalize	text-[#333]'>{t('User:User.my profile')}</h1>
          <div className='mt-1 text-sm text-[#555]'>
            {t('User:User.Manage profile information for account security')}
          </div>
        </div>
        <form className='mt-8 flex w-full max-[900px]:flex-col-reverse' onSubmit={handleFromValue}>
          <div className='flex w-[70%] items-center justify-center max-[900px]:w-[100%]'>
            <div className='w-[95%]'>
              <div className='m-auto flex w-[95%] items-center justify-between'>
                <div className='w-[22%] text-right text-sm text-[#555555CC]'>mail</div>
                <div className=' w-[75%] rounded-sm	 '> {dataUser?.email}</div>
              </div>
              <div className='m-auto mt-8 flex w-[95%] items-center justify-between'>
                <div className=' w-[22%] text-right text-sm text-[#555555CC] max-[900px]:hidden'>
                  {t('User:User.user name')}
                </div>
                <Input
                  register={register}
                  name='name'
                  errors={errors.name?.message}
                  type='text'
                  className='h-full w-full  p-3	 outline-none'
                  placeholder={`${t('User:User.user name')}`}
                  classNameDiv='h-10 w-[75%] rounded-sm border border-gray-300 max-[900px]:w-[100%]'
                />
              </div>

              <div className='m-auto mt-8 flex w-[95%] items-center justify-between'>
                <div className='w-[22%] text-right text-sm text-[#555555CC] max-[900px]:hidden'>
                  {t('User:User.Phone number')}
                </div>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumBer
                      type='text'
                      className='h-full w-full  p-3	 outline-none'
                      classNameDiv='h-10 w-[75%] rounded-sm border border-gray-300 max-[900px]:w-[100%]'
                      {...field}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                      errors={errors.phone?.message}
                    />
                  )}
                />
              </div>
              <div className='m-auto mt-8 flex w-[95%] items-center justify-between'>
                <div className='w-[22%] text-right text-sm text-[#555555CC] max-[900px]:hidden'>
                  {t('User:User.Address')}
                </div>
                <Input
                  register={register}
                  errors={errors.address?.message}
                  type='text'
                  name='address'
                  className='h-full w-full  p-3	 outline-none'
                  classNameDiv='h-10 w-[75%] rounded-sm border border-gray-300 max-[900px]:w-[100%]'
                />
              </div>
              <div className='m-auto mt-8 flex w-[95%] items-center justify-between'>
                <div className='w-[22%] text-right text-sm text-[#555555CC] max-[900px]:hidden'>
                  {t('User:User.Date of birth')}
                </div>
                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => (
                    <SelectFrom
                      errorMasage={errors.date_of_birth?.message}
                      onChange={(e) => field.onChange(e)}
                      value={field.value}
                    />
                  )}
                />
              </div>
              <div className='text-center text-red-500'>{errors.date_of_birth?.message}</div>
              <div className='m-auto mt-8 flex w-[95%] justify-between'>
                <div className='w-[22%]'></div>
                <div className='w-[75%]'>
                  <Button type='submit' className='h-10 w-16  rounded-sm border bg-orange text-white'>
                    {t('User:User.Save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[30%] max-[900px]:w-[100%]'>
            <UploadAvatar onChange={setFile} />
          </div>
        </form>
      </div>
    </div>
  )
}
