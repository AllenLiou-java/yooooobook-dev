<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row class="mb-5">
      <b-col lg="6" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="排序"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">遞增</option>
              <option :value="true">遞減</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="初始排序"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="篩選"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          v-model="sortDirection"
          label="篩選欄位"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="orderId">訂單編號</b-form-checkbox>
            <b-form-checkbox value="taxId">統一編號</b-form-checkbox>
            <b-form-checkbox value="bankAccountNo">帳號後5碼</b-form-checkbox>
            <b-form-checkbox value="isClosed">訂單完成</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

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
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          @input="turnPage"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="tableItems"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      empty-text="目前無訂單紀錄"
      small
      head-variant="dark"
      bordered="bordered"
      responsive
      hover
      striped
      @filtered="onFiltered"
    >
      <!-- Table header 樣式+內容 -->
      <template v-for="(field, index) in fields" #[`head(${field.key})`]="data">
        <span :key="index" class="d-inline-block">{{ data.label }}</span>
      </template>

      <!-- Table cell內容 -->
      <template #cell(No)="data">
        <span class="text-body font-weight-bold">
          {{ perPage * (currentPage - 1) + data.index + 1 }}
        </span>
      </template>

      <!-- 產品名稱 -->
      <template #cell(productName)="row">
        <ul class="list-unstyled mb-0">
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
        <div>
          <Formatter
            v-if="!tableItems[row.item.itemIndex].isEdit"
            data-type="orderStatus"
            :origin-data="row.item.status"
            class="d-inline-block"
          >
            <template #default="propsData">
              {{ propsData.formatData }}
            </template>
          </Formatter>

          <b-form-select
            v-else
            v-model="tableItems[row.item.itemIndex].status"
            :options="statusOptions"
            style="width: 190px"
          >
          </b-form-select>
          <b-button
            class="px-1 py-0 ml-2 border-0"
            :class="
              tableItems[row.item.itemIndex].isEdit ? 'bg-success' : 'bg-dark'
            "
          >
            <EditBtn
              v-if="!tableItems[row.item.itemIndex].isEdit"
              style="font-size: 16px"
              @click="onEditStatus(row)"
            />
            <SaveBtn
              v-else
              style="font-size: 16px"
              @click="onSaveStatus(row)"
            />
          </b-button>
        </div>
      </template>

      <!-- 送貨方式 -->
      <template #cell(deliveryCo)="row">
        <Formatter data-type="deliveryCompany" :origin-data="row.value">
          <template #default="propsData">
            {{ propsData.formatData }}
          </template>
        </Formatter>
      </template>

      <!-- 操作 -->
      <template #cell(actions)="row">
        <nuxt-link
          class="btn btn-secondary"
          :to="{
            name: 'admin-search-detail',
            params: { uid: row.item.uid, orderId: row.item.orderId },
          }"
          >查看詳情</nuxt-link
        >
      </template>
    </b-table>
    <Toaster
      :title="toastSet.title"
      :content="toastSet.content"
      :variant="toastSet.variant"
    />
  </b-container>
</template>

<script>
import Cookie from 'js-cookie'
import Formatter from '@/components/Formatter.vue'
import API from '~/utils/api.config'

export default {
  components: { Formatter },
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
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: 'oderDate',
      sortDesc: true,
      sortDirection: 'desc',
      filter: null,
      filterOn: [],
      totalRows: 0,
      editMode: false,
      tableItems: [],
      statusOptions: [
        {
          value: '1',
          text: '待匯款',
        },
        {
          value: '2',
          text: '匯款完成，訂單準備中',
        },
        {
          value: '3',
          text: '已發貨',
        },
        {
          value: '4',
          text: '未匯款，訂單取消',
        },
        {
          value: '5',
          text: '訂單取消，退款完成',
        },
      ],
      toastSet: {
        title: '',
        content: '',
        variant: '',
      },
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
  },
  watch: {
    items(newVal) {
      const newValCopy = JSON.parse(JSON.stringify(newVal))
      this.tableItems = newValCopy.map((item, index) => ({
        ...item,
        isEdit: false,
        itemIndex: index,
      }))
      const totalRows = newValCopy.length
      this.resetPageContent(totalRows)
    },
    $route: {
      // 瀏覽器切換上/下頁時，偵測路由變化，以變更畫面資料
      handler(val) {
        const page = val.query.page
        this.turnPage(page)
      },
      deep: true,
    },
  },
  mounted() {
    const page = this.$route.query.page

    if (!page) {
      this.$router.push({
        name: 'admin-search',
        query: {
          page: 1,
        },
      })
    }
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    turnPage(page) {
      this.currentPage = page
      window.scrollTo({ top: 0 })
      this.$router.push({
        name: 'admin-search',
        query: { page },
      })
    },
    resetPageContent(totalRows) {
      this.totalRows = totalRows
      const page = this.$route.query.page

      this.$nextTick(() => {
        this.turnPage(page)
      })
    },
    onEditStatus(row) {
      if (this.editMode) return
      const index = row.item.itemIndex
      this.editMode = true
      this.tableItems[index].isEdit = !this.tableItems[index].isEdit
    },
    onSaveStatus(row) {
      const orderId = row.item.orderId
      const uid = row.item.uid
      const status = row.item.status

      const index = row.item.itemIndex

      // 更新order的isClosed屬性 - 根據status狀態，更新isClosed屬性
      // status = 3，則isClosed = true
      if (status === '3' || status === '4' || status === '5') {
        this.tableItems[index].isClosed = true
      } else {
        this.tableItems[index].isClosed = false
      }

      // 深拷貝當下所選取的item後，刪除指定屬性，以避免連動影響到tableItem裡的資料
      const data = JSON.parse(JSON.stringify(this.tableItems[index]))
      delete data.isEdit
      delete data.itemIndex
      delete data.uid

      this.updateOrderInfo(uid, orderId, data)
        .then((item) => {
          this.editMode = false
          this.tableItems[index].isEdit = !this.tableItems[index].isEdit
          const tableItemsCopy = JSON.parse(JSON.stringify(this.tableItems))
          this.$store.commit('setAllOrderList', tableItemsCopy)
          this.openToast('訂單狀態修改', '儲存成功', 'success')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    updateOrderInfo(uid, orderId, data) {
      // 移除物件中的isEdit屬性(不存入資料庫)
      const { isEdit, ...updatedData } = data

      return this.$axios({
        method: API.order.patchOrderInfo.method,
        url:
          API.order.patchOrderInfo.url.replace(
            ':user_id/:order_id.json',
            uid + '/' + orderId + '.json'
          ) +
          '?auth=' +
          Cookie.get('id_token'),
        data: updatedData,
      })
    },
    openToast(title, content, variant) {
      this.toastSet.title = title
      this.toastSet.content = content
      this.toastSet.variant = variant
      this.$bvToast.show('my-toast')
    },
  },
}
</script>
<style lang="scss" scope></style>
