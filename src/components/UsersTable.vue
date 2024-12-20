<template>
  <div class="user-list">
    <h2 class="title">Пользователи</h2>
    <el-table :data="users" style="width: 50%">
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column prop="username" label="Имя" />
      <el-table-column prop="role" label="Роль" />
    </el-table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const { users } = defineProps({
  users: Array,
})

</script>

<style scoped></style>