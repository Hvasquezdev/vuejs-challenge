<template>
  <button
    class="task"
    v-on="$listeners"
    draggable
    @drop.stop="moveTaskOrColumn($event, column, task)"
    @dragstart="pickupTask($event, task.id, column.id)"
    @dragover.prevent=""
    @dragenter.prevent=""
  >
    <span class="task-title">
      {{ task.name }}
    </span>

    <p v-if="task.description" class="task-description">
      {{ task.description }}
    </p>
  </button>
</template>

<script>
import movingTasksAndColumns from '@/mixins/movingTasksAndColumns';

export default {
  name: 'BoardColumnTask',

  mixins: [movingTasksAndColumns],

  props: {
    task: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },

  methods: {
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
    }
  }
};
</script>

<style lang="postcss">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-700 no-underline text-left w-full;
}
.task-title {
  @apply w-full flex-shrink-0 font-bold;
}
.task-description {
  @apply w-full flex-shrink-0 mt-1 text-sm;
}
</style>
