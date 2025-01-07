<template>
  <div class="user-list">
    <h2 class="title">Пользователи</h2>
    <div v-if="isLoading">Загрузка пользователей...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else>
      <el-table :data="users" style="width: 80%">
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
              <el-button size="small" type="success" @click="saveRow(row)">Сохранить</el-button>
              <el-button size="small" type="danger" @click="cancelEdit(row)">Отмена</el-button>
            </template>
            <template v-else>
              <el-button link type="primary" size="small" @click="editRow(row)">Редактировать</el-button>
              <el-button link type="danger" size="small" @click="dialogVisible = true">Удалить</el-button>
              <el-dialog v-model="dialogVisible" title="Tips" width="500">
                <span>Уверены что хотите удалить пользователя
                  {{ row.username }}</span>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="deleteRow(row)">
                      Confirm
                    </el-button>
                  </div>
                </template>
              </el-dialog>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useUsers } from "@/composables/useUsers";

const {
  users,
  isLoading,
  error,
  editUserMutation,
  deleteUserMutation
} = useUsers();

const dialogVisible = ref(false);

const editRow = (row) => {
  row.isEditing = true;
  row.originalData = { ...row };
};

const saveRow = async (row) => {
  try {
    row.isEditing = false;
    console.log(row.id);

    editUserMutation.mutate({
      userId: row.id,
      newUser: {
        username: row.username,
        role: row.role,
      }
    })
    delete row.originalData;
    ElMessage.success(`${row.username} successfully changed!`);
  } catch (error) {
    console.error("Error saving user data:", error);
    ElMessage.error(`Something went wrong while changing ${row.username}`);
    cancelEdit(row);
  }
};

const cancelEdit = (row) => {
  Object.assign(row, row.originalData);
  row.isEditing = false;
  delete row.originalData;
};

const deleteRow = async (row) => {
  deleteUserMutation.mutate(row.id);
  dialogVisible.value = false;
};

</script>

<style scoped></style>
