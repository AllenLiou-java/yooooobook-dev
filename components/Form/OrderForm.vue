<template>
  <div>
    <b-form novalidate @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-container fluid>
        <b-row cols="1" cols-md="2" cols-lg="3">
          <b-col v-for="(item, idx) in inputSetup" :key="idx">
            <b-form-group
              :id="'fieldset-' + idx"
              :label="item.title"
              :label-for="item.attrName"
            >
              <b-form-input
                :id="item.attrName"
                v-model="inputValue[item.attrName]"
                :state="
                  item.attrName === 'buyer'
                    ? buyerValidation
                    : item.attrName === 'recipient'
                    ? recipientValidation
                    : item.attrName === 'address'
                    ? addressValidation
                    : item.attrName === 'email'
                    ? emailValidation
                    : item.attrName === 'phone'
                    ? phoneValidation
                    : item.attrName === 'taxId'
                    ? taxIdValidation
                    : item.attrName === 'account'
                    ? accountValidation
                    : false
                "
                :type="item.type"
                :required="item.required"
                :placeholder="item.placeholder"
                trim
              ></b-form-input>

              <b-form-invalid-feedback
                :state="
                  item.attrName === 'buyer'
                    ? buyerValidation
                    : item.attrName === 'recipient'
                    ? recipientValidation
                    : item.attrName === 'address'
                    ? addressValidation
                    : item.attrName === 'email'
                    ? emailValidation
                    : item.attrName === 'phone'
                    ? phoneValidation
                    : item.attrName === 'taxId'
                    ? taxIdValidation
                    : item.attrName === 'account'
                    ? accountValidation
                    : false
                "
              >
                {{ item.invalidFeedback }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>

      <div class="d-flex justify-content-end">
        <b-button
          v-for="(btnItem, idx) in btnSetup"
          :key="idx"
          :type="btnItem.type"
          :variant="btnItem.variant"
          class="ml-3"
          >{{ btnItem.btnName }}</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    inputSetup: {
      type: Array,
      required: true,
    },
    btnSetup: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      default() {
        return {
          buyer: '',
          recipient: '',
          address: '',
          email: '',
          phone: '',
          taxId: '',
          account: '',
        }
      },
    },
  },
  data() {
    return {
      inputValue: this.formData,
    }
  },
  computed: {
    buyerValidation() {
      const data = this.inputValue.buyer
      return data.length !== 0
    },
    recipientValidation() {
      const data = this.inputValue.recipient
      return data.length !== 0
    },
    addressValidation() {
      const data = this.inputValue.address
      return data.length !== 0
    },
    emailValidation() {
      const data = this.inputValue.email
      const emailRule =
        // eslint-disable-next-line no-useless-escape
        /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      return data.search(emailRule) !== -1
    },
    phoneValidation() {
      const data = this.inputValue.phone
      // const phoneRule = /^09[0-9]{8}$/
      const phoneRule =
        /^(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})$/

      return data.search(phoneRule) !== -1
    },
    taxIdValidation() {
      const data = this.inputValue.taxId
      return data.length === 0 || data.length === 8
    },
    accountValidation() {
      const data = this.inputValue.account
      return data.length === 5
    },
  },
  methods: {
    onSubmit() {
      if (!this.buyerValidation) return
      if (!this.recipientValidation) return
      if (!this.addressValidation) return
      if (!this.emailValidation) return
      if (!this.phoneValidation) return
      if (!this.accountValidation) return
      this.$emit('submitEvent', this.inputValue)
    },
    onReset() {
      this.$emit('resetEvent')
    },
  },
}
</script>
