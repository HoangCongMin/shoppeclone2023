import React from 'react'

import { screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { describe, expect, it } from 'vitest'
import { renderRouter } from './utils/testUtil'
import Path from './constants/path'

expect.extend(matchers)

describe('app', () => {
  it('render app', async () => {
    // render(<App />, { wrapper: BrowserRouter })
    const { user } = renderRouter()

    // const user = userEvent.setup()

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Product Item')
    })

    await user.click(screen.getByText(/Đăng ký/i))

    await waitFor(() => {
      expect(screen.queryByText('Bạn đã có tài khoản?')).toBeInTheDocument()
      // expect(document.querySelector('title')?.textContent).toBe('đăng nhập')
    })
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
  it('render not fount 404', async () => {
    const badRoute = '/some/bad/route'
    // render(
    //   <MemoryRouter initialEntries={[badRoute]}>
    //     <App />
    //   </MemoryRouter>
    // )
    renderRouter({ Path: badRoute })

    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })

    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
    // await logScreen()
  })
  it('render and register', async () => {
    // window.history.pushState({},'test page',Path.login)
    // render(<App />, {
    //   wrapper: BrowserRouter
    // })
    renderRouter({ Path: Path.login })
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
