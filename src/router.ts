import { createRouter, createWebHistory } from 'vue-router';

import { useAuthUserStore } from './stores';
import OrdersList from './pages/orders/OrdersList.vue';
import PaymentsList from './pages/payments/PaymentsList.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import UserData from './pages/UserData.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/orders', component: OrdersList, meta: { requiresAuth: true } },
    { path: '/payments', component: PaymentsList, meta: { requiresAuth: true } },
    { path: '/user', component: UserData, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
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

export default router;
