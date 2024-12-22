<template>
  <el-form
    ref="ruleFormRef"
    :rules="activeRules"
    :model="ruleForm"
    class="login-form"
    :inline="false"
  >
    <el-form-item>
      <el-radio-group
        v-model="isRegisterMode"
        size="small"
        @change="onModeChange"
      >
        <el-radio :value="false">Login</el-radio>
        <el-radio :value="true">Register</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- Поле для логина -->
    <el-form-item label="Login" prop="login">
      <el-input v-model="ruleForm.login" />
    </el-form-item>
    <!-- Поле для пароля -->
    <el-form-item label="Password" prop="password">
      <el-input v-model="ruleForm.password" type="password" />
    </el-form-item>
    <!-- Поле для подтверждения пароля в режиме регистрации -->
    <el-form-item
      v-if="isRegisterMode"
      label="Confirm Password"
      prop="confirmPassword"
    >
      <el-input v-model="ruleForm.confirmPassword" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">
        {{ isRegisterMode ? "Register" : "Login" }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ElMessage } from "element-plus";
import { ROUTES_PATHS } from "@/constants";

const router = useRouter();
const ruleFormRef = ref();
const authStore = useAuthStore();

const isRegisterMode = ref(false); // Флаг для определения текущего режима

const ruleForm = reactive({
  login: "admin",
  password: "your_password",
  confirmPassword: "", // Для режима регистрации
});

// Основные правила
const baseRules = {
  login: [
    { required: true, message: "Please input login", trigger: "blur" },
    { min: 3, max: 10, message: "Length should be 3 to 10", trigger: "change" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
};

// Динамические правила
const activeRules = computed(() => {
  if (isRegisterMode.value) {
    return {
      ...baseRules,
      confirmPassword: [
        {
          required: true,
          message: "Please confirm your password",
          trigger: "blur",
        },
        {
          validator: (rule, value) => value === ruleForm.password,
          message: "Passwords do not match",
          trigger: "blur",
        },
      ],
    };
  }
  return baseRules;
});

const onModeChange = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.clearValidate(); // Сбрасываем статус ошибок валидации
    ruleFormRef.value.resetFields(); // Сбрасываем модель
  }
};

const onSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        if (isRegisterMode.value) {
          await authStore.register({
            username: ruleForm.login,
            password: ruleForm.password,
          });
          ElMessage.success("Registered successfully!");
        } else {
          await authStore.login({
            username: ruleForm.login,
            password: ruleForm.password,
            role: "user",
          });

          ElMessage.success("Logged in successfully!");
          router.push(ROUTES_PATHS.HOME);
        }
      } catch (error) {
        ElMessage.error(error.message || "An error occurred");
      }
    } else {
      ElMessage.error("Validation failed!");
    }
  });
};
</script>

<style lang="scss">
.login-form {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  min-height: 100vh;
  max-width: 300px;
  margin: 0 auto;
}

.login-form .el-input {
  width: 220px;
}
</style>
