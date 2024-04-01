<template>
  <div class="search px-4">
    <MultiFunctionTable
      :fields="fields"
      :items="items"
      :enable-download="enableDownload"
      style="max-width: 1400px"
    >
    </MultiFunctionTable>
  </div>
</template>

<script>
import qs from 'qs'
import MultiFunctionTable from '@/components/Table/MultiFunctionTable.vue'
import API from '~/utils/api.config'
import { switchDeliveryCompany, switchOrderStatus } from '~/assets/js/tool'

export default {
  components: {
    MultiFunctionTable,
  },
  middleware: ['auth'],
  async asyncData(context) {
    const isAdministrator =
      context.$cookies.get('isAdministrator') === true ||
      context.$cookies.get('isAdministrator') === 'true'

    if (isAdministrator) {
      const idToken = context.$cookies.get('id_token')
      let data = {}

      try {
        // 取得所有訂單資料
        const ordersPromise = await getAllOrdersPromise(context, idToken)
        data = ordersPromise.data
      } catch (e) {
        // 若token過期，更換token - 透過refresh_token獲取新token
        const refreshToken = context.$cookies.get('refresh_token')

        const postData = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }

        // 更新idToken
        const exchangeTokenPromise = await getExchangeIdToken(context, postData)
        const exchangeIdToken = exchangeTokenPromise.data.id_token
        const exchangeRefreshToken = exchangeTokenPromise.data.refresh_token

        context.$cookies.set('id_token', exchangeIdToken)
        context.$cookies.set('refresh_token', exchangeRefreshToken)

        // 取得所有訂單資料
        const ordersPromise = await getAllOrdersPromise(
          context,
          exchangeIdToken
        )
        data = ordersPromise.data
      }

      const orderListOfUid = []
      // 在orderList中的每筆資料加入uid與「備註」欄位

      Object.entries(data).forEach((orderOfUid) => {
        const uid = orderOfUid[0]
        const orders = Object.values(orderOfUid[1])

        // 增加每筆order的屬性
        orders.map((order) => {
          // 增加uid屬性
          order.uid = uid
          // 若無「備註」欄位屬性，則加入此屬性
          if (!order.remark) {
            order.remark = ''
          }
          // 若無「files」欄位屬性，則加入此屬性
          if (!order.files) {
            order.files = []
          }
          return order
        })
        orderListOfUid.push(orders)
      })

      // 將二維陣列轉為一維陣列
      const orderList = orderListOfUid.reduce(
        (previousValue, currentValue, currentIndex, array) => {
          return previousValue.concat(currentValue)
        }
      )
      context.store.commit('setAllOrderList', orderList)

      return {
        items: orderList,
      }
    } else {
      return {
        items: [],
      }
    }

    // 串接所有清單資料，返回promise
    function getAllOrdersPromise(context, idToken) {
      return context.$axios({
        method: API.order.getAllOrders.method,
        url: API.order.getAllOrders.url + '?auth=' + idToken,
      })
    }

    // 串接exchangeIdToken，返回promise
    function getExchangeIdToken(context, postData) {
      return context.$axios({
        method: API.member.exchangeToken.method,
        url: API.member.exchangeToken.url,
        baseURL: API.member.exchangeToken.baseUrl,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(postData),
      })
    }
  },
  data() {
    return {
      fields: [
        {
          key: 'No',
          label: '編號',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '60px',
          },
          formatter: (value, key, item) => {
            return item
          },
        },
        {
          key: 'orderId',
          label: '訂單號碼',
          class: ['align-middle', 'text-center', 'position-sticky'],
          thStyle: {
            'min-width': '160px',
            color: '#dc3545',
          },
          stickyColumn: true,
        },
        {
          key: 'oderDate',
          label: '訂單日期',
          sortable: true,
          sortDirection: 'desc',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '160px',
          },
        },
        {
          key: 'productName',
          label: '產品名稱',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '300px',
          },
        },
        {
          key: 'qty',
          label: '訂購數',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '80px',
            color: '#dc3545',
          },
        },
        {
          key: 'totalPrice',
          label: '總金額',
          sortable: true,
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '80px',
            color: '#dc3545',
          },
        },
        {
          key: 'status',
          label: '訂單狀態',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '260px',
          },
          formatter: (value, key, item) => {
            return switchOrderStatus(value)
          },
          filterByFormatted: true,
        },
        {
          key: 'address',
          label: '收貨地址',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '400px',
            color: '#28a745',
          },
          formatter: (value, key, item) => {
            return item.receiver.address
          },
          filterByFormatted: true,
        },
        {
          key: 'deliveryCo',
          label: '送貨方式',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
            color: '#28a745',
          },
          formatter: (value, key, item) => {
            return switchDeliveryCompany(item.delivery.company)
          },
          filterByFormatted: true,
        },
        {
          key: 'buyer',
          label: '發票買受人',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '160px',
            color: '#17a2b8',
          },
        },
        {
          key: 'receiver',
          label: '收件人',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '160px',
            color: '#17a2b8',
          },
          formatter: (value, key, item) => {
            return item.receiver.name
          },
          filterByFormatted: true,
        },
        {
          key: 'email',
          label: '電子信箱',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '120px',
            color: '#17a2b8',
          },
        },
        {
          key: 'phone',
          label: '聯絡電話',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '120px',
            color: '#17a2b8',
          },
        },
        {
          key: 'taxId',
          label: '統一編號',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
            color: '#17a2b8',
          },
        },
        {
          key: 'bankAccountNo',
          label: '帳號後5碼',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
            color: '#17a2b8',
          },
        },
        {
          key: 'isClosed',
          label: '訂單完成',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
          },
          formatter: (value, key, item) => {
            return value ? '結單' : '處理中'
          },
          filterByFormatted: true,
        },
        {
          key: 'remark',
          label: '是否備註',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '100px',
          },
        },
        {
          key: 'actions',
          label: '操作',
          class: ['align-middle', 'text-center'],
          thStyle: {
            'min-width': '120px',
          },
        },
      ],
      enableDownload: true,
    }
  },
  head() {
    return {
      title: '訂單管理 - 有良冊股份有限公司',
      meta: [
        {
          name: 'description',
          content: '訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:description',
          content: '訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:title',
          content: '訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:image',
          content: '/yooooobook.jpg',
        },
        {
          property: 'og:url',
          content: 'https://www.yooooobook.com/admin/search',
        },
      ],
    }
  },
  computed: {
    // jsonData() {
    //   const rowData = this.items
    //   const exportData = rowData.map((data, index) => {
    //     const temp = {}
    //     temp.no = index + 1
    //     temp.orderId = data.
    //   return this.items
    // },
  },
}
</script>

<style lang="scss" scoped>
@import './search.scss';
</style>
