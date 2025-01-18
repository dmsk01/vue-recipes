import api from "../AuthService/api";

export const getUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    console.log("Users:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error.response?.data || error.message);
  }
};

export const addUser = async (user) => {
  const response = await api.post("/admin/register", user);
  return response.data.user;
};

export const editUser = async (userId, newUser) => {
  const response = await api.put(`/admin/users/${userId}`, newUser);
  if (response.status === 200) {
    return { data: response.data, status: response.status };
  }
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  if (response.status === 200) {
    return { data: response.data, status: response.status };
  }
};
