import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import connection from "./modules/connection/index";
import balance from "./modules/balance/index";

const store = () => {
  return new Vuex.Store({
    modules: {
      connection,
      balance,
    }
  });
};

export default store;