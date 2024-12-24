import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { login, logout } from "@/services/AuthService/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(credentials) {
      const { user } = await login(credentials);
      this.user = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      Cookies.set("user", JSON.stringify(this.user), {
        secure: true,
        sameSite: "Strict",
      });
    },
    async logout() {
      await logout();
      this.user = null;
      Cookies.remove("user");
    },
    loadUserFromCookies() {
      // Восстанавливаем данные пользователя из cookies
      const userCookie = Cookies.get("user");
      if (userCookie) {
        this.user = JSON.parse(userCookie);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === "admin",
  },
});
