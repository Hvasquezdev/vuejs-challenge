<template>
  <div class="task-view">
    <div v-if="task" class="task-details">
      <input
        type="text"
        class="task-details-title"
        :class="{
          'is-editing': isChanged.name,
          'is-success': updatedKey === 'name'
        }"
        placeholder="Task name"
        v-model.trim="clonedTask.name"
        @keyup.enter="updateTask('name')"
      />

      <textarea
        name="description"
        class="task-details-description"
        :class="{
          'is-editing': isChanged.description,
          'is-success': updatedKey === 'description'
        }"
        placeholder="Task description"
        v-model.trim="clonedTask.description"
        @keyup.enter="updateTask('description')"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskView',

  data() {
    return {
      clonedTask: null,
      updatedKey: null
    };
  },

  beforeMount() {
    this.clonedTask = { ...this.task };
  },

  computed: {
    ...mapGetters({
      getTask: 'getTask'
    }),
    task() {
      return this.getTask(this.$route.params.taskId);
    },
    column() {
      return this.$route.params.columnId;
    },
    isChanged() {
      return {
        name: this.clonedTask.name !== this.task.name,
        description: this.clonedTask.description !== this.task.description
      };
    }
  },

  methods: {
    updateTask(key) {
      this.$store.commit('UPDATE_TASK', {
        columnId: this.column,
        taskId: this.task.id,
        value: this.clonedTask
      });

      this.updatedKey = key;

      const timeOut = setTimeout(() => {
        this.updatedKey = null;
        clearTimeout(timeOut);
      }, 1000);
    }
  }
};
</script>

<style lang="postcss">
.task-view {
  @apply bg-white rounded shadow relative flex flex-row m-32 ml-auto mr-auto max-w-2xl py-4 text-left;
}
.task-details {
  @apply flex flex-col flex-grow items-start justify-between px-4;
}
.task-details-title {
  @apply w-full p-2 mb-2 text-xl font-bold border-2 border-transparent rounded outline-none;
  transition: all 0.3s;
}
.task-details-description {
  @apply w-full p-2 bg-transparent relative border-2 border-transparent leading-none h-64 rounded outline-none;
  transition: all 0.3s;
}
.is-editing {
  @apply border-yellow-400;
}
.is-success {
  @apply border-green-300;
}
</style>
