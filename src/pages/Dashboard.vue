<template>
  <AppLayout>
    <template #title>Админка</template>
    <template #main>
      <div class="admin-dashboard">
        <users-table :users="usersStore.users" />
        <add-user-form @addUser="addUser" />
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useUsersStore } from '@/stores/users';
import UsersTable from '@/components/UsersTable.vue'
import AddUserForm from '@/components/AddUserForm.vue'

const usersStore = useUsersStore();

const addUser = async (newUser) => {
  if (!newUser) return;
  const { username, password, role } = newUser;
  if (username && password && role) {
    await usersStore.addUser(newUser);
  } else {
    alert('Заполните все поля');
  }
};

const isLoading = ref(false);

onMounted(async () => { await fetchUsers() });

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    await usersStore.getUsers();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.title {
  color: #666
}

.user-list,
.add-user {
  margin-bottom: 40px;
}
</style>