import element from './useRouterElement/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageClearContext } from './utils/auth'
import { myCreateContext } from './context/context'

function App() {
  const useRouter = element()
  const { reset } = useContext(myCreateContext)
  useEffect(() => {
    localStorageClearContext.addEventListener('statusClear', reset)
    return () => {
      localStorageClearContext.removeEventListener('statusClear', reset)
    }
  }, [reset])
  return (
    <div className='App'>
      {useRouter} <ToastContainer />
    </div>
  )
}

export default App
