import Vue from 'vue';
import Vuex from 'vuex';

import defaultBoard from '@/dummy/defaultBoard';
import { saveStoreState } from '@/utils/';

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStoreState],
  state: {
    board
  },
  mutations: {},
  actions: {},
  modules: {}
});
