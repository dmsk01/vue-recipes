<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import AppMenu from "@/components/AppMenu.vue";
import IconPerson from "@/components/icons/IconPerson.vue";
import { useAuthStore } from "@/stores/auth";
import { ROUTES_PATHS } from "@/constants";

const router = useRouter();
const authStore = useAuthStore();

const onSubmit = async () => {
  try {
    await authStore.logout();
    router.push(ROUTES_PATHS.LOGIN);
    ElMessage.success("Successfully logout!");
  } catch (error) {
    ElMessage.error("Something went wrong! " + error.message);
  }
};
</script>

<template>
  <div class="root">
    <aside class="menu-inner">
      <AppMenu />
    </aside>
    <div class="right">
      <header class="header">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="controls">
          <slot name="controls"></slot>
        </div>
        <el-dropdown v-if="authStore.isAuthenticated" placement="bottom-end">
          <el-button class="logo">
            <IconPerson />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>{{ authStore.user.name }}</el-dropdown-item>
              <el-dropdown-item divided @click="onSubmit"
                >Logout</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </header>
      <main class="inner">
        <slot name="main"></slot>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/index.scss";

.root {
  display: flex;
}

.right {
  flex: 1 1 auto;
  padding: 15px 10px;
}

.menu-inner {
  width: 70px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: $blue;
}

.inner {
  margin-top: 20px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid $border;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
  margin-bottom: 10px;
}
</style>
