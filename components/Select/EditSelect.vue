<template>
  <div>
    <template v-if="!propItem.isEdit">
      <template v-if="needFormat">
        <Formatter
          data-type="orderStatus"
          :origin-data="propItem.status"
          class="d-inline-block"
        >
          <template #default="propsData">
            {{ propsData.formatData }}
          </template>
        </Formatter>
      </template>
      <template v-else>
        {{ propItem.status }}
      </template>
    </template>

    <template v-else>
      <b-form-select
        :value="propItem.status"
        :options="selectOptions"
        style="width: 190px"
        @input="$emit('update', propItem.itemIndex, $event)"
      >
      </b-form-select>
    </template>

    <b-button
      class="px-1 py-0 ml-2 border-0"
      :class="propItem.isEdit ? 'bg-success' : 'bg-dark'"
    >
      <client-only>
        <EditBtn
          v-if="!propItem.isEdit"
          style="font-size: 16px"
          @click="onEdit(propItem)"
        />
        <SaveBtn v-else style="font-size: 16px" @click="onSave(propItem)" />
      </client-only>
    </b-button>
  </div>
</template>

<script>
import Formatter from '@/components/Formatter.vue'

export default {
  components: { Formatter },
  props: {
    propItem: {
      type: Object,
      required: true,
    },
    needFormat: {
      type: Boolean,
      default: false,
    },
    selectOptions: {
      type: Array,
      required: true,
    },
    positionIndex: {
      type: Number || String,
      required: true,
    },
  },
  methods: {
    onEdit(row) {
      const posIndex = this.positionIndex
      this.$emit('onEdit', row, posIndex)
    },
    onSave(row) {
      this.$emit('onSave', row)
    },
  },
}
</script>

<style lang="scss" scoped></style>
