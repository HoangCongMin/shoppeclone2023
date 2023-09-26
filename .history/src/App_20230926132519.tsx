import element from './useRouterElement/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageClearContext } from './utils/auth'
import { myCreateContext } from './context/context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const useRouter = element()
  const { reset,LoginAndRegister } = useContext(myCreateContext)
  console.log(LoginAndRegister)
  useEffect(() => {
    localStorageClearContext.addEventListener('statusClear', reset)
    return () => {
      localStorageClearContext.removeEventListener('statusClear', reset)
    }
  }, [reset])
  return (
    <div className='App'>
      <ErrorBoundary>
        {useRouter} <ToastContainer />
      </ErrorBoundary>

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}

export default App
