// import React, { Children } from 'react'
import { useRoutes, Outlet, Navigate } from 'react-router-dom'
import Login from '../page/Login'
import Product from '../page/Product'
import Register from '../layout/register'
import Main from '../layout/main'
import Proflie from '../page/Proflie'
import { useContext } from 'react'
import { mycreateContext } from '../context/context'
import Path from '../constants/path'
import ProductDetails from '../page/ProductDetails'
import Cart from '../page/Cart'

export default function useRoterelement() {
  const { LoginAndRegister } = useContext(mycreateContext)
  const Protected = () => {
    return LoginAndRegister ? <Outlet /> : <Navigate to='/Login' />
  }
  const Jejected = () => {
    return !LoginAndRegister ? <Outlet /> : <Navigate to='/' />
  }
  const element = useRoutes([
    {
      path: Path.Home,
      index: true,
      element: (
        <Main>
          <Product />
        </Main>
      )
    },
    {
      path: '',
      element: <Protected />,
      children: [
        {
          path: Path.Proflie,
          element: (
            <Main>
              <Proflie />
            </Main>
          )
        },
        {
          path: Path.cart,
          element: (
            <Main>
              <Cart />
            </Main>
          )
        }
      ]
    },
    {
      path: Path.id,
      element: (
        <Main>
          <ProductDetails />
        </Main>
      )
    },
    {
      path: '',
      element: <Jejected />,
      children: [
        {
          path: Path.login,
          element: (
            <Register>
              <Login />
            </Register>
          )
        }
      ]
    }
  ])
  return element
}
