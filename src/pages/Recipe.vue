<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { RecipeService, CommonService } from '@/services';
import AppLayout from '@/layouts/AppLayout.vue';
import AppButton from '@/components/AppButton.vue';
import AppLoader from '@/components/AppLoader.vue';
import { useRootStore } from '@/stores/root';
import { notify } from '@/utils';

const route = useRoute();
const recipeId = route.params.id;
const recipe = ref(RecipeService.getEmptyRecipe());
const recipeUpdated = ref(RecipeService.getEmptyRecipe());
const isCreatingMode = ref(true);
const isLoading = ref(false);
const rootStore = useRootStore();
const areas = computed(() => rootStore.areas);
const categories = computed(() => rootStore.categories);
const recipeIngredients = ref([CommonService.getEmptyIngredient()])

const normalizeRecipeIngredients = () => {
  const normalizeIngredients = [];

  for (let i = 1; i <= 20; i++) {
    if (recipe.value[`strIngredient${i}`]) {
      const ingr = {
        id: Math.random().toString(36).slice(2),
        title: recipe.value[`strIngredient${i}`],
        measure: recipe.value[`strMeasure${i}`]
      }

      normalizeIngredients.push(ingr);
    }
  }

  recipeIngredients.value = normalizeIngredients;
}

const denormalizeRecipeIngredients = (recipe) => {
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeIngredients.value[i - 1];

    if (ingredient?.title && ingredient?.measure) {
      recipe[`strIngredient${i}`] = ingredient.title;
      recipe[`strMeasure${i}`] = ingredient.measure;
    } else {
      recipe[`strIngredient${i}`] = '';
      recipe[`strMeasure${i}`] = '';
    }
  }
}

const addIngredient = () => {
  recipeIngredients.value.push(
    CommonService.getEmptyIngredient()
  )
}

const removeIngredient = (index) => {
  recipeIngredients.value.splice(index, 1);
}

const createRecipe = async () => {
  try {
    const params = { ...recipeUpdated.value }
    denormalizeRecipeIngredients(params);
    isLoading.value = true;
    await RecipeService.createRecipe();
    setTimeout(() => {
      isLoading.value = false;
      notify('Создано', `Рецепт ${params.strMeal} добавлен`, 'success')
    }, 600)
  } catch (error) {
    console.log(error);
  }
}

const updateRecipe = async () => {
  try {
    const params = { ...recipeUpdated.value }
    denormalizeRecipeIngredients(params);
    isLoading.value = true;
    await RecipeService.updateRecipe();
    setTimeout(() => {
      isLoading.value = false;
      notify('Обновлено', `Рецепт ${params.strMeal} обновлен`, 'success')
    }, 600)
  } catch (error) {
    console.log(error);
  }
}

const createOuUpdateRecipe = () => {
  isCreatingMode.value ? createRecipe() : updateRecipe();
}

onMounted(async () => {
  if (parseInt(recipeId)) {
    await fetchRecipe();
    normalizeRecipeIngredients();
  }
});

const fetchRecipe = async () => {
  try {
    isLoading.value = true;
    const data = await RecipeService.getRecipesById(recipeId);
    recipe.value = { ...data };
    recipeUpdated.value = { ...data };
    isCreatingMode.value = false;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <AppLayout>
    <template #title>{{ isCreatingMode ? 'Новый рецепт' : recipeUpdated.strMeal }}</template>
    <template #controls>
      <AppButton text="Сохранить" @click="createOuUpdateRecipe" />
    </template>
    <template #main>
      <AppLoader v-if="isLoading" />
      <div v-else class="wrapper">
        <div class="row">
          <div class="col">
            <h3 class="label">Title</h3>
            <el-input v-model="recipeUpdated.strMeal" placeholder="Title" />
          </div>
          <div class="col">
            <h3 class="label">Area</h3>
            <el-select v-model="recipeUpdated.strArea" placeholder="Area">
              <el-option v-for="item in areas" :key="item.strArea" :label="item.strArea" :value="item.strArea" />
            </el-select>
          </div>
          <div class="col">
            <h3 class="label">Categories</h3>
            <el-select v-model="recipeUpdated.strCategory" placeholder="Area">
              <el-option v-for="item in categories" :key="item.strCategory" :label="item.strCategory"
                :value="item.strCategory" />
            </el-select>
          </div>
          <div class="col">
            <h3 class="label">Instruction</h3>
            <el-input v-model="recipeUpdated.strInstructions" :autosize="{ minRows: 2, maxRows: 5 }" type="textarea"
              placeholder="Please input the instructions" />
          </div>
          <div class="col">
            <div class="ingredients">
              <h3 class="label">Ingredients</h3>
              <ul v-for="(ingredient, indx) in recipeIngredients" :key="`${ingredient.id}${indx}`" class="row">
                <li class="row">
                  <span class="number" style="min-width: 20px; align-self: center; text-align: center;">
                    {{ indx + 1 }}
                  </span>

                  <div>
                    <el-input v-model="recipeIngredients[indx].measure" placeholder="Measure" />
                  </div>

                  <div>
                    <el-input v-model="recipeIngredients[indx].title" placeholder="Title" />
                  </div>

                  <AppButton text="Remove ingredient" @click="() => removeIngredient(indx)" />

                </li>
              </ul>
              <AppButton text="Add ingredient" @click="addIngredient" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
