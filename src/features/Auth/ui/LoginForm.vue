<template>
  <form @submit="handleSubmit">
    <DxForm id="form" ref="formRef" :form-data="formData">
      <DxSimpleItem :is-required="true" data-field="username" />
      <DxSimpleItem :is-required="true" data-field="password" />
      <DxButtonItem :button-options="submitButtonOptions" />
    </DxForm>
  </form>
</template>

<script setup>
import { ref } from "vue";
import DxForm, { DxSimpleItem, DxButtonItem } from 'devextreme-vue/form';

const submitButtonOptions = {
  text: "Log in",
  type: 'success',
  useSubmitBehavior: true,
}

const emit = defineEmits(["submit"]);

const formRef = ref(null);

const formData = ref({
  username: "admin",
  password: "your_password",
});

const handleSubmit = (e) => {
  e.preventDefault();
  const formInstance = formRef.value?.instance;
  if (!formInstance.validate().isValid) {
    console.error("Invalid form");
    return;
  }
  emit("submit", { ...formData.value });

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
