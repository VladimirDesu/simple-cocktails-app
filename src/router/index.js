import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
import Cocktail from '../pages/Cocktail.vue';
// import CocktailRandom from '../pages/CocktailRandom.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/cocktails/:id', name: 'cocktail', component: Cocktail },
  { path: '/cocktailRandom', name: 'cocktailRandom', component: Cocktail },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
