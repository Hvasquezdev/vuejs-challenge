<template>
  <div class="task-view">
    <div v-if="task" class="task-details">
      <h2 class="task-details-title">
        {{ task.name }}
      </h2>

      <p class="task-details-description">
        {{ task.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskView',

  computed: {
    ...mapGetters({
      getTask: 'getTask'
    }),
    task() {
      return this.getTask(this.$route.params.id);
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
  @apply w-full flex-shrink-0 font-bold;
}
.task-details-description {
  @apply w-full flex-shrink-0 mt-1 text-sm;
}
</style>
