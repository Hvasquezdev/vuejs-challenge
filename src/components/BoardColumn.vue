<template>
  <div class="column">
    <h2 class="column-title">
      {{ column.name }}
    </h2>

    <section class="task-list">
      <slot />
    </section>
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
