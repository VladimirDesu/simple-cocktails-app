<script setup>
  import { inject, onMounted, computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRootStore } from '@/stores/root';

  import imageMain from '../assets/img/bg-1.jpg';
  import imagePng from '../assets/img/cocktails-1.png';
  import imageCocktails from '../assets/img/bg-2.jpg';

  import CocktailCard from '@/components/CocktailCard.vue';

  const imageBg = inject('imgActive');
  const useBack = inject('useBack');

  const rootStore = useRootStore();

  const { ingredients, cocktails, ingredient } = storeToRefs(rootStore);

  const cocktailsActive = computed(() => cocktails.value.length !== 0);

  const onChangeSelect = async (event) => {
    await rootStore.fetchCocktails(event.target.value);

    ingredient.value = event.target.value;
  };

  const setActiveImageDependingCocktails = () => {
    !cocktailsActive.value
      ? (imageBg.value = imageMain)
      : (imageBg.value = imageCocktails);
  };

  useBack(() => {
    cocktails.value = [];
  });

  watch(cocktailsActive, () => {
    setActiveImageDependingCocktails();
  });

  onMounted(async () => {
    setActiveImageDependingCocktails();

    await rootStore.fetchIngredients();
  });
</script>

<template>
  <section>
    <div v-if="cocktails.length === 0" class="flex flex-col items-center">
      <h1 class="title">Choose your drink</h1>
      <select
        @change="onChangeSelect"
        class="border border-secondary rounded p-3 w-56 mt-20 text-secondary bg-transparent"
      >
        <option value="Choose main ingredient" disabled selected hidden>
          Choose main ingredient
        </option>
        <option
          class="text-bgBlack"
          v-for="item in ingredients"
          :key="item.strIngredient1"
          :label="item.strIngredient1"
          :value="item.strIngredient1"
        />
      </select>

      <p class="description max-w-lg mt-12">
        Try our delicious cocktail recipes for every occasion. Find delicious
        cocktail recipes by ingredient through our cocktail generator.
      </p>

      <img class="mt-16" :src="imagePng" alt="Коктели" />
    </div>
    <div v-else class="flex flex-col items-center">
      <h1 class="title px-16">COCKTAILS WITH {{ ingredient }}</h1>
      <div
        class="scrollbar mx-auto mt-20 w-[600px] grid grid-cols-3 px-4 gap-16 max-h-96 overflow-y-auto"
      >
        <CocktailCard
          v-for="item in cocktails"
          :key="item.idDrink"
          :title="item.strDrink"
          :imageUrl="item.strDrinkThumb"
          :idDrink="item.idDrink"
        />
      </div>
    </div>
  </section>
</template>
