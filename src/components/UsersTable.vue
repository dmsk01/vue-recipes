<template>
  <div class="user-list">
    <h2 class="title">Пользователи</h2>
    <el-table :data="usersStore.users" style="width: 80%">
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column label="Имя">
        <template #default="{ row }">
          <template v-if="row.isEditing">
            <el-input v-model="row.username" size="small" />
          </template>
          <template v-else>
            {{ row.username }}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="Роль">
        <template #default="{ row }">
          <template v-if="row.isEditing">
            <el-select v-model="row.role" placeholder="Выберите роль">
              <el-option label="Пользователь" value="user" />
              <el-option label="Администратор" value="admin" />
            </el-select>
          </template>
          <template v-else>
            {{ row.role }}
          </template>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Действия" min-width="150">
        <template #default="{ row }">
          <template v-if="row.isEditing">
            <el-button size="small" type="success" @click="saveRow(row)"
              >Сохранить</el-button
            >
            <el-button size="small" type="danger" @click="cancelEdit(row)"
              >Отмена</el-button
            >
          </template>
          <template v-else>
            <el-button link type="primary" size="small" @click="editRow(row)"
              >Редактировать</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsersStore } from "@/stores/users";

const usersStore = useUsersStore();
const isLoading = ref(false);

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    await usersStore.getUsers();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const editRow = (row) => {
  row.isEditing = true;
  row.originalData = { ...row };
};

const saveRow = async (row) => {
  try {
    row.isEditing = false;
    await usersStore.editUser(row.id, {
      username: row.username,
      role: row.role,
    });
    delete row.originalData;
  } catch (error) {
    console.error("Error saving user data:", error);
    cancelEdit(row);
  }
};

const cancelEdit = (row) => {
  Object.assign(row, row.originalData);
  row.isEditing = false;
  delete row.originalData;
};
</script>

<style scoped></style>
