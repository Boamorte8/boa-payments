import { ContextOptions } from './context.model';

const en = {
  add: 'Add',
  addEntity: ({ named }: ContextOptions) => `Add ${named('entity')}`,
  addNewEntity: ({ named }: ContextOptions) => `Add new ${named('entity')}`,
  all: 'All',
  amount: 'Amount',
  by: 'By',
  category: 'Category | Categories',
  changeLang: 'Change lang to',
  cancel: 'Cancel',
  clearFilters: 'Clear filters',
  close: 'Close',
  confirm: 'Confirm',
  confirmDelete: 'Confirm delete',
  confirmDeleteEntity: ({ named }: ContextOptions) =>
    `Are you sure that do you want delete ${named('entity')}?`,
  currency: 'Currency | Currencies',
  currentAmount: 'Current amount',
  darkMode: 'Dark mode',
  date: 'Date',
  debt: 'Debt | Debts',
  default: 'Default',
  defaultError: 'An error ocurred',
  delete: 'Delete',
  description: 'Description',
  duplicatedError: ({ named }: ContextOptions) =>
    `Already exist ${named('entity')}`,
  email: 'Email',
  emptyEntityMessage: ({ named }: ContextOptions) =>
    `No ${named('entity')} to display yet. `,
  endDate: 'End Date',
  entity: 'Entity | Entities',
  entityRange: ({ named }: ContextOptions) => `${named('entity')} range`,
  errorCreatingEntity: ({ named }: ContextOptions) =>
    `Failed creating ${named('entity')}`,
  errorDeletingEntity: ({ named }: ContextOptions) =>
    `Failed deleting ${named('entity')}`,
  error: 'Error',
  errorLoadingEntity: ({ named }: ContextOptions) =>
    `Failed loading ${named('entity')}`,
  errorUpdatingEntity: ({ named }: ContextOptions) =>
    `Failed updating ${named('entity')}`,
  fieldsRequired: '*Fields required',
  filterBy: 'Filter by',
  finished: 'Finished',
  info: 'Info',
  information: 'Information',
  largeAmounts: 'Largest Amounts',
  loan: 'Loan | Loans',
  login: 'Login',
  loginError: 'Failed login. Check your login data',
  loginErrorGeneric: 'Failed to authenticate! Try later',
  loginFormError:
    'Please enter a valid email and password (must be at least 8 characters long, 1 upper case character, 1 lower case character, and 1 number).',
  loginSwitch: 'Signup instead',
  logo: 'BP',
  logoComplete: 'Boa Payments',
  logout: 'Logout',
  name: 'Name',
  newF: 'New',
  newFirst: 'Newest first',
  newM: 'New',
  newPassword: 'New password',
  nextDate: 'Next Date',
  no: 'No',
  noEntities: ({ named }: ContextOptions) =>
    `There are no ${named('entities')} available`,
  oldFirst: 'Oldest first',
  orderDetails: 'Order Details',
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
  summary: 'Summary',
  text: 'Text',
  title: 'Title',
  totalAmount: 'Total amount',
  tryAgain: 'Try Again',
  type: 'Type',
  unfinished: 'Unfinished',
  userSettings: 'User Settings',
  value: 'Value',
  warning: 'Warning',
  yes: 'Yes',
  offlinePage: {
    title: 'Offline Ready',
    description: 'App ready to work offline',
  },
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
    githubProfile: 'Boamorte8',
    madeBy: 'This project was made by Esteban Salazar Zapata',
    myGithub: 'My Github profile is ',
  },
  recoverPage: {
    formError: 'Please enter a valid email',
    instructions:
      'Enter your email address to send you an email with instructions to reset your password',
    noExistsEmail: 'Email no exists',
    recoverPassword: 'Recover password',
    sendingEmailError: 'Failed sending email! Try again',
    sendingEmailMessage:
      'Email sent successfully. Please check your email and follow the instructions',
    sendingEmailTitle: 'Email sent successfully',
  },
  resetPage: {
    formError:
      'Please enter a valid password (must be at least 8 characters long, 1 upper case character, 1 lower case character, and 1 number).',
    instructions: 'Enter your new password',
    resetPassword: 'Reset password',
    resetPasswordError: 'Failed changing your password! Try again',
    resetPasswordMessage: 'Password was changed successfully.',
    resetPasswordTitle: 'Password changed successfully',
  },
};

export default en;
