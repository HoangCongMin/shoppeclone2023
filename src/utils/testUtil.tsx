import { screen, waitFor, type waitForOptions, render } from '@testing-library/react'
import { expect } from 'vitest'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider, getInitialAppContext } from '../context/context'

import React from 'react'

export const result = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      expect(await result(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout
    }
  )
  screen.debug(body, 99999999)
}
const creatWrapPer = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => null
    }
  })
  const wrapperProvider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return wrapperProvider
}

const ProViderWrapPer = creatWrapPer()

export const renderRouter = ({ Path = '/' } = {}) => {
  window.history.pushState({}, 'test page', Path)
  const defaultValueAppContext = getInitialAppContext()

  return {
    user: userEvent.setup(),
    ...render(
      <ProViderWrapPer>
        <AppContextProvider defaultValue={defaultValueAppContext}>
          <App />
        </AppContextProvider>
      </ProViderWrapPer>,
      { wrapper: BrowserRouter }
    )
  }
}
