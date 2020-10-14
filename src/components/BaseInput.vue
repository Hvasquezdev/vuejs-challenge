<template>
  <input
    :type="type"
    class="base-input"
    :class="className"
    :placeholder="placeholder"
    :value="value"
    v-on="listeners"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'white'
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    px: {
      type: [String, Number],
      default: '2'
    },
    py: {
      type: [String, Number],
      default: '2'
    },
    display: {
      type: String,
      default: 'block'
    },
    outline: {
      type: String,
      default: 'none'
    },
    flex: {
      type: [String, Number],
      default: '1'
    },
    fontWeight: {
      type: String,
      default: 'bold'
    },
    rounded: Boolean,
    pointer: Boolean,
    fullWidth: Boolean
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput
      };
    },
    className() {
      return {
        [`text-${this.color}`]: this.color,
        [`bg-${this.bgColor}`]: this.bgColor,
        [`px-${this.px}`]: this.px || this.px >= 0,
        [`py-${this.py}`]: this.py || this.py >= 0,
        [`${this.display}`]: this.display,
        [`font-${this.fontWeight}`]: this.fontWeight,
        [`flex-${this.flex}`]: this.flex,
        [`outline-${this.outline}`]: this.outline,
        rounded: this.rounded,
        'cursor-pointer': this.pointer,
        'w-full': this.fullWidth
      };
    }
  },

  methods: {
    onInput(e) {
      return this.$emit('input', e.target.value);
    }
  }
};
</script>

<style></style>
