import { createRouter, createWebHistory } from "vue-router";
import WForm from '../components/WeatherForm/WForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: WForm,
    },
  ],
});

export default router;
