<template>
  <div class="board">
    <div class="board-columns">
      <board-column
        v-for="column in board.columns"
        :key="column.id"
        :column="column"
        :board="board"
        draggable
        @drop="moveTaskOrColumn($event, column)"
        @dragstart.self="pickupColumn($event, column.id)"
        @dragover.prevent=""
        @dragenter.prevent=""
      >
        <board-column-task
          v-for="task in column.tasks"
          :key="task.id"
          :task="task"
          :column="column"
          :board="board"
          draggable
          @drop.stop="moveTaskOrColumn($event, column, task)"
          @dragstart="pickupTask($event, task.id, column.id)"
          @dragover.prevent=""
          @dragenter.prevent=""
          @click="openTaskModal(task, column)"
        />
      </board-column>

      <div class="column flex">
        <input
          type="text"
          class="p-2 flex-grow rounded outline-none text-gray-500"
          placeholder="New column name"
          v-model.trim="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div v-if="isTaskOpen" class="task-modal" @click.self="closeTaskModal">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BoardColumn from '@/components/BoardColumn';
import BoardColumnTask from '@/components/BoardColumnTask';

export default {
  name: 'Board',

  components: {
    BoardColumn,
    BoardColumnTask
  },

  data() {
    return {
      newColumnName: null
    };
  },

  computed: {
    ...mapState({
      board: 'board'
    }),
    isTaskOpen() {
      return this.$route.name === 'Task';
    }
  },

  methods: {
    openTaskModal(task, column) {
      this.$router.push({
        name: 'Task',
        params: {
          taskId: task.id,
          columnId: column.id
        }
      });
    },
    closeTaskModal() {
      this.$router.push({
        name: 'Board'
      });
    },
    createColumn() {
      if (!this.newColumnName) return;

      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      });

      this.newColumnName = null;
    },
    pickupTask(e, taskId, columnId) {
      const column = this.board.columns.find(column => column.id === columnId);
      const columnIndex = this.board.columns.indexOf(column);
      const task = column.tasks.find(task => task.id === taskId);
      const taskIndex = column.tasks.indexOf(task);

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('task-index', taskIndex);
      e.dataTransfer.setData('from-column-index', columnIndex);
      e.dataTransfer.setData('type', 'task');
    },
    pickupColumn(e, columnId) {
      const column = this.board.columns.find(column => column.id === columnId);
      const columnIndex = this.board.columns.indexOf(column);

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('from-column-index', columnIndex);
      e.dataTransfer.setData('type', 'column');
    },
    moveTaskOrColumn(e, toColumn, toTask = null) {
      const type = e.dataTransfer.getData('type');

      switch (type) {
        case 'task':
          this.moveTask(e, toColumn, toTask);
          break;

        default:
          this.moveColumn(e, toColumn);
          break;
      }
    },
    moveTask(e, toColumn, toTask) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const taskIndex = e.dataTransfer.getData('task-index');
      const column = this.board.columns.find(
        column => column.id === toColumn.id
      );
      const toColumnIndex = this.board.columns.indexOf(column);
      const toTaskIndex = column.tasks.indexOf(toTask);

      this.$store.commit('MOVE_TASK', {
        from: fromIndex,
        to: toColumnIndex,
        taskIndex,
        toTaskIndex
      });
    },
    moveColumn(e, to) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const toIndex = this.board.columns.indexOf(to);

      this.$store.commit('MOVE_COLUMN', {
        fromIndex,
        toIndex
      });
    }
  }
};
</script>

<style lang="postcss">
.board {
  @apply p-4 bg-teal-400 h-full overflow-y-hidden overflow-x-auto;
}
.board-columns {
  @apply flex flex-row items-start;
}
.task-modal {
  @apply absolute left-0 right-0 top-0 bottom-0 w-full h-full;
  background: rgba(0, 0, 0, 0.5);
}
</style>
