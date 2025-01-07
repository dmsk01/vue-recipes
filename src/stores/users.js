// import { defineStore } from "pinia";
// import { AdminService } from "@/services";

// export const useUsersStore = defineStore("usersStore", {
//   state: () => ({
//     users: [],
//   }),
//   actions: {
//     async getUsers() {
//       const result = await AdminService.getUsers();
//       this.users = result;
//     },
//     async addUser(user) {
//       try {
//         const newUser = await AdminService.addUser(user);
//         this.users.push(newUser);
//       } catch (error) {
//         console.error("Error adding user:", error);
//       }
//     },
//     async editUser(userId, newUser) {
//       try {
//         const result = await AdminService.editUser(userId, newUser);
//         if (result.status === 200) {
//           this.users = this.users.map((user) =>
//             user.id === userId ? { ...user, ...newUser } : user
//           );
//         } else {
//           console.error("Failed to delete user:", result.statusText);
//         }
//       } catch (error) {
//         console.error("Error editing user:", error);
//       }
//     },
//     async deleteUser(userId) {
//       try {
//         const result = await AdminService.deleteUser(userId);
//         if (result.status === 200) {
//           this.users = this.users.filter((user) => user.id !== userId);
//         } else {
//           console.error("Failed to delete user:", result.statusText);
//         }
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     },
//   },
// });
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

