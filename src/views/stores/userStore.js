import {defineStore} from "pinia";
import { ref } from "vue";

export const userStore = defineStore("user",() =>{
    const drawer = ref(false);
    const drawerDetail = ref(false);
    const navChange = ref(false);
    const isInventory = ref(false);
    const isSignin = ref(false);
    const userData = ref({
      username: "",
      email: "",
      password: "",
      dateOfBirth: "1980-01-01",
      phone: "",
    });
    const cardData = ref({
        image: null,
        icon: null,
        price: "",
        title: "",
        status: "",
        detailheader:
          "",
        firstDetail:
          "",
        secondDetail:
          "",
      });
    const detailCard = ref({
        image: null,
        icon: null,
        price: "",
        title: "",
        status: "",
        detailheader:
          "",
        firstDetail:
          "",
        secondDetail:
          "",
      });
return{

    //states
    drawer,
    cardData,
    isInventory,
    navChange,
    isSignin,
    drawerDetail
    ,detailCard,
    userData
};
}, {
  persist: [
    {
      paths: ["signInData", "rememberMe"],
      storage: localStorage,
    },
    {
      paths: ["userData", "jwt"],
      storage: sessionStorage,
    },
  ],
});
/* eslint-enable */
