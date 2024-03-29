<template>
  <p class="mb-0">
    <slot name="default" :format-data="formatData"></slot>
  </p>
</template>

<script>
import {
  switchOrderStatus,
  switchDeliveryCompany,
  NumberComma,
} from '@/assets/js/tool'
export default {
  props: {
    dataType: {
      type: String,
      required: true,
    },
    originData: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    formatData() {
      // dataType包括：
      // orderStatus、deliveryCompany、NumberComma
      const type = this.dataType
      const data = this.originData
      let formatData = ''
      if (type === 'orderStatus') {
        formatData = switchOrderStatus(data)
      }
      if (type === 'deliveryCompany') {
        formatData = switchDeliveryCompany(data)
      }
      if (type === 'NumberComma') {
        formatData = NumberComma(data)
      }
      return formatData
    },
  },
}
</script>

<style lang="scss" scoped></style>
