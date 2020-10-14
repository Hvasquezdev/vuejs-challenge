import Vue from 'vue';
import Vuex from 'vuex';

import defaultBoard from '@/dummy/defaultBoard';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: defaultBoard
  },
  mutations: {},
  actions: {},
  modules: {}
});
