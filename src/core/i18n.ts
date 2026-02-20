import i18n from 'i18next';
import XHR from 'i18next-http-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(XHR)
  .use(intervalPlural)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
      nsMode: 'fallback'
    },
    defaultNS: 'common',
    ns: ['common'],
    backend: {
      crossDomain: true,
      loadPath: '/i18n/{{lng}}/{{ns}}.json'
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupFromPathIndex: 0
    },
    debug: true,
    interpolation: { escapeValue: false }
  });

export default i18n;
