<template>
  <el-form
    ref="formRef"
    :rules="rules"
    :model="form"
    class="login-form"
    :inline="false"
  >
    <el-form-item label="Имя пользователя:" prop="username">
      <el-input class="login-input" v-model="form.username" />
    </el-form-item>
    <el-form-item label="Пароль:" prop="password">
      <el-input class="login-input" v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">
        Login
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, defineEmits } from "vue";

const formRef = ref();

const emit = defineEmits(["submit"]);

const form = reactive({
  username: "admin",
  password: "your_password",
});

const rules = {
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
    { min: 3, max: 10, message: "Length should be 3 to 10", trigger: "change" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
  ],
};

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if(valid){
      emit("submit", {...form});
    }
  })
}
</script>

<style lang="scss">
.login-form {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  max-width: 370px;
  margin: 0 auto;
}

.login-form label {
  min-width: 220px;
}
</style>