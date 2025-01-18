<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RecipeService } from "@/services";
import AppLayout from "@/layouts/AppLayout.vue";
import AppButton from "@/components/AppButton.vue";
import AppLoader from "@/components/AppLoader.vue";
import AlphabetMenu from "@/components/AlphabetMenu.vue";
import RecipesTable from "@/components/RecipesTable.vue";

const route = useRoute();
const router = useRouter();

const currentRecipeChar = ref(route.params.char || "a"); // Берем букву из маршрута или используем "a" по умолчанию
const recipes = ref();
const isLoading = ref(false);

onMounted(async () => {
  await fetchRecipes();
});

const fetchRecipes = async () => {
  try {
    isLoading.value = true;
    const result = await RecipeService.getRecipesByLetter(
      currentRecipeChar.value
    );
    
    recipes.value = result;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false; // Выключаем индикатор загрузки
  }
};

// Следим за изменением параметра маршрута
watch(
  () => route.params.char,
  async (newChar) => {
    if (newChar) {
      currentRecipeChar.value = newChar;
      await fetchRecipes();
    }
  }
);
</script>

<template>
  <AppLayout>
    <template #title>Recipes</template>
    <template #controls>
      <router-link :to="RecipeService.getRecipePath('new')">
        <AppButton text="Добавить рецепт" />
      </router-link>
    </template>
    <template #main>
      <AppLoader v-if="isLoading" />
      <div v-else class="content">
        <AlphabetMenu @charChange="(char) => router.push({ params: { char } })" />
        <RecipesTable :recipes="recipes" />
      </div>
    </template>
  </AppLayout>
</template>
