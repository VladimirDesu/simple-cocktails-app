<script setup>
  import { ref, provide, computed } from 'vue';
  import imageDefault from '../assets/img/bg-1.jpg';
  import { useRoute, useRouter } from 'vue-router';
  import imgArrow from '../assets/img/arrow.svg';

  const route = useRoute();
  const router = useRouter();

  const imgActive = ref(imageDefault);

  const buttonActive = computed(
    () => route.name !== 'home' || imgActive.value !== imageDefault
  );

  let onClickPrev;

  const useBack = (callback) => {
    return (onClickPrev = callback);
  };

  const goToCocktailRandom = () => {
    router.push('/cocktailRandom');

    if (route.name === 'cocktailRandom') router.go();
  };

  provide('imgActive', imgActive);
  provide('useBack', useBack);
</script>

<template>
  <div class="grid grid-cols-2 bg-bgBlack min-h-screen">
    <div
      :style="`background-image: url(${imgActive})`"
      class="img bg-no-repeat bg-cover"
    ></div>
    <div class="flex flex-col">
      <div class="grid grid-cols-2 pt-8 px-10 mb-5">
        <button v-if="buttonActive" @click="onClickPrev">
          <img :src="imgArrow" />
        </button>
        <button
          @click="goToCocktailRandom"
          class="py-2 px-4 bg-accent rounded text-primary transition hover:brightness-110 justify-self-end col-start-2 self-start"
        >
          Get random cocktail
        </button>
      </div>

      <div class="flex items-center justify-center flex-1 w-full">
        <div class="max-w-[600px]">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .img {
    background-position: 50% 50%;
  }
</style>
