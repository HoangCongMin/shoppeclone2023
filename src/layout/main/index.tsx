import NapBarMain from '../../components/napBarMain'
import Footer from '../../components/Footer'
interface mainitem {
  children?: React.ReactNode
}

export default function Main({ children }: mainitem) {
  return (
    <div>
      <NapBarMain />
      {children}
      <Footer />
    </div>
  )
}
