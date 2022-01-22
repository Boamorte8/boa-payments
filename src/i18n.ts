import { createI18n } from 'vue-i18n';

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      email: 'Email',
      login: 'Login',
      loginError: 'Failed login. Check your login data',
      loginSwitch: 'Signup instead',
      logout: 'Logout',
      password: 'Password',
      signError: 'Failed sign up. Check your signup data',
      signSwitch: 'Login instead',
      signup: 'Signup',
    },
    es: {
      email: 'Correo',
      login: 'Autenticar',
      loginError: 'Fallo al autenticar. Verifica tus datos de acceso',
      loginSwitch: 'Registrarse',
      logout: 'Cerrar sesión',
      password: 'Contraseña',
      signError: 'Fallo al registrarse. Verifica tus datos de registro',
      signSwitch: 'Autenticarse',
      signup: 'Registrar',
    },
  },
});
