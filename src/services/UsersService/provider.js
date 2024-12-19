import api from "../AuthService/api";

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const addUser = async (user) => {
  const response = await api.post("/admin/register", user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data.users;
};
