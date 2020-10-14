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
  getters: {
    getTask(state) {
      return id => {
        const columns = state.board.columns;

        for (let i = 0; i < columns.length; i++) {
          const task = columns[i].tasks.find(item => item.id === id);
          if (task && 'id' in task) return task;
        }
      };
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
