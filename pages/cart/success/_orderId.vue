<template>
  <div
    class="py-3 py-md-5 success container d-flex flex-column justify-content-center align-items-center"
    style="max-width: 800px"
  >
    <client-only>
      <check-circle-outline
        style="font-size: 120px"
        class="text-secondary mb-4"
      />
    </client-only>
    <h3 class="text-secondary mb-5">感謝您的購買，您的訂單資訊如下：</h3>

    <b-table class="mb-4" :fields="fields" :items="items" stacked="md">
      <template #cell(productName)="row">
        <ul class="list-unstyled">
          <li v-for="(item, idx) in row.item.orderList" :key="idx">
            {{ item.productName }}
          </li>
        </ul>
      </template>

      <template #cell(qty)="row">
        <ul class="list-unstyled mb-0">
          <li v-for="(item, idx) in row.item.orderList" :key="idx">
            <Formatter data-type="NumberComma" :origin-data="item.qty">
              <template #default="propsData">
                {{ propsData.formatData }}
              </template>
            </Formatter>
          </li>
        </ul>
      </template>
      <template #cell(totalPrice)="row">
        <Formatter data-type="NumberComma" :origin-data="row.item.totalPrice">
          <template #default="propsData">
            {{ propsData.formatData }}
          </template>
        </Formatter>
      </template>
    </b-table>

    <ul class="align-self-start ml-4" type="square">
      <li class="mb-3">
        請於
        <u class="font-weight-bold text-danger">3日內</u>
        完成匯款並於匯款後至有良冊LINE官方帳號告知您的<span class="text-danger"
          >「訂單編號」</span
        >、<span class="text-danger">「匯款金額」</span>及<span
          class="text-danger"
          >「帳號末5碼」</span
        >，我們將每天進行統一對帳，如無問題將不另行通知。
      </li>
      <li class="mb-3">
        匯款資訊：
        <ul class="ml-4">
          <li>
            <label class="mb-0">匯款銀行：</label
            ><span style="color: #f75000">玉山銀行 - 台中分行</span>
          </li>
          <li>
            <label class="mb-0">銀行代碼：</label
            ><span style="color: #f75000">808</span>
          </li>
          <li>
            <label class="mb-0">銀行帳戶：</label
            ><span style="color: #f75000">1366940052966</span>
          </li>
          <li>
            <label class="mb-0">戶名：</label
            ><span style="color: #f75000">有良冊股份有限公司</span>
          </li>
        </ul>
      </li>
      <li class="mb-3">
        若想查詢訂單進度，可前往<u class="mx-1"
          ><nuxt-link class="font-weight-bold text-secondary" to="/search">
            訂單查詢
          </nuxt-link></u
        >了解處理進度。
      </li>
      <li class="mb-3">
        有關訂單詳細資料以及匯款資訊，可至您的電子郵件匣中查閱。
      </li>
    </ul>

    <nuxt-link class="btn btn-secondary px-4 py-2" to="/">返回首頁</nuxt-link>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Formatter from '@/components/Formatter.vue'
// import API from '~/utils/api.config'

export default {
  components: { Formatter },
  layout: 'cartPage',
  data() {
    return {
      fields: [
        {
          key: 'orderId',
          label: '訂單編號',
          class: 'text-center',
        },
        {
          key: 'oderDate',
          label: '訂單日期',
          class: 'text-center',
        },
        {
          key: 'productName',
          label: '產品名稱',
          class: 'text-center',
        },
        {
          key: 'qty',
          label: '訂購量',
          class: 'text-center',
        },
        {
          key: 'totalPrice',
          label: '總金額',
          class: 'text-center',
        },
      ],
      items: [],
    }
  },
  mounted() {
    const order = this.$store.state.order
    if (order.orderId) {
      this.items = [order]
    } else {
      this.getOrderInfo()
    }
  },
  methods: {
    async getOrderInfo() {
      const orderId = this.$route.params.orderId
      const uid = Cookie.get('userUid')
      const idToken = Cookie.get('id_token')
      const payload = { orderId, uid, idToken }

      if (!orderId) return

      try {
        const resOrderInfoRes = await this.$store.dispatch(
          'getOrderInfo',
          payload
        )
        const order = resOrderInfoRes.data
        this.$store.commit('seUsertOrder', order)
        this.items = [order]
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep(
    .table.b-table.b-table-stacked-md > tbody > tr > [data-label]::before
  ) {
  text-align: center;
}
</style>
