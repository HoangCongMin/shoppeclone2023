import React from 'react'
import Fotter from '../../components/Fotter'
import NapbarCart from '../../components/NapbarCart'
interface Props {
  children: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <NapbarCart />
      {children}

      <Fotter />
    </div>
  )
}
