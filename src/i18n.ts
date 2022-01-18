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
      logout: 'Logout',
      password: 'Password',
      signSwitch: 'Login instead',
      signup: 'Signup',
    },
    es: {
      email: 'Correo',
      login: 'Autenticar',
      loginSwitch: 'Registrarse',
      logout: 'Cerrar sesión',
      password: 'Contraseña',
      signSwitch: 'Autenticarse',
      signup: 'Registrar',
    },
  },
});
