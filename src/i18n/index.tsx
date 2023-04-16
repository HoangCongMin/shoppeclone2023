import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '../locales/en/Home.json'
import HOME_VN from '../locales/vn/Home.json'
import PRODUCTDETAIL_EN from '../locales/en/ProductDetail.json'
import PRODUCTDETAIL_VN from '../locales/vn/ProductDetail.json'
import USER_EN from '../locales/en/User.json'
import USER_VN from '../locales/vn/User.json'
import CART_EN from '../locales/en/Cart.json'
import CART_VN from '../locales/vn/Cart.json'

export const lanGuageAll = {
  vn: 'Tiếng Việt',
  en: 'English'
}

const resources = {
  en: {
    home: HOME_EN,
    ProductDetail: PRODUCTDETAIL_EN,
    User: USER_EN,
    Cart: CART_EN
  },
  vn: {
    home: HOME_VN,
    ProductDetail: PRODUCTDETAIL_VN,
    User: USER_VN,
    Cart: CART_VN
  }
}

i18n.use(initReactI18next).init({
  resources,
  ns: ['home', 'productDetail', 'user', 'cart'],
  lng: 'vn',

  interpolation: {
    escapeValue: false
  }
})

export default i18n
