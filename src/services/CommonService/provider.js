import axios from "axios";
import { URL_AREAS, URL_CATEGORIES, URL_INGREDIENTS } from '@/constants'

export const getAreas = async () => {
  const data = await axios.get(URL_AREAS);

  return data?.data;
}

export const getCatergories = async () => {
  const data = await axios.get(URL_CATEGORIES);

  return data?.data;
}

export const getIngredients = async () => {
  const data = await axios.get(URL_INGREDIENTS);

  return data?.data;
}
