
export const getUser = (state) => state.user;
export const isAuthenticated = (state) => !!state.user;
export const isAdmin = (state) => state.user?.role === "admin";
export const hasAccess = (state, role) => state.user?.role === role;
export const getUserName = (state) => state.user?.name || "Anonymous";