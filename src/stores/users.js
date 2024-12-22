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
      // this.users = result;
    },
  },
});
