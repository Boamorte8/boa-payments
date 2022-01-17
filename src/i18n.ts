import { createI18n } from 'vue-i18n';

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      login: 'Login',
      signup: 'Signup',
      loginSwitch: 'Signup instead',
      signSwitch: 'Login instead',
    },
    es: {
      login: 'Autenticar',
      signup: 'Registrar',
      loginSwitch: 'Registrarse',
      signSwitch: 'Autenticarse',
    },
  },
});
