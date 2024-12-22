import { defineStore } from "pinia";
import { UserService } from "@/services";

export const useUsersStore = defineStore("usersStore", {
  state: () => ({
    users: [],
  }),
  actions: {
    async getUsers() {
      const result = await UserService.getUsers();
      this.users = result;
    },
    async addUser(user) {
      const result = await UserService.addUser(user);
      this.users = result;
    },
    async editUser(userId, newUser) {
      const result = await UserService.editUser(userId, newUser);
      // Обновляем список пользователей после успешного редактирования
      this.users = this.users.map(user => 
        user.id === userId ? { ...user, ...newUser } : user
      );
    },
  },
});
