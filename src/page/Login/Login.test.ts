import { screen, waitFor, fireEvent } from '@testing-library/react'
import { expect, it, describe, beforeAll } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import { renderRouter, logScreen } from '../../utils/testUtil'
import Path from '../../constants/path'

expect.extend(matchers)

describe('login ', () => {
  beforeAll(async () => {
    renderRouter({ Path: Path.login })

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('email')).toBeInTheDocument()
    })
  })
  it('test from khong nhap', async () => {
    const subMitBuTon = document.querySelector('form button[type="submit"]') as Element

    fireEvent.click(subMitBuTon)

    expect(await screen.findByText('email la bat buoc')).toBeTruthy()
    expect(await screen.findByText('password la bat buoc')).toBeTruthy()
  })
  it('test from sai dinh dang', async () => {
    const submitText = document.querySelector('form input[type="text"]') as HTMLInputElement
    const submitPassWord = document.querySelector('form input[type="password"]') as HTMLInputElement

    const submitButon = document.querySelector('form button[type="submit"]') as Element

    fireEvent.change(submitText, {
      target: {
        value: 'testail'
      }
    })
    fireEvent.change(submitPassWord, {
      target: {
        value: '123'
      }
    })

    fireEvent.click(submitButon)

    expect(await screen.findByText('email khong dung dinh dang')).toBeTruthy()
    expect(await screen.findByText('do dai password tu 5 - 160')).toBeTruthy()
  })
  it('khong hien thi loi khi nhap dung', async () => {
    const submitText = document.querySelector('form input[type="text"]') as HTMLInputElement
    const submitPassWord = document.querySelector('form input[type="password"]') as HTMLInputElement
    const submitButon = document.querySelector('form button[type="submit"]') as Element
    fireEvent.change(submitText, {
      target: {
        value: 'mh@gmail.com'
      }
    })
    fireEvent.change(submitPassWord, {
      target: {
        value: 'minh123456789'
      }
    })
    await waitFor(() => {
      expect(screen.queryByText('email khong dung dinh dang')).toBeFalsy()
      expect(screen.queryByText('do dai password tu 5 - 160')).toBeFalsy()
    })
    fireEvent.click(submitButon)
    await logScreen()
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Product Item')
    })
  })
})
