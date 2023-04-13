import { describe, it, expect } from 'vitest'
import { renderRouter, logScreen } from '../../../../utils/testUtil'
import Path from '../../../../constants/path'
import { setLocalStorage } from '../../../../utils/auth'
import { token_all } from '../../../../msw/auth.msw'
import { waitFor } from '@testing-library/react'

describe('ProFile', () => {
  it('hien thi ProFile', async () => {
    setLocalStorage(token_all)
    const { container } = renderRouter({ Path: Path.User })
    await logScreen()
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe('minhden')
    })
  })
})
