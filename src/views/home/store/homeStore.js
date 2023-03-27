import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const homeStore = defineStore("home", () => {
  const scrollY = ref(1);
  return { scrollY };
});
