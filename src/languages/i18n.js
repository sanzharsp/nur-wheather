import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from './bn.json';
import en from './en.json';
import sw from './sw.json';
import es from './es.json';
import fr from './fr.json';
import id from './id.json';
import it from './it.json';
import neNP from './ne-NP.json';
import ptBR from './pt-BR.json';
import ukr from './ukr.json';
import ta from './ta.json';
import zh from './zh.json';
import hnd from './hnd.json';
import he from './he.json';
import kk from './kk.json';
import ru from './ru.json';


i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'kk',
  fallbackLng: 'kk',
  resources: {
    ru: ru,
    en: en,
    sw: sw,
    es: es,
    fr: fr,
    id: id,
    it: it,
    ta: ta,
    bn: bn,
    zh: zh,
    kk: kk,
    ptBR: ptBR,
    neNP: neNP,
    ukr: ukr,
    he: he,
    hnd : hnd
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
