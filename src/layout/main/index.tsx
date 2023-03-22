import NapBarMain from '../../components/napBarMain'
import Fotter from '../../components/Fotter'
interface mainitem {
  children?: React.ReactNode
}

export default function Main({ children }: mainitem) {
  return (
    <div>
      <NapBarMain />
      {children}
      <Fotter />
    </div>
  )
}
