import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import viMessages from './locales/messages_vi.json';
import enMessages from './locales/messages_en.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  lng: 'vi',
  resources: {
    vi: {
      translations: viMessages,
    },
    en: {
      translations: enMessages,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['vi', 'en'];

export default i18n;
