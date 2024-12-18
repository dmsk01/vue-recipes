<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { RecipeService } from '@/services';
import AppLayout from '@/layouts/AppLayout.vue';
import AppButton from '@/components/AppButton.vue';
import AppLoader from '@/components/AppLoader.vue';
import RecipesTable from '@/components/RecipesTable.vue'

const recipes = ref();
const isLoading = ref(false);

onMounted(async () => { await fetchRecipes() });

const fetchRecipes = async () => {
  try {
    isLoading.value = true;
    const result = await RecipeService.getRecipesByLetter();
    recipes.value = result;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false; // В любом случае выключаем индикатор загрузки
  }
}

</script>

<template>
  <AppLayout>
    <template #title>Рецепты</template>
    <template #controls>
      <router-link :to="RecipeService.getRecipePath('new')">
        <AppButton text="Добавить рецепт" />
      </router-link>
    </template>
    <template #main>
      <AppLoader v-if="isLoading" />
      <RecipesTable v-else :recipes="recipes" />
    </template>
  </AppLayout>
</template>
