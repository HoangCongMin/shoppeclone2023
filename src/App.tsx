import element from './useRoterelement/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const useRouter = element()
  return (
    <div className='App'>
      {useRouter} <ToastContainer />
    </div>
  )
}

export default App
