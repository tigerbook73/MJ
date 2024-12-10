import { defineStore } from "pinia";
import { UserModel } from "src/common/models/user.model";
import { ref } from "vue";

export const userStore = defineStore("mj", () => {
  const user = ref<UserModel | null>(null); // Empty string means not logged in

  return {
    user,
  };
});
