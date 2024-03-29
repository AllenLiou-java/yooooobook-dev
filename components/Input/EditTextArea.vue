<template>
  <div>
    <p v-if="!isEdit" class="mb-0">
      {{ dataValue }}
    </p>
    <b-form-textarea
      v-else
      v-model.trim="inputData"
      :placeholder="placeholder"
      :rows="rows"
      :max-rows="maxRows"
      @input="inputUpdate"
    ></b-form-textarea>
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
    rows: {
      type: String,
      default: '3',
    },
    maxRows: {
      type: String,
      default: '6',
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
