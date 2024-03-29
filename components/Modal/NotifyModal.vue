<template>
  <div>
    <b-modal
      :ref="refName"
      centered
      no-close-on-backdrop
      hide-header-close
      hide-footer
      :title="title"
    >
      <div class="d-block text-center">
        <p class="my-4">{{ mainContent }}</p>
      </div>
      <div class="row mx-n2">
        <div class="col px-2">
          <b-button class="mt-3" variant="secondary" block @click="hideModal">{{
            cancelBtnName
          }}</b-button>
        </div>
        <div v-if="isConfirmShow" class="col px-2">
          <b-button
            class="mt-3 col px-5"
            variant="danger"
            block
            @click="okModal"
            >{{ confirmBtnName }}</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { unlockScroll } from '@/assets/js/tool'
export default {
  props: {
    refName: {
      type: String,
      default: 'my-modal',
    },
    title: {
      type: String,
      default: 'Modal Component',
    },
    cancelBtnName: {
      type: String,
      default: 'Close',
    },
    confirmBtnName: {
      type: String,
      default: 'Confirm',
    },
    mainContent: {
      type: String,
      default: 'Default Content',
    },
    isConfirmShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    showModal() {
      const refName = Object.keys(this.$refs)
      this.$refs[refName].show()
    },
    hideModal() {
      const refName = Object.keys(this.$refs)
      this.$refs[refName].hide()
      unlockScroll()
    },
    okModal() {
      const refName = Object.keys(this.$refs)
      this.$refs[refName].hide()
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss" scoped></style>
