import RegisterNapbar from '../../components/registerNapbar'
import Fotter from '../../components/Fotter'

interface Prop {
  children?: React.ReactNode
}

export default function Register({ children }: Prop) {
  return (
    <div>
      {' '}
      <RegisterNapbar /> {children} <Fotter />
    </div>
  )
}
