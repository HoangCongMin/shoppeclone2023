import React, { useContext, useRef, useState, useMemo } from 'react'
import { setImage as setImageAll } from '../../utils/util'
import { myCreateContext } from '../../context/context'
interface props {
  onChange: (file: File) => void
}

export default function UploadAvatar({ onChange }: props) {
  const { profileUser } = useContext(myCreateContext)

  const [image, setImage] = useState<File>()
  const refInput = useRef<HTMLInputElement>(null)

  const handleImage = () => {
    refInput.current?.click()
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const InputFileItem = e.target.files?.[0]
    if (InputFileItem && (InputFileItem.size >= 1048576 || !InputFileItem.type.includes('image/jpeg'))) {
      ;('loi')
    } else {
      setImage(InputFileItem)
      onChange(InputFileItem as File)
    }
  }

  const imageShow = useMemo(() => (image ? URL.createObjectURL(image) : ''), [image])

  return (
    <div className='w-full border-l border-[#efefef]'>
      <div className='m-auto w-[65%]'>
        <div className='m-auto w-[60%]'>
          <div className='py-5'>
            <img src={imageShow || setImageAll(profileUser?.avatar)} alt='' className='rounded-full' />
          </div>
          <input
            onChange={handleChangeImage}
            onClick={(e) => ((e.target as any).value = null)}
            ref={refInput}
            className='hidden'
            type='file'
            accept='.jpg,.jeq,.png'
          />
          <button
            onClick={handleImage}
            type='button'
            className='h-10 border border-gray-300 bg-white px-5 text-sm text-[#555]'
          >
            Chọn ảnh
          </button>
        </div>
        <div className='m-4 w-full'>
          <div className='text-sm text-[#999]'>Dụng lượng file tối đa 1 MB</div>
          <div className='text-sm text-[#999]'>Định dạng:.JPEG, .PNG</div>
        </div>
      </div>
    </div>
  )
}
