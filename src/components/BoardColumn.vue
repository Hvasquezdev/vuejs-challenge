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
    <div class="flex items-center">
      <base-input
        placeholder="Column name"
        color="gray-600"
        v-model.trim="columnName"
        @keyup.enter="updateColumnName"
      />

      <base-button
        v-if="!confirmDeleteColumn"
        class="column-delete"
        display="flex"
        bg-color="red-300"
        px="0"
        py="0"
        font-weight="normal"
        rounded
        @click="confirmDeleteColumn = true"
      >
        x
      </base-button>
      <base-button
        v-else
        display="flex"
        class="column-delete"
        bg-color="red-300"
        font-weight="normal"
        px="2"
        py="0"
        rounded
        @click="removeColumn"
      >
        Confirm
      </base-button>
    </div>

    <base-button
      rounded
      py="1"
      px="2"
      bg-color="green-300"
      class="mb-2"
      @click="orderDesc = !orderDesc"
    >
      Order {{ orderDesc ? 'desc' : 'asc' }}
    </base-button>

    <section class="task-list">
      <slot v-bind:tasks="sortedTasks" />
    </section>

    <base-input
      placeholder="+ Enter new task"
      full-width
      color="gray-500"
      font-weight="normal"
      v-model="taskName"
      @keyup.enter="createTask"
    />
  </div>
</template>

<script>
import movingTasksAndColumns from '@/mixins/movingTasksAndColumns';
import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';

export default {
  name: 'BoardColumn',

  mixins: [movingTasksAndColumns],

  components: {
    BaseButton,
    BaseInput
  },

  props: {
    column: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      taskName: null,
      columnName: null,
      confirmDeleteColumn: false,
      orderDesc: false
    };
  },

  computed: {
    sortedTasks() {
      const tasks = [...this.column.tasks];
      return tasks.sort(this.compareTasks);
    }
  },

  beforeMount() {
    this.columnName = this.column.name;
  },

  methods: {
    compareTasks(a, b) {
      const aName = a.name.split('')[0].toUpperCase();
      const bName = b.name.split('')[0].toUpperCase();

      if (this.orderDesc) {
        return aName > bName ? 1 : -1;
      }

      return aName < bName ? 1 : -1;
    },
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
    removeColumn() {
      this.$store.commit('REMOVE_COLUMN', {
        column: this.column
      });
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
.column-delete {
  @apply flex-shrink-0 cursor-pointer;
  height: 30px;
  min-width: 30px;
}
</style>
