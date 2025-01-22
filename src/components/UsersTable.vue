<template>
  <div class="user-list">
    <h2 class="title">Пользователи</h2>
    <div v-if="isLoading">Загрузка пользователей...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else>
      <p id="selected-employee" v-if="selectedUser">
        Selected employee: {{ selectedUser.username }}
      </p>
      <DxDataGrid @editor-preparing="onEditorPreparing" :columns="columns" :editing="editingOptions" id="dataGrid"
        :data-source="localUsers" key-expr="id" @selection-changed="selectUser" @rowUpdating="onRowUpdating"
        @rowRemoving="onRowRemoving" @rowInserting="onRowInserting">
        <DxSelection mode="single" />
      </DxDataGrid>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRaw } from "vue";
import { ElMessage } from "element-plus";
import DxDataGrid, {  DxSelection } from 'devextreme-vue/data-grid';
import { useUsers } from "@/composables/useUsers";

const {
  users,
  isLoading,
  error,
  addUserMutation,
  editUserMutation,
  deleteUserMutation
} = useUsers();

const selectedUser = ref();
const localUsers = ref([]);

const columns = ref([
  { dataField: 'id', allowEditing: false, caption: "id" },
  {
    dataField: 'username', allowEditing: true, caption: "Имя пользователя",
    validationRules: [{ type: 'required', message: 'Username is required' }]
  },
  {
    dataField: 'role', allowEditing: true, caption: "Роль",
    editorType: 'dxSelectBox',
    editorOptions: { items: ['admin', 'user'] },
    validationRules: [{ type: 'required', message: 'Role is required' }]
  },
  {
    dataField: 'password', visible: false, caption: "Пароль",
  }
]);

let isAdding = false;

const editingOptions = ref({
  mode: 'form',
  allowUpdating: true,
  allowAdding: true,
  allowDeleting: true,
  form: {
    items: [
      { dataField: 'username' },
      { dataField: 'role', editorType: 'dxSelectBox', editorOptions: { items: ['admin', 'user'] } },
      {
        dataField: 'password',
        editorType: 'dxTextBox',
        editorOptions: { mode: 'password' }, 
      }
    ]
  },
  onRowUpdating: () => (isAdding = false),
  onRowInserting: () => (isAdding = true),
});


const selectUser = (e) => {
  e.component.byKey(e.currentSelectedRowKeys[0]).done(employee => {
    if (employee) {
      selectedUser.value = employee;
    }
  });
}

const onRowUpdating = (e) => {
  const updatedData = { ...e.oldData, ...e.newData };

  // Если новое значение пароля введено, обновляем его
  if (updatedData.newPassword) {
    updatedData.password = updatedData.newPassword;
  }

  // Удаляем вспомогательные поля
  delete updatedData.newPassword;
  delete updatedData.changePassword;

  editUserMutation.mutate({ ...updatedData });
  ElMessage.success(`${updatedData.username} успешно обновлён!`);
}
const onRowRemoving = (e) => {
  console.log('Row deleting', e.data.id);
  deleteUserMutation.mutate(e.data.id);
}

const onRowInserting = (e) => {
  const newUser = { ...e.data };
  if (!newUser.password) {
    e.cancel = true;
    ElMessage.error('Пароль обязателен');
    return;
  }
  addUserMutation.mutate(newUser)
}

const onEditorPreparing = (e) => {
  if (e.dataField === 'password') {
    if (isAdding) {
      // Обязательное поле при добавлении
      e.editorOptions.validationRules = [
        { type: 'required', message: 'Пароль обязателен при добавлении' }
      ];
    } else {
      // Убираем обязательность при редактировании
      e.editorOptions.validationRules = [];
    }
  }
};

watch(users, (newVal) => {
  localUsers.value = Array.isArray(newVal) ? toRaw(newVal) : []
},
  { immediate: true }
)

</script>

<style scoped></style>
