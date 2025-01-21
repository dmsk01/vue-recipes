import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import { useAuthStore } from "@/features/Auth";

import { ROUTES_PATHS } from "@/constants";

const adminGuard = (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAdmin) {
    return next(ROUTES_PATHS.HOME);
  }
  next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: "home",
      component: () => import("@/pages/Home.vue"),
      meta: { requiresAuth: true, requiresAdmin: false },
    },
    {
      path: ROUTES_PATHS.CATEGORIES,
      name: "categories",
      component: () => import("@/pages/Categories.vue"),
      meta: { requiresAuth: true, requiresAdmin: false },
    },
    {
      path: ROUTES_PATHS.RECIPE,
      name: "recipe",
      component: () => import("@/pages/Recipe.vue"),
      meta: { requiresAuth: true, requiresAdmin: false },
    },
    {
      path: ROUTES_PATHS.DASHBOARD,
      name: "dashboard",
      component: () => import("@/pages/Dashboard.vue"),
      meta: { requiresAuth: true },
      beforeEnter: adminGuard,
    },
    {
      path: ROUTES_PATHS.NOTFOUND,
      name: "notfound",
      component: () => import("@/pages/NotFound.vue"),
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: ROUTES_PATHS.LOGIN,
      name: "login",
      component: () => import("@/pages/Login.vue"),
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: ROUTES_PATHS.RECIPECHAR,
      name: "recipe-char",
      component: () => import("@/pages/Home.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        authStore.user = JSON.parse(userCookie);
      } catch (error) {
        console.error("Ошибка при парсинге user из куков:", error);
        Cookies.remove("user", { path: '/' }); // Удаляем некорректную куку
      }
    }
  }

  if (to.meta.requiresAuth && !authStore.user) {
    next(ROUTES_PATHS.LOGIN);
  } else if (to.path === ROUTES_PATHS.LOGIN && authStore.user) {
    next(ROUTES_PATHS.HOME);
  } else {
    next();
  }
});

export default router;
