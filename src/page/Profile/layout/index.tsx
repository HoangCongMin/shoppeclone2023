import React from 'react'
import NavbarUser from '../components/NavbarUser'

interface Props {
  children?: React.ReactNode
}

export default function UserLayout({ children }: Props) {
  return (
    <div className='w-full bg-[#F4F4F5]'>
      <div className='m-auto flex w-10/12 max-w-screen-2xl justify-between'>
        <div className='w-[15%]'>
          <NavbarUser />
        </div>
        <div className='w-[82.5%]'>{children}</div>
      </div>
    </div>
  )
}
