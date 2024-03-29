<template>
  <div class="search container">
    <PersonalSearchTable
      ref="searchTable"
      :fields="tableFieldsSet"
      :items="items"
    />
  </div>
</template>

<script>
import PersonalSearchTable from '@/components/Table/PersonalSearchTable.vue'

export default {
  components: {
    PersonalSearchTable,
  },
  data() {
    return {
      tableFieldsSet: [
        {
          key: 'orderId',
          label: '訂單號碼',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center',
        },
        {
          key: 'oderDate',
          label: '訂單日期',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'productName',
          label: '產品名稱',
          class: 'text-center',
        },
        {
          key: 'qty',
          label: '訂購數',
          class: 'text-center',
        },
        {
          key: 'totalPrice',
          label: '總金額',
          sortable: true,
          class: 'text-center',
        },
        { key: 'status', label: '訂單狀態', class: 'text-center' },
        { key: 'actions', label: '操作', class: 'text-center' },
      ],
    }
  },
  async fetch() {
    const localId = this.$nuxt.context.app.$cookies.get('userUid')
    const idToken = this.$nuxt.context.app.$cookies.get('id_token')
    const payload = { localId, idToken }
    if (!localId) return
    await this.$store.dispatch('getOrderList', payload)
  },
  head() {
    return {
      title: '訂單查詢 - 有良冊股份有限公司',
      meta: [
        {
          name: 'description',
          content: '訂單查詢 - 有良冊股份有限公司',
        },
        {
          property: 'og:description',
          content: '訂單查詢 - 有良冊股份有限公司',
        },
        {
          property: 'og:title',
          content: '訂單查詢 - 有良冊股份有限公司',
        },
        {
          property: 'og:image',
          content: '/yooooobook.jpg',
        },
        {
          property: 'og:url',
          content: 'https://www.yooooobook.com/search',
        },
      ],
    }
  },
  computed: {
    items() {
      const vuexUserOrderList = this.$store.state.userOrderList
      return Object.values(vuexUserOrderList)
    },
    isAdministrator() {
      return this.$store.state.isAdministrator
    },
  },
  watch: {
    isAdministrator() {
      const localId = this.$nuxt.context.app.$cookies.get('userUid')
      const idToken = this.$nuxt.context.app.$cookies.get('id_token')
      const payload = { localId, idToken }
      if (!localId) return
      this.$store.dispatch('getOrderList', payload)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './search.scss';
</style>
