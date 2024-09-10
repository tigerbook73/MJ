import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("mj", () => {
  const username = ref("Username");
  return {
    // state
    // actions
    username,
  };
});
