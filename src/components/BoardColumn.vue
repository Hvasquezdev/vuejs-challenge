<template>
  <div
    class="column"
    v-on="$listeners"
    draggable
    @drop="moveTaskOrColumn($event, column)"
    @dragstart.self="pickupColumn($event, column.id)"
    @dragover.prevent=""
    @dragenter.prevent=""
  >
    <input
      type="text"
      class="block p-2 bg-transparent outline-none font-bold cursor-pointer"
      placeholder="Column name"
      v-model.trim="columnName"
      @keyup.enter="updateColumnName"
    />

    <section class="task-list">
      <slot />
    </section>

    <input
      type="text"
      class="block p-2 w-full bg-transparent outline-none text-gray-500"
      placeholder="+ Enter new task"
      v-model="taskName"
      @keyup.enter="createTask"
    />
  </div>
</template>

<script>
import movingTasksAndColumns from '@/mixins/movingTasksAndColumns';

export default {
  name: 'BoardColumn',

  mixins: [movingTasksAndColumns],

  props: {
    column: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      taskName: null,
      columnName: null
    };
  },

  beforeMount() {
    this.columnName = this.column.name;
  },

  methods: {
    pickupColumn(e, columnId) {
      const column = this.board.columns.find(column => column.id === columnId);
      const columnIndex = this.board.columns.indexOf(column);

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('from-column-index', columnIndex);
      e.dataTransfer.setData('type', 'column');
    },
    updateColumnName(e) {
      this.$store.commit('UPDATE_COLUMN_NAME', {
        name: this.columnName,
        column: this.column
      });

      e.target.blur();
    },
    createTask() {
      this.$store.commit('CREATE_TASK', {
        columnId: this.column.id,
        name: this.taskName
      });

      this.taskName = null;
    }
  }
};
</script>

<style lang="postcss">
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded w-full max-w-xs;
}
.column-title {
  @apply flex items-center mb-2 font-bold;
}
</style>
