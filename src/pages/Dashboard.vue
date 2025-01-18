<template>
  <AppLayout>
    <template #title>Dashboard</template>
    <template #main>
      <div class="admin-dashboard">
        <users-table :users="users" :isLoading="isLoading" :error="error" :editUserMutation="editUserMutation"
          :deleteUserMutation="deleteUserMutation" />
        <add-user-form :addUserMutation="addUserMutation" :isLoading="isLoading" />
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import UsersTable from "@/components/UsersTable.vue";
import AddUserForm from "@/components/AddUserForm.vue";
import { useUsers } from "@/composables/useUsers";

const {
  users,
  isLoading,
  error,
  addUserMutation,
  editUserMutation,
  deleteUserMutation
} = useUsers();

</script>

<style scoped>
.title {
  color: #666;
}

.user-list,
.add-user {
  margin-bottom: 40px;
}
</style>
