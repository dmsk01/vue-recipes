<template>
  <AppLayout>
    <template #title>Админка</template>
    <template #main>
      <div class="admin-dashboard">
        <div class="user-list">
          <h2 class="title">Пользователи</h2>
          <el-table :data="usersStore.users" style="width: 50%">
            <el-table-column prop="id" label="ID" width="150" />
            <el-table-column prop="username" label="Имя" />
            <el-table-column prop="role" label="Роль" />
          </el-table>
        </div>

        <div class="add-user">
          <h2 class="title">Добавить нового пользователя</h2>
          <el-form ref="addUserForm" :model="newUser" @submit.native.prevent="addUser">
            <el-form-item label="Имя">
              <el-input v-model="newUser.username" />
            </el-form-item>
            <el-form-item label="Пароль">
              <el-input v-model="newUser.password" />
            </el-form-item>
            <el-form-item label="Роль">
              <el-select v-model="newUser.role" placeholder="Выберите роль">
                <el-option label="Пользователь" value="user" />
                <el-option label="Администратор" value="admin" />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="addUser(addUserForm)">Добавить</el-button>
          </el-form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore();

const addUserForm = ref()

const newUser = ref({
  username: '',
  password: '',
  role: ''
});

const addUser = async (formEl) => {
  if (!formEl) return;
  if (newUser.value.username && newUser.value.password && newUser.value.role) {
    await usersStore.addUser(newUser.value);
    newUser.value.username = '';
    newUser.value.password = '';
    newUser.value.role = '';
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
    isLoading.value = false; // В любом случае выключаем индикатор загрузки
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