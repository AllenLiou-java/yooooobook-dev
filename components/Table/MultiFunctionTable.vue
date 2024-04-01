<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
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
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
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
          label="指定篩選欄位"
          description="若未指定，則篩選目標為所有欄位"
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
            <b-form-checkbox value="orderId">訂單號碼</b-form-checkbox>
            <b-form-checkbox value="status">訂單狀態</b-form-checkbox>
            <b-form-checkbox value="address">收貨地址</b-form-checkbox>
            <b-form-checkbox value="deliveryCo">送貨方式</b-form-checkbox>
            <b-form-checkbox value="buyer">發票買受人</b-form-checkbox>
            <b-form-checkbox value="receiver">收件人</b-form-checkbox>
            <b-form-checkbox value="phone">聯絡電話</b-form-checkbox>
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
      head-variant="dark"
      bordered="bordered"
      small
      responsive
      hover
      striped
      no-border-collapse
      @filtered="onFiltered"
    >
      <!-- Table cell內容 -->
      <template #cell(No)="row">
        {{ perPage * (currentPage - 1) + row.index + 1 }}
      </template>

      <!-- 產品名稱 -->
      <template #cell(productName)="row">
        <ul class="list-unstyled mb-0">
          <li v-for="(order, idx) in row.item.orderList" :key="idx">
            {{ order.productName }}
          </li>
        </ul>
      </template>

      <!-- 訂購數 -->
      <template #cell(qty)="row">
        <ul class="list-unstyled mb-0">
          <li v-for="(order, idx) in row.item.orderList" :key="idx">
            <Formatter data-type="NumberComma" :origin-data="order.qty">
              <template #default="propsData">
                {{ propsData.formatData }}
              </template>
            </Formatter>
          </li>
        </ul>
      </template>

      <!-- 總金額 -->
      <template #cell(totalPrice)="row">
        <Formatter data-type="NumberComma" :origin-data="row.value">
          <template #default="propsData">
            {{ propsData.formatData }}
          </template>
        </Formatter>
      </template>

      <!-- 訂單狀態 -->
      <template #cell(status)="row">
        <EditSelect
          :prop-item="tableItems[row.item.itemIndex]"
          :position-index="row.index"
          :need-format="true"
          :select-options="statusOptions"
          @onEdit="onEditStatus"
          @onSave="onSaveStatus"
          @update="updateStatus"
        />
      </template>

      <!-- 備註內容 -->
      <template #cell(remark)="row">
        <client-only>
          <TooltipText
            v-if="row.item.remark"
            style="font-size: 24px; cursor: pointer"
            @click="info(row.item.remark, $event.target)"
          />
        </client-only>
      </template>

      <template #cell(isClosed)="row">
        {{ row.value }}
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

    <b-row>
      <b-col sm="2" class="ml-auto">
        <client-only>
          <download-excel
            v-if="enableDownload"
            type="xls"
            :data="filteredItems"
            :fields="jsonFields"
            :name="exportName"
            :worksheet="exportSheet"
            class="btn btn-danger d-block"
          >
            匯出Excel
          </download-excel>
        </client-only>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      centered
      header-bg-variant="secondary"
      header-text-variant="white"
      :footer-class="['p-3', 'border-top-0']"
      :body-class="'p-3'"
      ok-variant="secondary"
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>

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
import EditSelect from '@/components/Select/EditSelect.vue'
import API from '~/utils/api.config'
import { switchOrderStatus } from '~/assets/js/tool'

export default {
  components: { Formatter, EditSelect },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    enableDownload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: 'oderDate',
      sortDesc: true,
      sortDirection: 'desc',
      filter: null,
      filterOn: [],
      filteredItems: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
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
      tableItems: [],
      jsonFields: {
        訂單號碼: {
          field: 'orderId',
          callback: (value) => {
            return `# ${value}`
          },
        },
        訂單日期: 'oderDate',
        產品名稱: {
          field: 'orderList',
          callback: (value) => {
            return value
              .map((order) => {
                return order.productName
              })
              .join('\n')
          },
        },
        訂購數: {
          field: 'orderList',
          callback: (value) => {
            return value
              .map((order) => {
                return order.qty
              })
              .join('\n')
          },
        },
        總金額: 'totalPrice',
        訂單狀態: {
          field: 'status',
          callback: (value) => {
            return switchOrderStatus(value)
          },
        },
        收件人: {
          field: 'receiver',
          callback: (value) => {
            return value.name
          },
        },
        收貨地址: {
          field: 'receiver',
          callback: (value) => {
            return value.address
          },
        },
        電子郵件: 'email',
        聯絡電話: 'phone',
        發票買受人: 'buyer',
        統一編號: 'taxId',
        帳號後5碼: 'bankAccountNo',
        備註: 'remark',
      },
      exportName: '總訂單.xls',
      exportSheet: '訂單',
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
  created() {
    this.tableItems = this.items.map((item, index) => ({
      ...item,
      isEdit: false,
      itemIndex: index,
    }))
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length

    const page = this.$route.query.page

    this.$nextTick(() => {
      if (!page) {
        this.turnPage(1)
      } else {
        this.turnPage(page)
      }
    })

    this.filteredItems = this.tableItems
  },
  methods: {
    info(item, button) {
      this.infoModal.title = `備註內容`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.filteredItems = filteredItems
      this.currentPage = 1
    },
    onEditStatus(row, posIndex) {
      this.setOverlay(posIndex)
      const index = row.itemIndex
      this.tableItems[index].isEdit = !this.tableItems[index].isEdit
    },
    onSaveStatus(row) {
      const orderId = row.orderId
      const uid = row.uid
      const status = row.status
      const index = row.itemIndex

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
          this.tableItems[index].isEdit = !this.tableItems[index].isEdit
          const tableItemsCopy = JSON.parse(JSON.stringify(this.tableItems))
          this.$store.commit('setAllOrderList', tableItemsCopy)
          this.openToast('訂單狀態修改', '儲存成功', 'success')
          this.removeOverlay()
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
    setOverlay(posIndex) {
      const trList = document.querySelectorAll('tbody tr')
      trList.forEach((tr, index) => {
        if (index === posIndex) return
        tr.classList.add('overlay')
      })
    },
    removeOverlay() {
      const overlays = document.querySelectorAll('.overlay')
      overlays.forEach((overlay) => {
        overlay.classList.remove('overlay')
      })
    },
    openToast(title, content, variant) {
      this.toastSet.title = title
      this.toastSet.content = content
      this.toastSet.variant = variant
      this.$bvToast.show('my-toast')
    },
    turnPage(page) {
      this.currentPage = page
      window.scrollTo({ top: 0 })
      this.$router.push({
        name: 'admin-search',
        query: { page },
      })
    },
    updateStatus(itemIndex, val) {
      this.tableItems[itemIndex].status = val
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep(.overlay td) {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
}
</style>
