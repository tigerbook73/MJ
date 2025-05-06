import { defineStore } from "pinia";
import { UserModel } from "src/common/models/user.model";
import { computed, ref } from "vue";

export const userStore = defineStore("user", () => {
  const user = ref<UserModel | null>(null);

  function setUser(u: UserModel) {
    user.value = u;
  }

  function clearUser() {
    user.value = null;
  }

  const isLoggedIn = computed(() => !!user.value);

  return {
    user,
    setUser,
    clearUser,
    isLoggedIn,
  };
});
