import { describe, it, expect, beforeEach } from 'vitest'
import {
  setLocalStorage,
  getLocalStorage,
  getLocalStorageReFreshToken,
  setLocalStorageReFreshToken,
  clearLocalStorage,
  setProfile,
  getProfile
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0wN1QxMjoyMDozNy43NjRaIiwiaWF0IjoxNjgwODcwMDM3LCJleHAiOjE2ODA4NzAwNDd9.T0FoXnmSEjpvh4HTb9-D4Ko4s1WBWA4Ldx9XE1sVXiQ'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmRlMDRjNmQ3YzYyMDM0MDg1Mjk3NyIsImVtYWlsIjoibWhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0wN1QxMTozNDozMy43NjlaIiwiaWF0IjoxNjgwODY3MjczLCJleHAiOjE2ODk1MDcyNzN9.BH07sFHA5U4OjDKpOMEFyEFEoOe9xQuLfYWSTJhSfFE'

const proFile =
  '{"_id":"63fde04c6d7c620340852977","roles":["User"],"email":"mh@gmail.com","createdAt":"2023-02-28T11:06:52.940Z","updatedAt":"2023-03-31T12:12:13.572Z","__v":0,"date_of_birth":"2007-12-31T17:00:00.000Z","phone":"0973201885","address":"thai nguyen lam","name":"minhden","avatar":"38000a82-9a8c-4d21-aee4-0daebe0203c3.jpg"}'
beforeEach(() => {
  localStorage.clear()
})
describe('access_token', () => {
  it('access_token is ok', () => {
    setLocalStorage(access_token)
    expect(getLocalStorage()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token it ok', () => {
    setLocalStorageReFreshToken(refresh_token)
    expect(getLocalStorageReFreshToken()).toBe(refresh_token)
  })
})

describe('clearLocalStorage', () => {
  it('clearLocalStorage is ok', () => {
    setLocalStorage(access_token)

    setLocalStorageReFreshToken(refresh_token)

    clearLocalStorage()
    expect(getLocalStorage()).toBe('')

    expect(getLocalStorageReFreshToken()).toBe('')
  })
})

describe('getProFile', () => {
  it('getProFile is ok', () => {
    const ma = JSON.parse(proFile)

    setProfile(ma)
    expect(getProfile()).toEqual(ma)
  })
})
