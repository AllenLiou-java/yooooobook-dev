<template>
  <div class="container py-5">
    <div class="row">
      <div
        class="col-12 d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="mb-0">訂單摘要</h3>
        <a href="#" class="text-decoration-underline" @click="toBack"
          >回到訂單列表</a
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
            <label class="mb-0">訂單類型：</label>
          </div>
          <div class="col-8 col-md-10">
            <Trigger
              off-label="個人"
              on-label="公協會團購"
              :prop-value="orderInfo.isFromGroup"
              class="d-inline-block"
              :class="{ overlay: !onEditMode }"
              @update="updateIsFromGroup"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">訂購數：</label>
          </div>
          <div class="col-8 col-md-10">
            <div v-for="(order, idx) in orderInfo.orderList" :key="idx">
              <Formatter
                v-if="!orderInfo.isEdit"
                :origin-data="order.qty === null ? 0 : order.qty"
                data-type="NumberComma"
              >
                <template #default="propsData">
                  {{ propsData.formatData }}
                </template>
              </Formatter>
              <b-form-input
                v-else
                v-model="orderInfo.orderList[idx].qty"
                class="mb-2"
                type="number"
                min="1"
                @input="setDiscountPrice(orderInfo.orderList[idx].qty, idx)"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">金額：</label>
          </div>
          <div class="col-8 col-md-10">
            <div v-for="(order, idx) in orderInfo.orderList" :key="idx">
              <Formatter
                v-if="!orderInfo.isEdit"
                :origin-data="order.totalPrice === null ? 0 : order.totalPrice"
                data-type="NumberComma"
              >
                <template #default="propsData">
                  {{ propsData.formatData }}
                </template>
              </Formatter>
              <b-form-input
                v-else
                v-model="orderInfo.orderList[idx].totalPrice"
                disabled
                class="mb-2"
              ></b-form-input>
            </div>
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
              v-if="!orderInfo.isEdit"
              :style="{
                display:
                  orderInfo.delivery.trackingUrl === ''
                    ? 'none'
                    : 'inline-block',
              }"
              :href="orderInfo.delivery.trackingUrl"
              target="_blank"
              class="mb-0 text-danger font-weight-bold text-decoration-underline"
              >物流單號：{{ orderInfo.delivery.trackingNo }}</a
            >
            <div v-else>
              <b-form-input
                v-model="orderInfo.delivery.trackingNo"
                placeholder="請輸入物流單號"
                class="mb-2"
              ></b-form-input>
              <b-form-input
                v-model="orderInfo.delivery.trackingUrl"
                placeholder="請輸入物流追蹤連結"
                class="mb-2"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">收貨地址：</label>
          </div>
          <div class="col-8 col-md-10">
            <EditTextInput
              :data-value.sync="orderInfo.receiver.address"
              :is-edit="orderInfo.isEdit"
              placeholder="請輸入收貨地址"
            />
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
              v-if="!orderInfo.isEdit"
              data-type="deliveryCompany"
              :origin-data="orderInfo.delivery.company"
            >
              <template #default="propsData">
                {{ propsData.formatData }}
              </template>
            </Formatter>
            <b-form-select
              v-else
              v-model="orderInfo.delivery.company"
              :options="deliveryCompanyOptions"
            >
            </b-form-select>
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
            <EditTextInput
              :data-value.sync="orderInfo.buyer"
              :is-edit="orderInfo.isEdit"
              placeholder="請輸入發票買受人"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">收件人</label>
          </div>
          <div class="col-8 col-md-10">
            <EditTextInput
              :data-value.sync="orderInfo.receiver.name"
              :is-edit="orderInfo.isEdit"
              placeholder="請輸入收件人"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">聯絡電話</label>
          </div>
          <div class="col-8 col-md-10">
            <EditTextInput
              :data-value.sync="orderInfo.phone"
              :is-edit="orderInfo.isEdit"
              placeholder="請輸入聯絡電話"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">統一編號</label>
          </div>
          <div class="col-8 col-md-10">
            <EditTextInput
              :data-value.sync="orderInfo.taxId"
              :is-edit="orderInfo.isEdit"
              placeholder="請輸入統一編號(8碼)"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">帳戶後5碼</label>
          </div>
          <div class="col-8 col-md-10">
            <EditTextInput
              :data-value.sync="orderInfo.bankAccountNo"
              :is-edit="orderInfo.isEdit"
              placeholder="請輸入金融帳戶後5碼"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">訂單備註</label>
          </div>
          <div class="col-8 col-md-10">
            <EditTextArea
              :data-value.sync="orderInfo.remark"
              :is-edit="orderInfo.isEdit"
              placeholder="輸入備註內容"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-end mb-4">
      <div class="col-4 col-md-2 text-right">
        <a
          v-if="!onEditMode"
          href="#"
          class="btn btn-secondary"
          style="width: 100px"
          @click="onEdit"
          >訂單修改</a
        >
        <a
          v-else
          href="#"
          class="btn btn-success"
          style="width: 100px"
          @click="onSave"
          >儲存</a
        >
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 d-flex justify-content-between align-items-center mb-3"
      >
        <h3 class="mb-0">附件相關</h3>
      </div>
    </div>
    <div class="row border-md border-top py-2 mb-3 mx-1 mx-sm-0">
      <div class="col-12">
        <div class="row mb-2">
          <div class="col-4 col-md-2">
            <label class="mb-0">附件下載</label>
          </div>
          <div class="col-8 col-md-10">
            <ul>
              <li
                v-for="(file, idx) in files"
                :key="idx"
                class="list-unstyled mb-2"
              >
                <a
                  class="text-info text-decoration-underline mr-2"
                  style="cursor: pointer"
                  @click.prevent="downloadFile(file)"
                  >{{ file.name }}</a
                >
                <DeleteAlert
                  style="font-size: 20px; cursor: pointer"
                  class="hover-icon"
                  @click="confirmDeleteFile(file)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-4 col-md-2">
            <label class="mb-0">附件上傳</label>
          </div>
          <div class="col-4">
            <FileUpload
              ref="fileUploadRef"
              :upload-progress="uploadProgress"
              :is-paused="paused"
              @upload="uploadFile"
              @pause="pauseUpload"
            />
          </div>
        </div>
      </div>
    </div>
    <Toaster
      :title="toastSet.title"
      :content="toastSet.content"
      :variant="toastSet.variant"
    />
    <NotifyModal
      ref="fileDeleteNote"
      ref-name="fileDeleteNote"
      title="檔案刪除"
      cancel-btn-name="取消"
      confirm-btn-name="確定"
      :main-content="fileDeleteNote"
      is-confirm-show
      @confirm="deleteFile"
    />
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import API from '~/utils/api.config'
import { initOrderInfo } from '@/assets/js/initData'
import Formatter from '~/components/Formatter.vue'
import EditTextInput from '~/components/Input/EditTextInput.vue'
import EditTextArea from '~/components/Input/EditTextArea.vue'
import Trigger from '~/components/Button/Trigger.vue'
import FileUpload from '@/components/File/FileUpload.vue'
import NotifyModal from '@/components/Modal/NotifyModal.vue'
import { normalDiscount } from '@/assets/js/tool'

