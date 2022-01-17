import { createRouter, createWebHistory } from 'vue-router';

import MainDashboard from './pages/MainDashboard.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/dashboard', component: MainDashboard, meta: { requiresAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
