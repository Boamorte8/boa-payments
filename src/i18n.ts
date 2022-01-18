import { createI18n } from 'vue-i18n';

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      email: 'Email',
      login: 'Login',
      loginSwitch: 'Signup instead',
      password: 'Password',
      signSwitch: 'Login instead',
      signup: 'Signup',
    },
    es: {
      email: 'Correo',
      login: 'Autenticar',
      loginSwitch: 'Registrarse',
      password: 'Contraseña',
      signSwitch: 'Autenticarse',
      signup: 'Registrar',
    },
  },
});