export default {
  components: {
    Formatter,
    EditTextInput,
    EditTextArea,
    Trigger,
    FileUpload,
    NotifyModal,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.pageRecord = from.query.page
    })
  },
  middleware: ['auth'],
  data() {
    return {
      orderInfo: {},
      pageRecord: '',
      deliveryCompanyOptions: [
        {
          value: '1',
          text: '黑貓宅急便',
        },
        {
          value: '2',
          text: '嘉里大榮',
        },
        {
          value: '3',
          text: '中華郵政',
        },
      ],
      toastSet: {
        title: '',
        content: '',
        variant: '',
      },
      uploadProgress: 0,
      deleteQueue: null,
      paused: false,
      uploadTask: null,
      productInfo: {
        productId: 'AA00001',
        name: '公司登記實務及案例解析(共三冊)',
        content: ['有限公司篇', '股份有限公司篇', '應備文件詳析篇'],
        originalPrice: 5500,
        discount: {
          promote: 3200,
          normal: {
            '<20': 5200,
            '<50': 4900,
            '<100': 4500,
            '>=100': 4200,
          },
        },
      },
    }
  },
  head() {
    return {
      title: '訂單細節 - 訂單管理 - 有良冊股份有限公司',
      meta: [
        {
          name: 'description',
          content: '訂單細節 - 訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:description',
          content: '訂單細節 - 訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:title',
          content: '訂單細節 - 訂單管理 - 有良冊股份有限公司',
        },
        {
          property: 'og:image',
          content: '/yooooobook.jpg',
        },
        {
          property: 'og:url',
          content: 'https://www.yooooobook.com/admin/search/detail',
        },
      ],
    }
  },
  computed: {
    onEditMode() {
      return this.orderInfo.isEdit
    },
    files() {
      return this.orderInfo.files
    },
    fileDeleteNote() {
      return '確定要刪除此檔案嗎?'
    },
  },
  created() {
    this.orderInfo = initOrderInfo()
  },
  mounted() {
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo() {
      const orderId = this.$route.params.orderId
      const uid = this.$route.params.uid

      const orderFromVuexCopy = JSON.parse(
        JSON.stringify(this.$store.state.allOrderList)
      )
      const orderDetailFilter = orderFromVuexCopy.filter((item) => {
        return item.orderId === orderId
      })
      if (orderDetailFilter.length > 0) {
        // vuex的 state.orders 「有資料」時
        const orderDetail = orderDetailFilter[0]
        orderDetail.isEdit = false
        this.orderInfo = orderDetail
      } else {
        // vuex的 state.orders 「無資料」時
        this.$axios({
          method: API.order.getOrderInfo.method,
          url:
            API.order.getOrderInfo.url.replace(
              ':user_id/:order_id.json',
              uid + '/' + orderId + '.json'
            ) +
            '?auth=' +
            Cookie.get('id_token'),
        })
          .then((res) => {
            const orderDetail = res.data
            orderDetail.isEdit = false
            if (orderDetail.isFromGroup === undefined) {
              orderDetail.isFromGroup = false
            }
            if (orderDetail.files === undefined) {
              orderDetail.files = []
            }
            this.orderInfo = orderDetail
          })
          .catch(() => {
            this.openToast('訂單內容', '訂單內容取得失敗', 'danger')
          })
      }
    },
    toBack(e) {
      e.preventDefault()
      const lastPage = this.pageRecord
      if (lastPage) {
        this.$router.push({ name: 'admin-search', query: { page: lastPage } })
      } else {
        this.$router.push({ name: 'admin-search', query: { page: 1 } })
      }
    },
    onEdit(e) {
      e.preventDefault()
      this.orderInfo.isEdit = true
    },
    onSave(e) {
      e.preventDefault()
      const orderId = this.$route.params.orderId
      const uid = this.$route.params.uid

      const { isEdit, itemIndex, ...updatedData } = this.orderInfo
      delete updatedData.uid

      this.patchOrderInfo(orderId, uid, updatedData).then(() => {
        this.openToast('訂單狀態修改', '儲存成功', 'success')
      })
    },
    patchOrderInfo(orderId, uid, data) {
      return this.$axios({
        method: API.order.patchOrderInfo.method,
        url:
          API.order.patchOrderInfo.url.replace(
            ':user_id/:order_id.json',
            uid + '/' + orderId + '.json'
          ) +
          '?auth=' +
          Cookie.get('id_token'),
        data,
      })
        .then((item) => {
          this.orderInfo.isEdit = false
        })
        .catch(() => {
          this.openToast('訂單狀態修改', '修改失敗', 'danger')
        })
    },
    openToast(title, content, variant) {
      this.toastSet.title = title
      this.toastSet.content = content
      this.toastSet.variant = variant
      this.$bvToast.show('my-toast')
    },
    setDiscountPrice(orderQty, index) {
      const orderList = this.orderInfo.orderList
      const discount = this.productInfo.discount

      if (this.orderInfo.isFromGroup) {
        const groupPrice = discount.promote
        orderList[index].unitPrice = groupPrice
        orderList[index].totalPrice = orderList[index].qty * groupPrice
      } else {
        const priceList = this.productInfo.discount.normal
        const discount = normalDiscount(orderQty, priceList)
        orderList[index].unitPrice = discount
        orderList[index].totalPrice = orderList[index].qty * discount
      }
      const ordersTotalPrice = orderList.reduce(function (
        accumulator,
        currentValue
      ) {
        return accumulator + currentValue.totalPrice
      },
      0)
      this.orderInfo.totalPrice = ordersTotalPrice
    },
    updateIsFromGroup(status) {
      this.orderInfo.isFromGroup = status

      this.orderInfo.orderList.forEach((order, index) => {
        const orderQty = parseInt(order.qty)
        this.setDiscountPrice(orderQty, index)
      })
    },
    uploadFile(file) {
      // 上傳前檢查
      const isValid = this.uploadFileVerify(file)
      if (!isValid) return

      // 上傳檔案
      const fileType = file.type
      const fileName = file.name
      const orderId = this.$route.params.orderId
      const storageRef = this.$firebase.storage().ref()
      const orderFileRef = storageRef.child(`orderFile/${orderId}/${fileName}`)
      const metaData = {
        contentType: fileType,
      }
      const _this = this

      this.uploadTask = orderFileRef.put(file, metaData)
      this.uploadTask.on('state_changed', progress, error, complete)

      function progress(snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        _this.uploadProgress = progress

        switch (snapshot.state) {
          case 'paused':
            // eslint-disable-next-line no-console
            console.log('Upload is paused')
            _this.openToast('檔案上傳', '暫停上傳', 'danger')
            break
          case 'running':
            if (progress === 100) {
              const file = {
                name: snapshot.ref.name,
                refPath: snapshot.ref.fullPath,
              }
              _this.updateOrderFile('add', file)
            }
            break
        }
      }

      function error() {
        _this.openToast('檔案上傳', '上傳失敗', 'danger')
      }

      function complete() {
        // 清空input
        _this.$refs.fileUploadRef.clearFiles()
        _this.uploadTask = null
      }
    },
    uploadFileVerify(file) {
      const fileType = file.type
      const fileName = file.name
      const files = this.orderInfo.files

      // // 限制只能上傳 excel & pdf 檔案
      // 適用正則表達式來確認圖片類型(例：'image/*')
      const validFileType = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/pdf',
        'image/*',
      ]
      const isValidFileType = !!validFileType.find((type) => {
        const isMatch = fileType.match(type)
        return isMatch
      })

      if (!isValidFileType) {
        this.openToast(
          '檔案上傳',
          '上傳檔案類型只接受 .xls/.xlsx/.pdf/image圖檔',
          'danger'
        )
        return
      }

      let fileNameList = []
      // 確認上傳的檔案名稱(是否重複檔名)
      if (files && files.length > 0) {
        fileNameList = files.map((file) => {
          return file.name
        })
      }
      const isValidFileName = !fileNameList.includes(fileName)
      if (!isValidFileName) {
        this.openToast('檔案上傳', '檔名重複，請修改上傳檔案之檔名', 'danger')
        return
      }

      return isValidFileType && isValidFileName
    },
    pauseUpload() {
      const uploadTask = this.uploadTask
      if (uploadTask === null) return

      if (this.paused === false) {
        uploadTask.pause()
        this.paused = true
      } else {
        uploadTask.resume()
        this.paused = false
      }
    },
    downloadFile(file) {
      const storage = this.$firebase.storage()
      const storageRef = storage.ref()
      const fileRef = storageRef.child(file.refPath)

      fileRef
        .getDownloadURL()
        .then((url) => {
          this.$axios({
            url,
            method: 'GET',
            responseType: 'blob',
          })
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]))
              const link = document.createElement('a')
              const filename = file.name

              link.style.display = 'none'
              link.href = url
              link.setAttribute('download', filename)
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              // 釋放blob物件
              window.URL.revokeObjectURL(url)
            })
            .catch(() => {
              this.openToast('檔案下載', '下載失敗', 'danger')
            })
        })
        .catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break
          }
        })
    },
    confirmDeleteFile(file) {
      this.deleteQueue = file
      this.$refs.fileDeleteNote.showModal()
    },
    deleteFile() {
      const file = this.deleteQueue
      const refPath = file.refPath
      const storage = this.$firebase.storage()
      const desertRef = storage.ref(refPath)

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          this.updateOrderFile('delete', file)
          // File deleted successfully
          this.deleteQueue = null
        })
        .catch(() => {
          // Uh-oh, an error occurred!
          this.openToast('檔案刪除', '刪除失敗', 'danger')
        })
    },
    updateOrderFile(updateType, file) {
      const orderId = this.$route.params.orderId
      const uid = this.$route.params.uid
      const orderInfo = this.orderInfo

      if (updateType === 'add') {
        if (!orderInfo.files) {
          orderInfo.files = []
        }
        orderInfo.files.push(file)
        this.openToast('檔案上傳', '上傳成功', 'success')
      }
      if (updateType === 'delete') {
        const files = orderInfo.files
        const refPathList = files.map((file) => {
          return file.refPath
        })
        const fileIndex = refPathList.indexOf(file.refPath)
        if (fileIndex >= 0) {
          orderInfo.files.splice(fileIndex, 1)
        }
        this.openToast('檔案刪除', '刪除成功', 'success')
      }
      this.patchOrderInfo(orderId, uid, orderInfo)
    },
  },
}
</script>

<style lang="scss" scoped>
.text-decoration-underline {
  text-decoration: underline;
}

.border-md {
  @include media-w768 {
    border: 1px solid #dee2e6;
  }
}

.overlay {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
}

.hover-icon {
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.2);
    opacity: 0.8;
  }
}
</style>
