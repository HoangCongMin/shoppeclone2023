import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='flex h-screen w-full flex-col items-center justify-center bg-[#F4F4F5]'>
          <h1 className='text-9xl font-extrabold tracking-widest text-orange'>500</h1>
          <div className='absolute rotate-12 rounded bg-[#FF6A3D] px-2 text-sm text-white'>Page Not Found</div>
          <button className='mt-5'>
            <div className='active:text-orange-500 group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring'>
              <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-y-0 group-hover:translate-x-0' />
              <span className='relative block border border-current bg-white px-8 py-3'>
                <a href='/'>Go Home</a>
              </span>
            </div>
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
