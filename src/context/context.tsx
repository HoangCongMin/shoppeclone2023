import { createContext, useState } from 'react'
import { user } from '../types/user.type'
import { getLocalStorage, getProfile } from '../utils/auth'
import { purchasesExtendItem } from '../page/Cart'

export interface AppContextInterface {
  LoginAndRegister: boolean
  setLoginAndRegister: React.Dispatch<React.SetStateAction<boolean>>
  isRegister0k: boolean
  setIsRegister0k: React.Dispatch<React.SetStateAction<boolean>>
  profileUser: user | null
  setProfileUser: React.Dispatch<React.SetStateAction<user | null>>
  purchasesExtend: purchasesExtendItem[]
  setPurchasesExtend: React.Dispatch<React.SetStateAction<purchasesExtendItem[]>>
  reset: () => void
}

const initialAccess_token: AppContextInterface = {
  LoginAndRegister: Boolean(getLocalStorage()),
  setLoginAndRegister: () => null,
  isRegister0k: false,
  setIsRegister0k: () => null,
  profileUser: getProfile(),
  setProfileUser: () => null,
  purchasesExtend: [],
  setPurchasesExtend: () => null,
  reset: () => null
}

export const myCreateContext = createContext<AppContextInterface>(initialAccess_token)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [LoginAndRegister, setLoginAndRegister] = useState<boolean>(initialAccess_token.LoginAndRegister)
  const [isRegister0k, setIsRegister0k] = useState<boolean>(initialAccess_token.isRegister0k)
  const [profileUser, setProfileUser] = useState<user | null>(initialAccess_token.profileUser)
  const [purchasesExtend, setPurchasesExtend] = useState<purchasesExtendItem[]>(initialAccess_token.purchasesExtend)
  const reset = () => {
    setIsRegister0k(false)
    setProfileUser(null)
    setPurchasesExtend([])
  }
  return (
    <myCreateContext.Provider
      value={{
        reset,
        LoginAndRegister,
        setLoginAndRegister,
        isRegister0k,
        setIsRegister0k,
        profileUser,
        setProfileUser,
        purchasesExtend,
        setPurchasesExtend
      }}
    >
      {children}
    </myCreateContext.Provider>
  )
}
