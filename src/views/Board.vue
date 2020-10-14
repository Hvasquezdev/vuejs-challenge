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
        />
      </board-column>
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
    })
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
</style>
