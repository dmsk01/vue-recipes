<script setup>
import { computed } from 'vue';
import { useRootStore } from '@/stores/root'; 
import AppLayout from '@/layouts/AppLayout.vue';

const rootStore = useRootStore();

const categories = computed(() => rootStore.categories)
</script>

<template>
  <AppLayout>
    <template #title>Categories</template>
    <template #main>
      <el-table :data="categories">
        <el-table-column prop="strCategory" label="Category" />
      </el-table>
    </template>
  </AppLayout>
</template>
