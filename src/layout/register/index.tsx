import RegisterNavbar from '../../components/RegisterNavbar'
import Fotter from '../../components/Footer'

interface Prop {
  children?: React.ReactNode
}

export default function Register({ children }: Prop) {
  return (
    <div>
      {' '}
      <RegisterNavbar /> {children} <Fotter />
    </div>
  )
}
