<template>
  <div class="board">
    <div class="board-columns">
      <board-column
        v-for="column in board.columns"
        :key="column.id"
        :column="column"
        :board="board"
      >
        <board-column-task
          v-for="task in column.tasks"
          :key="task.id"
          :task="task"
          :column="column"
          :board="board"
          @click="openTaskModal(task, column)"
        />
      </board-column>
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
