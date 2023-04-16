import React from 'react'
import NavbarUser from '../components/NavbarUser'

interface Props {
  children?: React.ReactNode
}

export default function UserLayout({ children }: Props) {
  return (
    <div className='w-full bg-[#F4F4F5] py-16'>
      <div className='m-auto flex w-10/12 max-w-screen-2xl justify-between max-[1000px]:flex-col'>
        <div className='w-[15%] max-[1000px]:w-[100%]'>
          <NavbarUser />
        </div>
        <div className='w-[82.5%] max-[1000px]:w-[100%] max-[1000px]:pt-8'>{children}</div>
      </div>
    </div>
  )
}
