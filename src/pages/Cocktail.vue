<script setup>
  import axios from 'axios';
  import { ref, onMounted, inject, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { COCKTAIL_BY_ID_URL, COCKTAIL_RANDOM_URL } from '../constants';

  import imageHeart from '../assets/img/heart.svg';

  const imageBg = inject('imgActive');
  const useBack = inject('useBack');

  const cocktail = ref({});

  const route = useRoute();
  const router = useRouter();

  useBack(() => {
    router.go(-1);
  });

  const convertDataToNormal = (data) => {
    let ingredients = [];

    for (let i = 1; i <= 15; i++) {
      if (!data.drinks[0][`strIngredient${i}`]) break;

      ingredients.push({
        ingredient: data.drinks[0][`strIngredient${i}`],
        measure: data.drinks[0][`strMeasure${i}`],
      });
    }

    return {
      idDrink: data.drinks[0].idDrink,
      name: data.drinks[0].strDrink,
      insctructions: data.drinks[0].strInstructions,
      imageUrl: data.drinks[0].strDrinkThumb,
      ingredients,
    };
  };

  const fetchCocktail = async (cocktailId) => {
    try {
      const { data } = await axios.get(`${COCKTAIL_BY_ID_URL}${cocktailId}`);

      cocktail.value = convertDataToNormal(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCocktailRandom = async () => {
    try {
      const { data } = await axios.get(COCKTAIL_RANDOM_URL);

      cocktail.value = convertDataToNormal(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const checkRouteName = async () => {
    if (route.name === 'cocktailRandom') {
      await fetchCocktailRandom();
      imageBg.value = cocktail.value.imageUrl;
    } else {
      await fetchCocktail(route.params.id);
      imageBg.value = cocktail.value.imageUrl;
    }
  };

  watch(() => route.name, checkRouteName);

  onMounted(checkRouteName);
</script>

<template>
  <h1 class="title mb-14">{{ cocktail.name }}</h1>
  <ul class="scrollbar flex flex-col gap-4 w-full max-h-96 overflow-y-auto">
    <li v-for="item in cocktail.ingredients" class="flex description text-lg">
      <img class="mr-5" :src="imageHeart" />
      {{ item.ingredient }} | {{ item.measure }}
    </li>
  </ul>
  <p class="description mt-20">{{ cocktail.insctructions }}</p>
</template>
