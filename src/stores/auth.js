import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { login, logout, validate } from "@/services/AuthService/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async initialize() {
      this.loadUserFromCookies();

      if (this.user) {
        try {
          const isValid = await this.validateToken(); // Запрос к серверу
          if (!isValid) {
            this.logout();
          }
        } catch (error) {
          console.error("Ошибка проверки токена:", error);
          this.logout();
        }
      }
    },
    async login(credentials) {
      try {
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
      } catch (error) {
        console.error("Ошибка входа:", error);
        throw new Error("Не удалось войти. Проверьте данные и попробуйте снова.");
      }
    },
    async logout() {
      try {
        await logout();
      } catch (error) {
        console.error("Ошибка выхода:", error);
      } finally {
        this.user = null;
        Cookies.remove("user");
      }
    },
    async validateToken() {
      try {
        const response = await validate();
    
        if (!response.ok) throw new Error("Token is invalid");
        const data = await response.json();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    loadUserFromCookies() {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          this.user = JSON.parse(userCookie);
        } catch (error) {
          console.error("Некорректные данные в куке user:", error);
          Cookies.remove("user");
        }
      }
    },
    hasAccess(role) {
      return this.user && this.user.role === role;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === "admin",
  },
});
