import { defineStore } from "pinia";
import * as selectors from './selectors'

import { initialize, loginAction, logoutAction, validateToken, loadUserFromCookies, hasAccess } from './actions'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async initialize() {
      return initialize(this);
    },
    async login(credentials) {
      return loginAction(this, credentials);
    },
    async logout() {
      return logoutAction(this)
    },
    async validateToken() {
      return validateToken(this)
    },
    loadUserFromCookies() {
      return loadUserFromCookies(this)
    },
    hasAccess(role) {
      return hasAccess(this, role)
    },
  },
  getters: {
    user: (state) => selectors.getUser(state),
    isAuthenticated: (state) => selectors.isAuthenticated(state),
    isAdmin: (state) => selectors.isAdmin(state),
    getUserName: (state) => selectors.getUserName(state),
  },
});
