import Cookies from "js-cookie";
import { login, logout, validate } from "@/features/Auth/services/authService";

export const initialize = async (store) => {
  store.loadUserFromCookies();

  if (store.user) {
    try {
      const isValid = await store.validateToken(); // Запрос к серверу
      if (!isValid) {
        store.logout();
      }
    } catch (error) {
      console.error("Ошибка проверки токена:", error);
      store.logout();
    }
  }
}

export const loginAction = async (credentials) => {
  try {
    const { user } = await login(credentials);
    store.user = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    Cookies.set("user", JSON.stringify(store.user), {
      secure: true,
      sameSite: "Strict",
    });
  } catch (error) {
    console.error("Ошибка входа:", error);
    throw new Error("Не удалось войти. Проверьте данные и попробуйте снова.");
  }
}

export const logoutAction = async (store) => {
  try {
    await logout();
  } catch (error) {
    console.error("Ошибка выхода:", error);
  } finally {
    store.user = null;
    Cookies.remove("user");
  }
}

export const validateToken = async () => {
  try {
    const response = await validate();

    if (!response.ok) throw new Error("Token is invalid");
    const data = await response.json();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const loadUserFromCookies = (store) => {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    try {
      store.user = JSON.parse(userCookie);
    } catch (error) {
      console.error("Некорректные данные в куке user:", error);
      Cookies.remove("user");
    }
  }
}
export const hasAccess = (store, role) => {
  return store.user && store.user.role === role;
}