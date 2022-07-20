import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import { useAuthUserStore } from './stores';
import AddOrder from '@pages/orders/AddOrder.vue';
import AddPayment from '@pages/payments/AddPayment.vue';
import OrdersView from '@pages/orders/OrdersView.vue';
import PaymentsList from '@pages/payments/PaymentsList.vue';
import NotFound from '@pages/NotFound.vue';
import UserAuth from '@pages/auth/UserAuth.vue';
import UserData from '@pages/UserData.vue';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/auth' },
  {
    path: '/auth',
    name: 'auth',
    component: UserAuth,
    meta: { requiresUnauth: true },
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView,
    meta: { requiresAuth: true },
  },
  {
    path: '/new-order',
    name: 'new-order',
    component: AddOrder,
    meta: { requiresAuth: true },
  },
  {
    path: '/new-payment',
    name: 'new-payment',
    component: AddPayment,
    meta: { requiresAuth: true },
  },
  {
    path: '/payments',
    name: 'payments',
    component: PaymentsList,
    meta: { requiresAuth: true },
  },
  {
    path: '/user',
    name: 'user',
    component: UserData,
    meta: { requiresAuth: true },
  },
  { path: '/:notFound(.*)', name: 'notFound', component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthUserStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && authStore.isAuthenticated) {
    next('/orders');
  } else {
    next();
  }
});
