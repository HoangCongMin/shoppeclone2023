import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AppContextProvider } from '../src/context/context'
import ErrorBoundary from '../src/components/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus:false,
      retry: 0
    }
  }
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <ErrorBoundary>
              <Story />
            </ErrorBoundary>
          </AppContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    )
  ]
}

export default preview
