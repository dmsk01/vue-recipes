import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const validate = async () => {
  const response = await api.get("/validate");
  return response;
};
