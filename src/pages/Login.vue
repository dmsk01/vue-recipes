<template>
  <div class="page-wrapper">
    <h1>Вход в систему</h1>
    <LoginForm @submit="onSubmit"/>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useAuthStore, LoginForm } from "@/features/Auth";
import { ROUTES_PATHS } from "@/constants";

const router = useRouter();
const authStore = useAuthStore();

const onSubmit = async (credentials) => {
  try {
    await authStore.login(credentials);
    ElMessage.success("Logged in successfully!");
    router.push(ROUTES_PATHS.HOME);
  } catch (error) {
    ElMessage.error(error.message || "An error occurred during login.");
  }
};
</script>

<style lang="scss">
.page-wrapper {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
}

.login-form .el-input {
  width: 220px;
}
</style>
