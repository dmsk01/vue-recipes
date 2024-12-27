import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.request.use((config) => {
//   const authStore = useAuthStore();
//   if (authStore.token) {
//     config.headers.Authorization = `Bearer ${authStore.token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response, // Пропускаем успешные запросы
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         // Если обновление уже выполняется, добавляем запрос в очередь
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         const response = await api.post("/refresh");
//         const newToken = response.data.token; // Предполагаем, что сервер возвращает новый токен
//         const authStore = useAuthStore();
//         authStore.setToken(newToken); // Обновляем токен в состоянии

//         processQueue(null, newToken);
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error); // Пропускаем другие ошибки
//   }
// );

export default api;
