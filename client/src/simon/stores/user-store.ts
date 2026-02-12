import { defineStore } from "pinia";
import type { UserModel } from "@mj/shared";
import { computed, ref } from "vue";
import { appStore } from "./app-store";

export const userStore = defineStore("user", () => {
  // user info
  const user = ref<UserModel | null>(null);
  const myPosition = ref<number | null>(null);

  // signed in state
  const signedIn = ref(false);

  function setUser(u: UserModel) {
    user.value = u;
  }

  function setSignedIn(value: boolean) {
    signedIn.value = value;

    if (!value) {
      // reset user
      if (user.value) {
        user.value.password = "";
      }
    }

    appStore().refreshAppState();
  }

  function clearUser() {
    // reset user
    user.value = null;
    signedIn.value = false;
    appStore().refreshAppState();
  }

  const isLoggedIn = computed(() => !!user.value);

  return {
    user,
    signedIn,
    setUser,
    setSignedIn,
    clearUser,
    isLoggedIn,
    myPosition,
  };
});
