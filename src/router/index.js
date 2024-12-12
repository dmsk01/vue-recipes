import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import { ROUTES_PATHS } from '@/constants'
import Login from '@/pages/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: ROUTES_PATHS.CATEGORIES,
      name: 'categories',
      component: () => import('../pages/Categories.vue'),
    },
    {
      path: ROUTES_PATHS.RECIPE,
      name: 'recipe',
      component: () => import('../pages/Recipe.vue'),
    },
    {
      path: ROUTES_PATHS.LOGIN,
      name: 'login',
      component: Login,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.path !== '/login'; // все маршруты кроме /login требуют авторизации

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router
