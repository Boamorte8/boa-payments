const es = {
  add: 'Añadir',
  addEntity: (ctx: any) => `Añadir ${ctx.named('entity')}`,
  addNewEntity: (ctx: any) => `Añadir nueva ${ctx.named('entity')}`,
  amount: 'Monto',
  category: 'Categoria | Categorias',
  changeLang: 'Change lang to',
  cancel: 'Cancelar',
  close: 'Cerrar',
  currency: 'Moneda',
  date: 'Fecha',
  debt: 'Deuda',
  default: 'Default',
  defaultError: 'Un error ha ocurrido',
  description: 'Descripción',
  email: 'Correo',
  emptyEntityMessage: (ctx: any) =>
    `No hay ${ctx.named('entity')} para mostrar aún. `,
  entity: 'Entidad | Entidades',
  error: 'Error',
  errorCreatingEntity: (ctx: any) => `Problema al crear ${ctx.named('entity')}`,
  errorLoadingEntity: (ctx: any) => `Problema al cargar ${ctx.named('entity')}`,
  fieldsRequired: '*Campos requeridos',
  info: 'Info',
  loan: 'Préstamo',
  login: 'Autenticar',
  loginError: 'Fallo al autenticar. Verifica tus datos de acceso',
  loginErrorGeneric: 'Fallo al autenticar. Intenta más tarde',
  loginFormError:
    'Por favor ingresen un correo electrónico y contraseña válidos (deben tener al menos 6 caracteres).',
  loginSwitch: 'Registrarse',
  logout: 'Cerrar sesión',
  name: 'Nombre',
  newF: 'Nueva',
  newM: 'Nuevo',
  nextDate: 'Próxima fecha',
  noEntities: (ctx: any) => `No hay ${ctx.named('entities')} disponibles`,
  orders: 'Ordenes',
  password: 'Contraseña',
  payments: 'Pagos',
  profile: 'Perfil',
  selectEntity: (ctx: any) => `Selecciona ${ctx.named('entity')}`,
  signError: 'Fallo al registrarse. Verifica tus datos de registro',
  signSwitch: 'Autenticarse',
  signup: 'Registrar',
  startDate: 'Fecha de Inicio',
  success: 'Éxito',
  title: 'Titulo',
  tryAgain: 'Intentar de nuevo',
  type: 'Tipo',
  warning: 'Advertencia',
  pageNotFound: {
    title: 'Página no encontrada',
    description:
      'Esta página no pudo ser encontrada - tal vez necesites intentar primero',
  },
  pageAddOrder: {
    isSubscription: '¿Es una subscripcion?',
  },
};

export default es;
