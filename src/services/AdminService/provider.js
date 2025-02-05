import api from "../AuthService/api";

export const getUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error.response?.data || error.message);
  }
};

export const addUser = async (user) => {
  try {
    const response = await api.post("/admin/register", user);
    return response.data.user;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const editUser = async (updatedUser) => {
  console.log("PROVIDER", updatedUser);

  try {
    const response = await api.put(`/admin/users/${updatedUser.id}`, updatedUser);
    if (response.status === 200) {
      return { data: response.data, status: response.status };
    } else {
      console.warn(`Unexpected response status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error editing user with ID ${updatedUser.id}:`, error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    if (response.status === 200) {
      return { data: response.data, status: response.status };
    } else {
      console.warn(`Unexpected response status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};