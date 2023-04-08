import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <div className='w-full '>
      <div className='m-auto mt-8 w-4/5 max-w-screen-2xl'>
        <div className='flex w-full justify-between text-gray-500 '>
          <div className='text-sm	'>{t('AsideFiller.titleLanGue')}</div>
          <div className='text-sm	'>
            {t('AsideFiller.Country & Region')}: {t('AsideFiller.address')}
          </div>
        </div>
        <div className='mt-10 w-full	text-center text-sm text-gray-500'>
          <div className='mt-6	'>{t('AsideFiller.Shopee Co., Ltd')}</div>
          <div className='mt-2	'>{t('AsideFiller.addressAll')}</div>
          <div className='mt-2'>{t('AsideFiller.manage')}</div>
          <div className='mt-2	'>{t('AsideFiller.tax code')}</div>
          <div className='mt-2	'>{t('AsideFiller.Copyright')}</div>
        </div>
      </div>
    </div>
  )
}
