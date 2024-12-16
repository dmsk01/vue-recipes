import { defineStore } from "pinia";
import { login, logout, refreshAccessToken } from "@/services/AuthService/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    refreshToken: null,
    user: null,
  }),
  actions: {
    async login(credentials) {
      const { accessToken, refreshToken, user } = await login(credentials);
      const userInfo = {
        id: user.id,
        name: user.name,
        role: user.role
      }

      this.token = accessToken;
      this.refreshToken = refreshToken;
      this.user = userInfo;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userInfo));
    },
    loadTokens() {
      this.token = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    async logout() {
      await logout();
      this.token = null;
      this.refreshToken = null;
      this.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    async refreshToken() {
      if (!this.refreshToken) throw new Error("No refresh token available");
      const { accessToken } = await refreshAccessToken(this.refreshToken);
      this.token = accessToken;
      return accessToken;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
    userInfo: (state) => state.user,
  },
});
