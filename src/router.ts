import { createRouter, createWebHistory } from 'vue-router';

import MainDashboard from './pages/MainDashboard.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/dashboard', component: MainDashboard, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  // } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
  //   next('/coaches');
  } else {
    next();
  }
});

export default router;
