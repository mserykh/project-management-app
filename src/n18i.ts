import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const apiKey = 'ej-ab6uiE4iwoFJWFTs6Ig';
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem('language') || 'en',

    ns: ['default'],
    defaultNS: 'default',

    supportedLngs: ['en', 'ru'],

    backend: {
      loadPath: loadPath,
    },
  });

export default i18n;
