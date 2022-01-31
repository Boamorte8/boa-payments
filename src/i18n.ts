import { createI18n } from 'vue-i18n';

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      close: 'Close',
      email: 'Email',
      login: 'Login',
      loginError: 'Failed login. Check your login data',
      loginErrorGeneric: 'Failed to authenticate! Try later',
      loginFormError: 'Please enter a valid email and password (must be at least 6 characters long).',
      loginSwitch: 'Signup instead',
      logout: 'Logout',
      password: 'Password',
      profile: 'Profile',
      signError: 'Failed sign up. Check your signup data',
      signSwitch: 'Login instead',
      signup: 'Signup',
      pageNotFound: {
        title: 'Page not found',
        description: 'This page could not be found - maybe you need try first to',
      },
    },
    es: {
      close: 'Cerrar',
      email: 'Correo',
      login: 'Autenticar',
      loginError: 'Fallo al autenticar. Verifica tus datos de acceso',
      loginErrorGeneric: 'Fallo al autenticar. Intenta más tarde',
      loginFormError: 'Por favor ingresen un correo electrónico y contraseña válidos (deben tener al menos 6 caracteres).',
      loginSwitch: 'Registrarse',
      logout: 'Cerrar sesión',
      password: 'Contraseña',
      profile: 'Perfil',
      signError: 'Fallo al registrarse. Verifica tus datos de registro',
      signSwitch: 'Autenticarse',
      signup: 'Registrar',
      pageNotFound: {
        title: 'Página no encontrada',
        description: 'Esta página no pudo ser encontrada - tal vez necesites intentar primero',
      },
    },
  },
});
