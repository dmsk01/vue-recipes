<template>
  <div class="add-user">
    <h2 class="title">Добавить нового пользователя</h2>
    <el-form ref="addUserFormRef" style="max-width: 50%">
      <el-form-item label="Имя" label-position="top">
        <el-input v-model="newUser.username" />
      </el-form-item>
      <el-form-item label="Пароль" label-position="top">
        <el-input v-model="newUser.password" />
      </el-form-item>
      <el-form-item label="Роль" label-position="top">
        <el-select v-model="newUser.role" placeholder="Выберите роль">
          <el-option label="Пользователь" value="user" />
          <el-option label="Администратор" value="admin" />
        </el-select>
      </el-form-item>
      <el-button :loading="isLoading" @click.native.prevent="handleSubmit(addUserFormRef)"
        type="primary">Добавить</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsers } from "@/composables/useUsers";

const {
  isLoading,
  addUserMutation,
} = useUsers();

const addUserFormRef = ref();

const addUser = async (newUser) => {
  if (!newUser) return;
  const { username, password, role } = newUser;
  if (username && password && role) {
    await addUserMutation.mutate(newUser);
  } else {
    alert("Заполните все поля");
  }
};

const newUser = ref({
  username: "",
  password: "",
  role: "",
});

const emit = defineEmits(["addUser"]);

const handleSubmit = (formEl) => {
  if (!formEl) return;
  addUser({ ...newUser.value });

  newUser.value.username = "";
  newUser.value.password = "";
  newUser.value.role = "";
};
</script>

<style lang="scss" scoped></style>
