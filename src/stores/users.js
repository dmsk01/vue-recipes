import { defineStore } from "pinia";

export const useUsersStore = defineStore("usersStore", {
  state: () => ({
    users: [],
  }),
  actions: {
    setUsers(users) {
      this.users = users;
    },
    addUserToState(user) {
      this.users.push(user);
    },
    updateUserInState(userId, newUser) {
      this.users = this.users.map((user) =>
        user.id === userId ? { ...user, ...newUser } : user
      );
    },
    removeUserFromState(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
  },
});

