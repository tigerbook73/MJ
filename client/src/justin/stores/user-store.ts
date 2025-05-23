import { defineStore } from "pinia";
import type { UserModel } from "@common/models/user.model";
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  const user = ref<UserModel | null>(null);

  return {
    user,
  };
});
