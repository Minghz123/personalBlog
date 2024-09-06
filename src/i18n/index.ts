import { createI18n } from 'vue-i18n';
import ZH from './zh_CN.json';
import EN from './en_US.json';

const messages = {
  zh_CN: { ...ZH },
  en_US: { ...EN },
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh_CN',
  messages,
});

export default i18n;
