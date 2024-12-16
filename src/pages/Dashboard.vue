<template>
  <AppLayout>
    <template #title>Админка</template>
    <template #main>
      <div class="admin-dashboard">
        <div class="user-list">
          <h2 class="title">Пользователи</h2>
          <el-table :data="users" style="width: 100%">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="name" label="Имя" />
            <el-table-column prop="role" label="Роль" />
          </el-table>
        </div>

        <div class="add-user">
          <h2 class="title">Добавить нового пользователя</h2>
          <el-form :model="newUser" @submit.native.prevent="addUser">
            <el-form-item label="Имя">
              <el-input v-model="newUser.name" />
            </el-form-item>
            <el-form-item label="Роль">
              <el-select v-model="newUser.role" placeholder="Выберите роль">
                <el-option label="Пользователь" value="user" />
                <el-option label="Администратор" value="admin" />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="addUser">Добавить</el-button>
          </el-form>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';

const users = ref([
  { id: 1, name: 'Иван Иванов', role: 'user' },
  { id: 2, name: 'Мария Петрова', role: 'admin' }
]);

const newUser = ref({
  name: '',
  role: ''
});

const addUser = () => {
  if (newUser.value.name && newUser.value.role) {
    users.value.push({
      id: users.value.length + 1,
      name: newUser.value.name,
      role: newUser.value.role
    });
    newUser.value.name = '';
    newUser.value.role = '';
  } else {
    alert('Заполните все поля');
  }
};

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