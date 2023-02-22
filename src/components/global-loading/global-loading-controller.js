import { defineStore } from "pinia";
export const loadingController = defineStore("globalLoadingController", {
  state: () => ({
    numberRequests: 0,
  }),
  actions: {
    increaseRequest() {
      this.numberRequests = this.numberRequests + 1;
    },
    decreaseRequest() {
      this.numberRequests = this.numberRequests - 1;
    },
  },
  computed: {
    requesting: (state) => state.numberRequests > 0,
  },
});
