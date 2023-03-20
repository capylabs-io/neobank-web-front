import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    light: true,
    themes: {
      light: {
        primary: "#2970FF",
        secondary: "#f5f8ff",
        
        //TODO: Remove unnecessary colors
        introbtn: "#5752E3",
        footer: "#F7F6FF",
        expired: "#E7E7E7",
        grey1: "#D9D9D9",
        grey: "#9E9E9E",
        darkgrey: "#626262",
        cream: "#F2F2F2",
        cyan: "#00BCD9",
        lightcyan: "#F5F9FF",
        blue1: "#1B379A",
        lightblue: "#516FFD",
        blue: "#516FFD",
        indigo: "#3E49BC",
        purple: "#7F4FC9",
        deeppurple: "#682CBF",
        teal: "#009889",
        bluegrey: "#607D8F",
        lime: "#CEE000",
        lightgreen: "#87C735",
        green: "#34C02B",
        black: "#000000",
        white: "#F5F5F5",
        violet: "#5E6BE9",
        yellow: "#F9E283",
        amber: "#FFCD00",
        orange: "#FF9A00",
        deeporange: "#FF5500",
        lightred: "#EC4C32",
        red: "#D40C00",
        brown: "#7C5546",
        deepbrown: "#50332B",
        background: "#EAEEF4",
        greyblack: "#191919",
      },
    },
  },
});
