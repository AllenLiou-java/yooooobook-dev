<template>
  <div class="container py-5">
    <div class="row">
      <div
        class="col-12 d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="mb-0">訂單摘要</h3>
        <nuxt-link class="text-decoration-underline" to="/search"
          >回到訂單列表</nuxt-link
        >
      </div>
    </div>
    <div class="row border-md border-top py-2 mb-3 mx-1 mx-sm-0">
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0 font-weight-bold">訂單信息</label>
          </div>
          <div class="col-8 col-md-10">
            <Formatter
              class="mb-0 font-weight-bold text-danger"
              :origin-data="orderInfo.status"
              data-type="orderStatus"
            >
              <template #default="propsData">
                {{ propsData.formatData }}
              </template>
            </Formatter>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">訂單號碼： </label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">{{ orderInfo.orderId }}</p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">訂單日期：</label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">{{ orderInfo.oderDate }}</p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">訂單內容：</label>
          </div>
          <div class="col-8 col-md-10">
            <p
              v-for="(order, idx) in orderInfo.orderList"
              :key="idx"
              class="mb-0"
            >
              {{ order.productName }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">訂購數：</label>
          </div>
          <div class="col-8 col-md-10">
            <Formatter
              v-for="(order, idx) in orderInfo.orderList"
              :key="idx"
              :origin-data="order.qty === null ? 0 : order.qty"
              data-type="NumberComma"
              class="mb-0"
            >
              <template #default="propsData">
                {{ propsData.formatData }}
              </template>
            </Formatter>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">金額：</label>
          </div>
          <div class="col-8 col-md-10">
            <Formatter
              v-for="(order, idx) in orderInfo.orderList"
              :key="idx"
              :origin-data="order.totalPrice === null ? 0 : order.totalPrice"
              data-type="NumberComma"
              class="mb-0"
            >
              <template #default="propsData">
                {{ propsData.formatData }}
              </template>
            </Formatter>
          </div>
        </div>
      </div>
    </div>
    <div class="row border-md py-2 mb-3 mx-1 mx-sm-0">
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0 font-weight-bold">物流信息</label>
          </div>
          <div class="col-8 col-md-10">
            <a
              :style="{
                display:
                  orderInfo.delivery.trackingUrl === '' ? 'none' : 'block',
              }"
              :href="orderInfo.delivery.trackingUrl"
              target="_blank"
              class="mb-0 text-danger font-weight-bold text-decoration-underline"
              >物流單號：{{ orderInfo.delivery.trackingNo }}</a
            >
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">收貨地址：</label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">{{ orderInfo.receiver.address }}</p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">送貨方式：</label>
          </div>
          <div class="col-8 col-md-10">
            <Formatter
              data-type="deliveryCompany"
              :origin-data="orderInfo.delivery.company"
              class="mb-0"
            >
              <template #default="propsData">
                {{ propsData.formatData }}
              </template>
            </Formatter>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="mb-0">訂購人資訊</h3>
      </div>
    </div>
    <div class="row border-md border-top py-2 mb-3 mx-1 mx-sm-0">
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">發票買受人</label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">
              {{ orderInfo.buyer }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">收件人</label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">
              {{ orderInfo.receiver.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">聯絡電話</label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">
              {{ orderInfo.phone }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">統一編號</label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">
              {{ orderInfo.taxId }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">帳戶後5碼</label>
          </div>
          <div class="col-8 col-md-10">
            <p class="mb-0">
              {{ orderInfo.bankAccountNo }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import API from '~/utils/api.config'
import { initOrderInfo } from '@/assets/js/initData'
import Formatter from '~/components/Formatter.vue'

export default {
  components: { Formatter },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.pageRecord = from.query.page
    })
  },
  data() {
    return {
      orderInfo: {},
    }
  },
  async fetch() {
    const orderId = this.$route.params.orderId
    const uid = this.$nuxt.context.app.$cookies.get('userUid')
    const idToken = this.$nuxt.context.app.$cookies.get('id_token')
    const payload = { orderId, uid, idToken }

    const orderFromVuexCopy = JSON.parse(
      JSON.stringify(this.$store.state.userOrderList)
    )
    const orderDetailFilter = orderFromVuexCopy.filter((item) => {
      return item.orderId === orderId
    })

    if (!uid) return

    if (orderDetailFilter.length > 0) {
      // vuex的 state.orders 「有資料」時
      const orderDetail = orderDetailFilter[0]
      orderDetail.isEdit = false
      this.orderInfo = orderDetail
    } else {
      // vuex的 state.orders 「無資料」時
      try {
        const resOrderInfoRes = await this.$store.dispatch(
          'getOrderInfo',
          payload
        )
        const orderDetail = resOrderInfoRes.data
        orderDetail.isEdit = false
        this.orderInfo = orderDetail
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  },
  head() {
    return {
      title: '訂單細節 - 有良冊股份有限公司',
      meta: [
        {
          name: 'description',
          content: '訂單細節 - 有良冊股份有限公司',
        },
        {
          property: 'og:description',
          content: '訂單細節 - 有良冊股份有限公司',
        },
        {
          property: 'og:title',
          content: '訂單細節 - 有良冊股份有限公司',
        },
        {
          property: 'og:image',
          content: '/yooooobook.jpg',
        },
        {
          property: 'og:url',
          content: 'https://www.yooooobook.com/search/detail',
        },
      ],
    }
  },
  computed: {},
  created() {
    this.orderInfo = initOrderInfo()
  },
}
</script>

<style lang="scss" scoped>
::v-deep(
    .table.b-table.b-table-stacked-md > tbody > tr > [data-label]::before
  ) {
  text-align: center;
}

.text-decoration-underline {
  text-decoration: underline;
}

.border-md {
  @include media-w768 {
    border: 1px solid #dee2e6;
  }
}
</style>
