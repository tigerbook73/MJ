import { defineStore } from "pinia";

export const userMjStore = defineStore("mj", {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
  },
});
