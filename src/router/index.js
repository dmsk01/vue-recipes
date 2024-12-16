import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import { ROUTES_PATHS } from '@/constants'
import Login from '@/pages/Login.vue';

const adminGuard = (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAdmin) {
    return next('/');
  }
  next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: 'home',
      component: () => import('@/pages/Home.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: ROUTES_PATHS.CATEGORIES,
      name: 'categories',
      component: () => import('@/pages/Categories.vue'),
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: ROUTES_PATHS.RECIPE,
      name: 'recipe',
      component: () => import('@/pages/Recipe.vue'),
      meta: { requiresAuth: true, requiresAdmin: false }
    },
    {
      path: ROUTES_PATHS.DASHBOARD,
      name: 'dashboard',
      component: () => import('@/pages/Dashboard.vue'),
      meta: { requiresAuth: true },
      beforeEnter: adminGuard,
    },
    {
      path: ROUTES_PATHS.NOTFOUND,
      name: 'notfound',
      component: () => import('@/pages/NotFound.vue'),
      meta: { requiresAuth: false, requiresAdmin: false }
    },
    {
      path: ROUTES_PATHS.LOGIN,
      name: 'login',
      component: Login,
      meta: { requiresAuth: false, requiresAdmin: false }
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.token && localStorage.getItem('accessToken')) {
    await authStore.loadTokens();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    if (to.path !== '/login') {
      next('/login');
    } else {
      next(); // Не перенаправлять снова на /login чтобы не было зацикленности
    }
  }
  else if (to.path === '/login' && authStore.isAuthenticated) {
    next(authStore.isAdmin ? '/dashboard' : '/');
  } else {
    next();
  }
});

export default router