<template>
  <b-container fluid>
    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      head-variant="light"
      empty-text="目前無訂單紀錄"
    >
      <!-- 產品名稱 -->
      <template #cell(productName)="row">
        <ul class="list-unstyled">
          <li v-for="(item, idx) in row.item.orderList" :key="idx">
            {{ item.productName }}
          </li>
        </ul>
      </template>

      <!-- 訂購數 -->
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

      <!-- 總金額 -->
      <template #cell(totalPrice)="row">
        <Formatter data-type="NumberComma" :origin-data="row.item.totalPrice">
          <template #default="propsData">
            {{ propsData.formatData }}
          </template>
        </Formatter>
      </template>

      <!-- 訂單狀態 -->
      <template #cell(status)="row">
        <Formatter data-type="orderStatus" :origin-data="row.item.status">
          <template #default="propsData">
            {{ propsData.formatData }}
          </template>
        </Formatter>
      </template>

      <!-- 操作 -->
      <template #cell(actions)="row">
        <nuxt-link
          class="btn btn-secondary"
          :to="'/search/detail/' + row.item.orderId"
          >查看詳情</nuxt-link
        >
      </template>
    </b-table>

    <!-- User Interface controls -->
    <b-row class="mt-5">
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="每頁資料數"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-if="currentPage != -1"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          first-text="◀"
          last-text="▶"
          size="sm"
          class="my-0"
          @change="turnPage"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Formatter from '@/components/Formatter.vue'

export default {
  components: {
    Formatter,
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: this.$route.query.page,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: 'orderId',
      sortDesc: true,
      sortDirection: 'desc',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
  },
  computed: {
    totalRows() {
      return this.items.length
    },
  },
  watch: {
    items(newVal) {
      const page = this.$route.query.page
      this.turnPage(page)
    },
  },
  mounted() {
    const currentPage = this.$route.query.page
    this.turnPage(currentPage)
  },
  methods: {
    turnPage(page) {
      window.scrollTo({ top: 0 })

      this.$nextTick(() => {
        this.currentPage = page
        this.$router.push({
          name: 'search',
          query: { page },
        })
      })
    },
  },
}
</script>
