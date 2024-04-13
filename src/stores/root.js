import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { INGREDIENTS_URL, COCKTAIL_FROM_INGR_URL } from '../constants';

export const useRootStore = defineStore('root', () => {
  const ingredients = ref([]);
  const cocktails = ref([]);
  const ingredient = ref();

  const fetchIngredients = async () => {
    try {
      const { data } = await axios.get(INGREDIENTS_URL);

      ingredients.value = data.drinks;

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCocktails = async (ingr) => {
    try {
      const { data } = await axios.get(`${COCKTAIL_FROM_INGR_URL}${ingr}`);
      cocktails.value = data.drinks;

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    ingredients,
    cocktails,
    ingredient,
    fetchIngredients,
    fetchCocktails,
  };
});
