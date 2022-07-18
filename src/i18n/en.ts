const en = {
  add: 'Add',
  addEntity: (ctx: any) => `Add ${ctx.named('entity')}`,
  addNewEntity: (ctx: any) => `Add new ${ctx.named('entity')}`,
  amount: 'Amount',
  category: 'Category | Categories',
  changeLang: 'Change lang to',
  cancel: 'Cancel',
  close: 'Close',
  currency: 'Currency',
  date: 'Date',
  debt: 'Debt',
  default: 'Default',
  defaultError: 'An error ocurred',
  description: 'Description',
  duplicatedError: (ctx: any) => `Already exist ${ctx.named('entity')}`,
  email: 'Email',
  emptyEntityMessage: (ctx: any) =>
    `No ${ctx.named('entity')} to display yet. `,
  entity: 'Entity | Entities',
  error: 'Error',
  errorCreatingEntity: (ctx: any) => `Failed creating ${ctx.named('entity')}`,
  errorLoadingEntity: (ctx: any) => `Failed loading ${ctx.named('entity')}`,
  fieldsRequired: '*Fields required',
  info: 'Info',
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
  newM: 'New',
  nextDate: 'Next Date',
  noEntities: (ctx: any) => `There are no ${ctx.named('entities')} available`,
  orders: 'Order | Orders',
  password: 'Password',
  payments: 'Payment | Payments',
  profile: 'Profile',
  selectEntity: (ctx: any) => `Select ${ctx.named('entity')}`,
  signError: 'Failed sign up. Check your signup data',
  signSwitch: 'Login instead',
  signup: 'Signup',
  startDate: 'Start Date',
  success: 'Success',
  title: 'Title',
  tryAgain: 'Try Again',
  type: 'Type',
  warning: 'Warning',
  pageNotFound: {
    title: 'Page not found',
    description: 'This page could not be found - maybe you need try first to',
  },
  pageAddOrder: {
    isSubscription: 'Is a subscription?',
  },
};

export default en;
