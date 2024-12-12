<template>
  <div class="menu">
    <el-menu :router="true" active-text-color="#ffd04b" class="nav el-menu-vertical-demo">
      <el-menu-item :index="ROUTES_PATHS.HOME" :class="['item', isPathActive(ROUTES_PATHS.HOME) && 'active']">
        <el-icon size="24">
          <Food />
        </el-icon>
      </el-menu-item>
      <el-menu-item :index="ROUTES_PATHS.CATEGORIES"
        :class="['item', isPathActive(ROUTES_PATHS.CATEGORIES) && 'active']">
        <el-icon size="24">
          <Dish />
        </el-icon>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ROUTES_PATHS } from '@/constants';

const router = useRouter();
const route = useRoute();
const isPathActive = (path) => {
  return route.path === path;
}

onMounted(isPathActive)

</script>


<style lang="scss" scoped>
@import "@/assets/styles/index.scss";

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  border-right: 1px solid $border;
  padding: 10px;
  background: #eee;
}

.nav {
  border: none;
}

.item {
  background-color: $lightBlue;

  color: white;

  &.active {
    background-color: $violet;
  }
}
</style>
