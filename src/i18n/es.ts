import { ContextOptions } from './context.model';

const es = {
  add: 'Añadir',
  addEntity: ({ named }: ContextOptions) => `Añadir ${named('entity')}`,
  addNewEntity: ({ named }: ContextOptions) =>
    `Añadir nueva ${named('entity')}`,
  all: 'Todos',
  amount: 'Monto',
  by: 'Por',
  category: 'Categoria | Categorias',
  changeLang: 'Change lang to',
  cancel: 'Cancelar',
  clearFilters: 'Limpiar filtros',
  close: 'Cerrar',
  confirm: 'Confirmar',
  confirmDelete: 'Confirmar eliminación',
  confirmDeleteEntity: ({ named }: ContextOptions) =>
    `¿Estas seguro que quieres eliminar ${named('entity')}?`,
  currency: 'Moneda | Monedas',
  currentAmount: 'Monto actual',
  darkMode: 'Modo oscuro',
  date: 'Fecha',
  debt: 'Deuda',
  default: 'Default',
  defaultError: 'Un error ha ocurrido',
  delete: 'Eliminar',
  description: 'Descripción',
  duplicatedError: ({ named }: ContextOptions) =>
    `Ya existe ${named('entity')}`,
  email: 'Correo',
  emptyEntityMessage: ({ named }: ContextOptions) =>
    `No hay ${named('entity')} para mostrar aún. `,
  entity: 'Entidad | Entidades',
  entityRange: ({ named }: ContextOptions) => `Rango por ${named('entity')}`,
  error: 'Error',
  errorCreatingEntity: ({ named }: ContextOptions) =>
    `Problema al crear ${named('entity')}`,
  errorDeletingEntity: ({ named }: ContextOptions) =>
    `Problema al eliminar ${named('entity')}`,
  errorLoadingEntity: ({ named }: ContextOptions) =>
    `Problema al cargar ${named('entity')}`,
  errorUpdatingEntity: ({ named }: ContextOptions) =>
    `Problema al actualizar ${named('entity')}`,
  fieldsRequired: '*Campos requeridos',
  filterBy: 'Filtrar por',
  finished: 'Terminada',
  info: 'Info',
  information: 'Información',
  largeAmounts: 'Grandes montos',
  loan: 'Préstamo',
  login: 'Autenticar',
  loginError: 'Fallo al autenticar. Verifica tus datos de acceso',
  loginErrorGeneric: 'Fallo al autenticar. Intenta más tarde',
  loginFormError:
    'Por favor ingresen un correo electrónico y contraseña válidos (deben tener al menos 6 caracteres).',
  loginSwitch: 'Registrarse',
  logo: 'BP',
  logoComplete: 'Boa Payments',
  logout: 'Cerrar sesión',
  name: 'Nombre',
  newF: 'Nueva',
  newFirst: 'Nuevos primero',
  newM: 'Nuevo',
  nextDate: 'Próxima fecha',
  no: 'No',
  noEntities: ({ named }: ContextOptions) =>
    `No hay ${named('entities')} disponibles`,
  oldFirst: 'Viejos primero',
  orderDetails: 'Detalles de Orden',
  orders: 'Ordenes',
  password: 'Contraseña',
  payDate: 'Dia de pago',
  payments: 'Pagos',
  search: 'Buscar',
  searchEntity: ({ named }: ContextOptions) => `Buscar ${named('entity')}`,
  selectEntity: ({ named }: ContextOptions) => `Selecciona ${named('entity')}`,
  selectedEntity: ({ named }: ContextOptions) =>
    `${named('entity')} seleccionadas`,
  signError: 'Fallo al registrarse. Verifica tus datos de registro',
  signSwitch: 'Autenticarse',
  signup: 'Registrar',
  smallestAmounts: 'Pequeños montos',
  sortBy: 'Ordenar por',
  startDate: 'Fecha de Inicio',
  subscription: 'Subscripción',
  success: 'Éxito',
  text: 'Texto',
  title: 'Titulo',
  totalAmount: 'Monto total',
  tryAgain: 'Intentar de nuevo',
  type: 'Tipo',
  unfinished: 'Sin terminar',
  userSettings: 'Configuración de Usuario',
  value: 'Valor',
  warning: 'Advertencia',
  yes: 'Si',
  offlinePage: {
    title: 'Modo sin conexión listo',
    description: 'App lista para trabajar sin conexión',
  },
  pageNotFound: {
    title: 'Página no encontrada',
    description:
      'Esta página no pudo ser encontrada - tal vez necesites intentar primero',
  },
  pageAddOrder: {
    isSubscription: '¿Es una subscripcion?',
  },
  pageAuth: {
    infoPage: 'la página de información',
    warning: 'Antes de registrarte por favor lee',
  },
  pageInfo: {
    description:
      'Este es un proyecto personal con 2 objetivos principales. El primero, encontrar una forma de controlar mis préstamos y deudas. Segundo, practicar mis habilidades programando con Vue',
    githubProfile: 'Boamorte8',
    madeBy: 'Este proyecto fue hecho por Esteban Salazar Zapata',
    myGithub: 'Mi perfil de Github es ',
  },
};

export default es;
