<template>
  <AppLayout>
    <template #title>Dashboard</template>
    <template #main>
      <div class="admin-dashboard">
        <users-table />
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import UsersTable from "@/components/UsersTable.vue";
import AddUserForm from "@/components/AddUserForm.vue";


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
