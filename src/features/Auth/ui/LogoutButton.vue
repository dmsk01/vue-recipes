<template>
  <DxButton styling-mode="contained" type="danger" @click="emit('logout')">
    Выйти
  </DxButton>
</template>

<script setup>
import { useAuthStore } from '../model/store';
import DxButton from 'devextreme-vue/button';

const authStore = useAuthStore();
const emit = defineEmits(['logout']);

const handleLogout = async () => {
  try {
    await authStore.logout();
    emit('logout');
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};
</script>
