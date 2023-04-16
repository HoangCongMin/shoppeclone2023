import { Link } from 'react-router-dom'
import Path from '../../constants/path'
import Popoper from '../popoper'
import { FiBell } from 'react-icons/fi'
import { AiOutlineQuestionCircle, AiOutlineGlobal } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useContext, useRef } from 'react'
import { useFloating, offset, flip, shift } from '@floating-ui/react'
import { myCreateContext } from '../../context/context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Logout } from '../../apis/auth.api'
import purchases from '../../constants/purchases'
import { purchaseStatusAll } from '../../types/purchases.type'
import { setImage } from '../../utils/util'
import { useTranslation } from 'react-i18next'
import { lanGuageAll } from '../../i18n'

export default function Header() {
  const arowref = useRef<HTMLElement>(null)
  const { middlewareData } = useFloating({
    middleware: [offset(10), flip(), shift()]
  })
  const { setLoginAndRegister, LoginAndRegister, setIsRegister0k, profileUser } = useContext(myCreateContext)
  const queryClient = useQueryClient()

  const Mutation = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      setLoginAndRegister(false)
      queryClient.removeQueries({ queryKey: ['ListItem', { status: purchases.inCart as purchaseStatusAll }] })
    }
  })

  const handleLogout = () => {
    Mutation.mutate()
  }

  const handleRegister = () => {
    setIsRegister0k(true)
  }

  const handleLoginOk = () => {
    setIsRegister0k(false)
  }

  const { t, i18n } = useTranslation()

  const handleLanGuage = (LanGuage: string) => i18n.changeLanguage(LanGuage)

  const LanGuage = lanGuageAll[i18n.language as keyof typeof lanGuageAll]
  return (
    <div className='m-auto flex w-10/12 max-w-screen-2xl items-center justify-between pt-2 max-[1234px]:justify-center  '>
      <div className='w-5/12 max-[1234px]:hidden'></div>
      <div className='w-[35%] max-[1234px]:w-[auto] max-[600px]:w-full'>
        <ul className='flex w-full justify-between text-[14px] text-white'>
          <li className='flex items-center max-[434px]:hidden'>
            <FiBell />
            <p className='ml-1'> {t('AsideFiller.Notification')} </p>
          </li>
          <li className='flex items-center max-[434px]:hidden'>
            <AiOutlineQuestionCircle /> <p className='ml-1'> {t('AsideFiller.Support')} </p>
          </li>
          <Popoper
            consomer={
              <div className='relative h-16 w-52 bg-white'>
                <span
                  ref={arowref}
                  className=' absolute left-20 -translate-y-5 border-[11px] border-x-transparent border-t-transparent 	border-b-white'
                  style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
                />
                <div className='m-auto w-4/5'>
                  <div className='cursor-pointer pt-2 text-[13px] hover:text-orange'>
                    <button onClick={() => handleLanGuage('vn')} className='w-full text-left '>
                      Tiếng việt
                    </button>
                  </div>
                  <div className='cursor-pointer pt-2 text-[13px] hover:text-orange'>
                    <button onClick={() => handleLanGuage('en')} className='w-full text-left'>
                      English
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <AiOutlineGlobal /> <p className='ml-1'> {LanGuage}</p> <MdOutlineKeyboardArrowDown />
          </Popoper>
          {LoginAndRegister && (
            <Popoper
              consomer={
                <div className='relative w-40 bg-white'>
                  <span
                    ref={arowref}
                    className=' absolute left-20 -translate-y-5 border-[11px] border-x-transparent border-t-transparent 	border-b-white'
                    style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
                  />
                  <div className='m-auto w-4/5'>
                    <Link to={Path.User} className='cursor-pointer pt-2 text-[13px] hover:text-orange'>
                      {t('User:User.Profile')}
                    </Link>
                    <p className='cursor-pointer pt-2 text-[13px] hover:text-orange'>{t('User:User.purchase order')}</p>
                    <button onClick={handleLogout} className='cursor-pointer pt-2 text-[13px] hover:text-orange'>
                      {t('User:User.Log out')}
                    </button>
                  </div>
                </div>
              }
            >
              <Link to={Path.User} className='h-5 w-5 flex-shrink-0 overflow-hidden rounded-full '>
                <img src={setImage(profileUser?.avatar)} className='h-full w-full object-cover' alt='' />
              </Link>
              <p className='ml-1'>{profileUser?.email}</p>
            </Popoper>
          )}
          {!LoginAndRegister && (
            <li className='flex w-36 justify-between'>
              <Link to={Path.login} onClick={handleRegister}>
                {t('AsideFiller.Register')}
              </Link>
              <div className=' border-r-[1px] border-white'></div>
              <Link to={Path.login} onClick={handleLoginOk}>
                {t('AsideFiller.Log in')}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
