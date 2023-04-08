import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '../locales/en/Home.json'
import HOME_VN from '../locales/vn/Home.json'

export const lanGuageAll = {
  vn: 'Tiếng Việt',
  en: 'English'
}
 
const resources = {
  en: {
    home: HOME_EN
  },
  vn: {
    home: HOME_VN
  }
}

i18n.use(initReactI18next).init({
  resources,
  ns: ['home'],
  lng: 'vn',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
