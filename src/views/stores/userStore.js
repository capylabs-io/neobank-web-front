import {defineStore} from "pinia";
import { ref } from "vue";

export const userStore = defineStore("user",() =>{
    const drawer = ref(false);
    const navChange = ref(false);
    const isInventory = ref(false);
    const cardData = ref({
        image: null,
        icon: null,
        price: "",
        title: "",
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
};
});
/* eslint-enable */
