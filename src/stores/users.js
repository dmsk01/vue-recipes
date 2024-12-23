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
      if (result.status === 200) {
        this.users = this.users.map((user) =>
          user.id === userId ? { ...user, ...newUser } : user
        );
      }
    },
    async deleteUser(userId) {
      try {
        const result = await UserService.deleteUser(userId);
        if (result.status === 200) {
          this.users = this.users.filter((user) => user.id !== userId);
        } else {
          console.error("Failed to delete user:", result.statusText);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
});
