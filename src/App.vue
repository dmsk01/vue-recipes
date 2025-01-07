<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import { useRootStore } from "./stores/root";
import { useAuthStore } from "./stores/auth";

const rootStore = useRootStore();

const authStore = useAuthStore();

onMounted(() => {
  authStore.loadUserFromCookies();
  if (authStore.isAuthenticated) {
    rootStore.getAreas();
    rootStore.getCategories();
    rootStore.getIngredients();
  }
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
@import url("@/assets/styles/index.scss");
</style>
