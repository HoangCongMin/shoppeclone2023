import { createContext, useState } from 'react'
import { user } from '../types/user.type'
import { getlocalStorage, getProfile } from '../utils/auth'

export interface AppContextInterface {
  LoginAndRegister: boolean
  setLoginAndRegister: React.Dispatch<React.SetStateAction<boolean>>
  isRegister0k: boolean
  setisRegister0k: React.Dispatch<React.SetStateAction<boolean>>
  profileUser: user | null
  setProfileUser: React.Dispatch<React.SetStateAction<user | null>>
}

// export interface AppContextInterfaceLogin {
//   isLoginok:boolean
//   setisLoginok:React.Dispatch<React.SetStateAction<boolean>>
// }

const initialaccess_token: AppContextInterface = {
  LoginAndRegister: Boolean(getlocalStorage()),
  setLoginAndRegister: () => null,
  isRegister0k: false,
  setisRegister0k: () => null,
  profileUser: getProfile(),
  setProfileUser: () => null
}

export const mycreateContext = createContext<AppContextInterface>(initialaccess_token)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [LoginAndRegister, setLoginAndRegister] = useState<boolean>(initialaccess_token.LoginAndRegister)
  const [isRegister0k, setisRegister0k] = useState<boolean>(initialaccess_token.isRegister0k)
  const [profileUser, setProfileUser] = useState<user | null>(initialaccess_token.profileUser)

  return (
    <mycreateContext.Provider
      value={{ LoginAndRegister, setLoginAndRegister, isRegister0k, setisRegister0k, profileUser, setProfileUser }}
    >
      {children}
    </mycreateContext.Provider>
  )
}
