import React from 'react'
import Footer from '../../components/Footer'
import NavbarCart from '../../components/NavbarCart'
interface Props {
  children: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <NavbarCart />
      {children}

      <Footer />
    </div>
  )
}
