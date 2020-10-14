<template>
  <div class="column">
    <h2 class="column-title">
      {{ column.name }}
    </h2>

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
export default {
  name: 'BoardColumn',

  props: {
    column: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      taskName: null
    };
  },

  methods: {
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
