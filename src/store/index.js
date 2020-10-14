import Vue from 'vue';
import Vuex from 'vuex';

import defaultBoard from '@/dummy/defaultBoard';
import { saveStoreState, uuid } from '@/utils/';

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
  mutations: {
    CREATE_TASK(state, { columnId, name }) {
      const column = state.board.columns.find(col => col.id === columnId);
      const columnIndex = state.board.columns.indexOf(column);

      state.board.columns[columnIndex].tasks.push({
        name,
        id: uuid(),
        description: ''
      });
    },
    UPDATE_TASK(state, { columnId, taskId, value }) {
      const column = state.board.columns.find(col => col.id === columnId);
      const columnIndex = state.board.columns.indexOf(column);
      const task = column.tasks.find(task => task.id === taskId);
      const taskIndex = column.tasks.indexOf(task);

      state.board.columns[columnIndex].tasks[taskIndex] = value;
    }
  },
  actions: {},
  modules: {}
});
