import { Link, NavLink } from 'react-router-dom'
import Path from '../../../../constants/path'
import Avatar from '../../../../assets/image/avatarDemo.jpg'
import { RiEditFill, RiLockPasswordFill, RiBillFill } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { useContext } from 'react'
import { myCreateContext } from '../../../../context/context'
import { setImage } from '../../../../utils/util'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export default function NavbarUser() {
  const { profileUser } = useContext(myCreateContext)

  const { t } = useTranslation('user')


  return (
    <div>
      <div className='flex items-center border-b border-slate-200 py-5'>
        <Link to={Path.User} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img src={setImage(profileUser?.avatar) || Avatar} className='h-full w-full object-cover' alt='' />
        </Link>

        <div className='ml-4'>
          <p className='mb-1 text-sm font-semibold text-[#333]	'>{profileUser?.name}</p>
          <Link className='flex items-center text-sm capitalize text-[#888]' to={Path.User}>
            <RiEditFill />
            <span className='ml-2'>{t('User:User.Edit Profile')}</span>
          </Link>
        </div>
      </div>
      <div className='mt-6'>
        <NavLink
          to={Path.User}
          className={({ isActive }) => classNames(`mt-4 flex items-center ${isActive ? 'text-orange' : 'text-[#000]'}`)}
        >
          <CgProfile className='text-xl text-orange	' />
          <span className='ml-2 text-sm	font-medium '>{t('User:User.My account')}</span>
        </NavLink>
        <NavLink
          to={Path.ChangePassWord}
          className={({ isActive }) => classNames(`mt-4 flex items-center ${isActive ? 'text-orange' : 'text-[#000]'}`)}
        >
          <RiLockPasswordFill className='text-xl text-orange	' />
          <span className='ml-2 text-sm	font-medium'>{t('User:User.Change Password')}</span>
        </NavLink>
        <NavLink
          to={Path.Oder}
          className={({ isActive }) => classNames(`mt-4 flex items-center ${isActive ? 'text-orange' : 'text-[#000]'}`)}
        >
          <RiBillFill className=' text-xl text-orange	' />
          <span className='ml-2 text-sm	font-medium '>{t('User:User.Purchase Order')}</span>
        </NavLink>
      </div>
    </div>
  )
}
