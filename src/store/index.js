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
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        id: uuid(),
        tasks: []
      });
    },
    UPDATE_TASK(state, { columnId, taskId, value }) {
      const column = state.board.columns.find(col => col.id === columnId);
      const columnIndex = state.board.columns.indexOf(column);
      const task = column.tasks.find(task => task.id === taskId);
      const taskIndex = column.tasks.indexOf(task);

      state.board.columns[columnIndex].tasks[taskIndex] = value;
    },
    UPDATE_COLUMN_NAME(state, { column, name }) {
      const columnIndex = state.board.columns.indexOf(column);
      state.board.columns[columnIndex].name = name;
    },
    MOVE_TASK(state, { from, to, taskIndex, toTaskIndex }) {
      const columns = [...state.board.columns];

      const fromColumn = { ...columns[from] };
      const toColumn = { ...columns[to] };

      const taskToMove = fromColumn.tasks.splice(taskIndex, 1)[0];
      const spliceIndex =
        toTaskIndex >= 0 ? toTaskIndex : toColumn.tasks.length;

      toColumn.tasks.splice(spliceIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromIndex, toIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromIndex, 1)[0];

      columnList.splice(toIndex, 0, columnToMove);
    },
    REMOVE_COLUMN(state, { column }) {
      const columnIndex = state.board.columns.indexOf(column);
      state.board.columns.splice(columnIndex, 1);
    },
    REMOVE_TASK(state, { column, task }) {
      const columnIndex = state.board.columns.indexOf(column);
      const taskIndex = column.tasks.indexOf(task);
      state.board.columns[columnIndex].tasks.splice(taskIndex, 1);
    }
  },
  actions: {},
  modules: {}
});
