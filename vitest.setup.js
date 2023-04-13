import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'

import authRequests from './src/msw/auth.msw'
import restHandlersMe from './src/msw/me.msw'
import restHandleProductAll from './src/msw/product.msw'

const server = setupServer(...authRequests, ...restHandlersMe, ...restHandleProductAll)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
