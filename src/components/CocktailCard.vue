<script setup>
  defineProps({
    title: String,
    imageUrl: String,
    idDrink: String
  });
</script>

<template>
  <RouterLink :to="`/cocktails/${idDrink}`">
    <div>
      <img :src="imageUrl" :alt="title" />
      <h2 class="description mt-4">{{ title }}</h2>
    </div>
  </RouterLink>
</template>
