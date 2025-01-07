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
      onSuccess: (data) => {
        usersStore.setUsers(data); // Сохраняем данные в Pinia
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
