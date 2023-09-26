import { useRoutes, Outlet, Navigate } from 'react-router-dom'
// import Login from '../page/Login'
// import Product from '../page/Product'
import Register from '../layout/register'
import Main from '../layout/main'
import CartLayout from '../layout/CartLayout'
import UserLayout from '../page/Profile/layout'
import { useContext, lazy, Suspense } from 'react'
import { myCreateContext } from '../context/context'
import Path from '../constants/path'
// import ProductDetails from '../page/ProductDetails'
// import Cart from '../page/Cart'
// import ChangePassWord from '../page/Profile/pages/ChangePassWord'
// import ProfileUser from '../page/Profile/pages/ProfileUser'
// import PurchaseOrder from '../page/Profile/pages/purchaseOrder'
// import NotFound from '../page/NotFound'

const Product = lazy(() => import('../page/Product'))
const ChangePassWord = lazy(() => import('../page/Profile/pages/ChangePassWord'))
const ProfileUser = lazy(() => import('../page/Profile/pages/ProfileUser'))
const PurchaseOrder = lazy(() => import('../page/Profile/pages/purchaseOrder'))
const Cart = lazy(() => import('../page/Cart'))
const ProductDetails = lazy(() => import('../page/ProductDetails'))
const Login = lazy(() => import('../page/Login'))
const NotFound = lazy(() => import('../page/NotFound'))

const Protected = () => {
  const { LoginAndRegister } = useContext(myCreateContext)
  return LoginAndRegister ? <Outlet /> : <Navigate to='/Login' />
}
const Jejected = () => {
  const { LoginAndRegister } = useContext(myCreateContext)

  return !LoginAndRegister ? <Outlet /> : <Navigate to='/' />
}

export default function useRouterElement() {
  const element = useRoutes([
    {
      path: Path.Home,
      index: true,
      element: (
        <Main>
          <Suspense>
            <Product />
          </Suspense>
        </Main>
      )
    },
    {
      path: '',
      element: <Protected />,
      children: [
        {
          path: Path.Profile,
          children: [
            {
              path: Path.ChangePassWord,
              element: (
                <Main>
                  <UserLayout>
                    <Suspense>
                      <ChangePassWord />
                    </Suspense>
                  </UserLayout>
                </Main>
              )
            },
            {
              path: Path.User,
              element: (
                <Main>
                  <UserLayout>
                    <Suspense>
                      <ProfileUser />
                    </Suspense>
                  </UserLayout>
                </Main>
              )
            },
            {
              path: Path.Oder,
              element: (
                <Main>
                  <UserLayout>
                    <Suspense>
                      <PurchaseOrder />
                    </Suspense>
                  </UserLayout>
                </Main>
              )
            }
          ]
        },
        {
          path: Path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    // {
    //   path: Path.id,
    //   element: (
    //     <Main>
    //       <Suspense>
    //         <ProductDetails />
    //       </Suspense>
    //     </Main>
    //   )
    // },
    {
      path: '',
      element: <Jejected />,
      children: [
        {
          path: Path.login,
          element: (
            <Register>
              <Suspense>
                <Login />
              </Suspense>
            </Register>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Main>
          <Suspense>
            <NotFound />
          </Suspense>
        </Main>
      )
    }
  ])
  return element
}
