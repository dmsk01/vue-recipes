import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { CommonService } from '@/services'

export const useRootStore = defineStore('root', () => {
  const areas = ref(null);
  const categories = ref(null);
  const ingredients = ref(null);

  async function getAreas() {
    const data = await CommonService.getAreas();

    areas.value = data;
  }

  async function getCategories() {
    const data = await CommonService.getCatergories();

    categories.value = data;
  }

  async function getIngredients() {
    const data = await CommonService.getIngredients();

    ingredients.value = data;
  }

  return { areas, categories, ingredients, getAreas, getCategories, getIngredients }
})
