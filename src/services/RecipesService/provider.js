import axios from "axios";
import { URL_RECIPES_BY_ID, URL_RECIPES_BY_LETTER } from '@/constants'

export const getRecipesByLetter = async (char) => {
  const data = await axios.get(URL_RECIPES_BY_LETTER + char);
  const result = data?.data[char];

  return result;
}

export const getRecipesById = async (id) => {
  const data = await axios.get(URL_RECIPES_BY_ID + id);

  return data?.data?.meals[0];
}

export const createRecipe = () => {

}

export const updateRecipe = () => { }