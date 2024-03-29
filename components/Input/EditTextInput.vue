<template>
  <div>
    <p v-if="!isEdit" class="mb-0">
      {{ dataValue }}
    </p>
    <b-form-input
      v-else
      v-model.trim="inputData"
      :placeholder="placeholder"
      @input="inputUpdate"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    dataValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputData: '',
    }
  },
  watch: {
    dataValue(val) {
      this.inputData = val
    },
  },
  methods: {
    inputUpdate() {
      this.$emit('update:dataValue', this.inputData)
    },
  },
}
</script>

<style lang="scss" scoped></style>
