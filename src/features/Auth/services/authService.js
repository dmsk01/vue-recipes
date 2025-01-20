import api from "../lib/api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Ошибка входа: ", error.response?.data || error.message);
    throw new Error("Не удалось выполнить вход. Проверьте данные.");
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Ошибка регистрации: ", error.response?.data || error.message);
    throw new Error("Не удалось зарегестрировать пользователя. ", JSON.stringify(userData));
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Не удалось выйти:", error.response?.data || error.message);
    throw error;
  }
};

export const validate = async () => {
  try {
    const response = await api.get("/validate");
    return response;
  } catch (error) {
    console.error("Ошибка проверки токена ", error.response?.data || error.message);
    throw error;
  }
};
