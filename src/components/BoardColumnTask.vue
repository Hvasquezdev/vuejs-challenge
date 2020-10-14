<template>
  <button class="task" v-on="$listeners">
    <span class="task-title">
      {{ task.name }}
    </span>

    <p v-if="task.description" class="task-description">
      {{ task.description }}
    </p>
  </button>
</template>

<script>
export default {
  name: 'BoardColumnTask',

  props: {
    task: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
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
