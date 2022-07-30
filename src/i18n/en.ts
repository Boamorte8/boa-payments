import { ContextOptions } from './context.model';

const en = {
  add: 'Add',
  addEntity: ({ named }: ContextOptions) => `Add ${named('entity')}`,
  addNewEntity: ({ named }: ContextOptions) => `Add new ${named('entity')}`,
  amount: 'Amount',
  by: 'By',
  category: 'Category | Categories',
  changeLang: 'Change lang to',
  cancel: 'Cancel',
  clearFilters: 'Clear filters',
  close: 'Close',
  currency: 'Currency',
  currentAmount: 'Current amount',
  darkMode: 'Dark mode',
  date: 'Date',
  debt: 'Debt',
  default: 'Default',
  defaultError: 'An error ocurred',
  description: 'Description',
  duplicatedError: ({ named }: ContextOptions) =>
    `Already exist ${named('entity')}`,
  email: 'Email',
  emptyEntityMessage: ({ named }: ContextOptions) =>
    `No ${named('entity')} to display yet. `,
  entity: 'Entity | Entities',
  entityRange: ({ named }: ContextOptions) => `${named('entity')} range`,
  errorCreatingEntity: ({ named }: ContextOptions) =>
    `Failed creating ${named('entity')}`,
  error: 'Error',
  errorLoadingEntity: ({ named }: ContextOptions) =>
    `Failed loading ${named('entity')}`,
  errorUpdatingEntity: ({ named }: ContextOptions) =>
    `Failed updating ${named('entity')}`,
  fieldsRequired: '*Fields required',
  finished: 'Finished',
  info: 'Info',
  information: 'Information',
  largeAmounts: 'Largest Amounts',
  loan: 'Loan',
  login: 'Login',
  loginError: 'Failed login. Check your login data',
  loginErrorGeneric: 'Failed to authenticate! Try later',
  loginFormError:
    'Please enter a valid email and password (must be at least 6 characters long).',
  loginSwitch: 'Signup instead',
  logout: 'Logout',
  name: 'Name',
  newF: 'New',
  newFirst: 'Newest first',
  newM: 'New',
  nextDate: 'Next Date',
  no: 'No',
  noEntities: ({ named }: ContextOptions) =>
    `There are no ${named('entities')} available`,
  oldFirst: 'Oldest first',
  orders: 'Order | Orders',
  password: 'Password',
  payDate: 'Pay Date',
  payments: 'Payment | Payments',
  search: 'Search',
  searchEntity: ({ named }: ContextOptions) => `Search ${named('entity')}`,
  selectEntity: ({ named }: ContextOptions) => `Select ${named('entity')}`,
  selectedEntity: ({ named }: ContextOptions) => `Selected ${named('entity')}`,
  signError: 'Failed sign up. Check your signup data',
  signSwitch: 'Login instead',
  signup: 'Signup',
  smallestAmounts: 'Smallest Amounts',
  sortBy: 'Sort by',
  startDate: 'Start Date',
  subscription: 'Subscription',
  success: 'Success',
  title: 'Title',
  totalAmount: 'Total amount',
  tryAgain: 'Try Again',
  type: 'Type',
  userSettings: 'User Settings',
  warning: 'Warning',
  yes: 'Yes',
  pageNotFound: {
    title: 'Page not found',
    description: 'This page could not be found - maybe you need try first to',
  },
  pageAddOrder: {
    isSubscription: 'Is a subscription?',
  },
  pageAuth: {
    infoPage: 'information page',
    warning: 'Before to register please read',
  },
  pageInfo: {
    description:
      'This is a personal project with two main goals. Firstly, a way to control lends and borrows. Second, to practice my skills to programming with Vue',
  },
};

export default en;
