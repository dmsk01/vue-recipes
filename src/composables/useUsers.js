import { useQuery, useMutation, useQueryClient } from "vue-query";
import { AdminService } from "@/services";
import { useUsersStore } from "@/stores/users";

export function useUsers() {
  const usersStore = useUsersStore();
  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery(
    ["users"],
    AdminService.getUsers,
    {
      staleTime: 1000 * 60 * 5, // Данные считаются свежими 5 минут
      cacheTime: 1000 * 60 * 30, // Данные хранятся в кэше 30 минут
      onSuccess: (data) => {
        usersStore.setUsers(data); // Сохраняем данные в Pinia
      },
      onSettled: (data, error) => {
        if (error) {
          console.error("Ошибка загрузки:", error);
        } else {
          console.log("Источник данных: ", data);
        }
      },
    }
  );

  const addUserMutation = useMutation(AdminService.addUser, {
    onSuccess: (newUser) => {
      usersStore.addUserToState(newUser); // Обновляем Pinia
      queryClient.invalidateQueries(["users"]); // Обновляем кэш Vue Query
    },
  });

  const editUserMutation = useMutation(
    ({ userId, newUser }) => AdminService.editUser(userId, newUser),
    {
      onSuccess: (updatedUser) => {
        usersStore.updateUserInState(updatedUser.id, updatedUser);
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const deleteUserMutation = useMutation(AdminService.deleteUser, {
    onSuccess: (_, userId) => {
      usersStore.removeUserFromState(userId);
      queryClient.invalidateQueries(["users"]);
    },
  });

  return {
    users,
    isLoading,
    error,
    addUserMutation,
    editUserMutation,
    deleteUserMutation,
  };
}
