<template>
  <button
    class="base-button"
    :class="className"
    :type="type"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: 'white'
    },
    bgColor: {
      type: String,
      default: 'teal'
    },
    px: {
      type: [String, Number],
      default: '4'
    },
    py: {
      type: [String, Number],
      default: '2'
    },
    display: {
      type: String,
      default: 'inline-flex'
    },
    alignItems: {
      type: String,
      default: 'center'
    },
    justifyContent: {
      type: String,
      default: 'center'
    },
    fontWeight: {
      type: String,
      default: 'bold'
    },
    rounded: Boolean
  },

  computed: {
    className() {
      return {
        [`text-${this.color}`]: this.color,
        [`bg-${this.bgColor}`]: this.bgColor,
        [`px-${this.px}`]: this.px || this.px >= 0,
        [`py-${this.py}`]: this.py || this.py >= 0,
        [`${this.display}`]: this.display,
        [`font-${this.fontWeight}`]: this.fontWeight,
        [`items-${this.alignItems}`]: this.alignItems,
        [`justify-${this.justifyContent}`]: this.justifyContent,
        rounded: this.rounded
      };
    }
  }
};
</script>

<style></style>
