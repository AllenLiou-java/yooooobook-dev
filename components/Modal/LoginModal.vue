<template>
  <div>
    <div :class="[isOpenModal ? 'background_modal' : '']"></div>
    <client-only>
      <div
        ref="wrapper"
        :class="['wrapper', isOpenModal ? 'active_popup' : '']"
      >
        <span class="icon_close">
          <close @click="closeModal()" />
        </span>

        <div v-if="modalType == 'login'" class="form_box login">
          <h2>{{ modalTitle }}</h2>
          <a href="/auth/">
            <button class="btn btn_socialLogin">
              <Google />使用Google帳號{{ modalTitle }}
            </button>
          </a>
          <hr class="login_or" />

          <form novalidate @submit="checkForm">
            <div class="input_box">
              <span class="icon">
                <email />
              </span>
              <input ref="emailInput" v-model="email" type="email" />
              <label>Email</label>
              <p v-if="emailWithError" class="errorMsg">請檢查email是否正確</p>
            </div>
            <div class="input_box">
              <span class="icon">
                <lock />
              </span>
              <input
                ref="passwordInput"
                v-model="password"
                type="password"
                autocomplete
              />
              <label>Password</label>
              <p v-if="passwordWithError" class="errorMsg">請輸入password</p>
            </div>
            <a
              class="d-inline-block mb-3 text-secondary fw-bold"
              href="#"
              @click="toChangePassword"
              >忘記密碼?</a
            >
            <p class="errorMsg">{{ errorMsg }}</p>
            <button type="submit" class="btn btn-secondary">
              {{ modalTitle }}
            </button>
            <div class="login_register">
              <p>
                尚未擁有帳號?
                <a href="#" class="register_link" @click.prevent="toRegister()"
                  >前往註冊</a
                >
              </p>
            </div>
          </form>
        </div>

        <div v-if="modalType == 'register'" class="form_box register">
          <h2>{{ modalTitle }}</h2>
          <a href="/auth/">
            <button class="btn btn_socialLogin">
              <Google />使用Google帳號{{ modalTitle }}
            </button>
          </a>
          <hr class="login_or" />

          <form novalidate @submit="checkForm">
            <div class="input_box">
              <span class="icon">
                <account />
              </span>
              <input ref="usernameInput" v-model="username" type="text" />
              <label>Username</label>
              <p v-if="nameWithError" class="errorMsg">請輸入username</p>
            </div>
            <div class="input_box">
              <span class="icon">
                <email />
              </span>
              <input ref="emailInput" v-model="email" type="email" />
              <label>Email</label>
              <p v-if="emailWithError" class="errorMsg">請檢查email是否正確</p>
            </div>
            <div class="input_box">
              <span class="icon">
                <lock />
              </span>
              <input
                ref="passwordInput"
                v-model="password"
                type="password"
                autocomplete
              />
              <label>Password</label>
              <p v-if="passwordWithError" class="errorMsg">請輸入password</p>
            </div>
            <div class="input_box">
              <span class="icon">
                <lock />
              </span>
              <input
                ref="repeatPasswordInput"
                v-model="repeatPassword"
                type="password"
                autocomplete
              />
              <label>Repeat Password</label>
              <p v-if="repeatPasswordWithError" class="errorMsg">
                請檢查Password與Repeat Password是否相同
              </p>
            </div>
            <p class="errorMsg">{{ errorMsg }}</p>
            <button type="submit" class="btn btn-secondary">
              {{ modalTitle }}
            </button>
            <div class="login_register">
              <p>
                已經擁有帳號?
                <a href="#" class="login_link" @click.prevent="toLogin()"
                  >前往登入</a
                >
              </p>
            </div>
          </form>
        </div>
        <div
          v-if="modalType == 'forgetPassword'"
          class="form_box forgetPassword"
        >
          <h2>{{ modalTitle }}</h2>

          <form novalidate @submit="checkForm">
            <div class="input_box">
              <span class="icon">
                <email />
              </span>
              <input ref="emailInput" v-model="email" type="email" />
              <label>Email</label>
              <p v-if="emailWithError" class="errorMsg">請檢查email是否正確</p>
            </div>
            <p class="errorMsg">{{ errorMsg }}</p>

            <div class="row row-cols-1 row-cols-md-2 gx-md-5">
              <div class="col mb-sm-3 mb-md-0">
                <button type="submit" class="btn btn-secondary">
                  發送請求
                </button>
              </div>
              <div class="col">
                <button type="submit" class="btn btn-primary" @click="toLogin">
                  返回
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { unlockScroll } from '@/assets/js/tool'

export default {
  name: 'LoginModal',
  props: {
    isOpenModal: {
      type: Boolean,
      default: false,
    },
    modalType: {
      type: String,
      required: true,
    },
    errorMsg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      username: '',
      emailWithError: false,
      passwordWithError: null,
      nameWithError: null,
      repeatPasswordWithError: null,
    }
  },
  computed: {
    modalTitle() {
      if (this.modalType === 'login') {
        return '登入'
      } else if (this.modalType === 'register') {
        return '註冊'
      } else if (this.modalType === 'forgetPassword') {
        return '變更密碼'
      } else {
        return '登出'
      }
    },
  },
  watch: {
    email(newVal, oldVal) {
      const input = this.$refs.emailInput
      if (this.email) {
        input.classList.add('active')
      } else {
        input.classList.remove('active')
      }

      if (newVal !== oldVal) {
        this.emailWithError = ''
      }
    },
    password(newVal, oldVal) {
      const input = this.$refs.passwordInput
      if (this.password) {
        input.classList.add('active')
      } else {
        input.classList.remove('active')
      }

      if (newVal !== oldVal) {
        this.passwordWithError = ''
      }
    },
    repeatPassword(newVal, oldVal) {
      const input = this.$refs.repeatPasswordInput
      if (this.repeatPassword) {
        input.classList.add('active')
      } else {
        input.classList.remove('active')
      }

      if (newVal !== oldVal) {
        this.repeatPasswordWithError = ''
      }
    },
    username(newVal, oldVal) {
      const input = this.$refs.usernameInput
      if (this.username) {
        input.classList.add('active')
      } else {
        input.classList.remove('active')
      }

      if (newVal !== oldVal) {
        this.nameWithError = ''
      }
    },
  },
  methods: {
    toRegister() {
      const wrapper = this.$refs.wrapper
      wrapper.classList.add('activeRegister')

      this.$emit('update:modalType', 'register')
      this.formDataReset()
    },
    toLogin() {
      const wrapper = this.$refs.wrapper
      wrapper.classList.remove('activeRegister')
      wrapper.classList.remove('activeForgetPassword')
      this.$emit('update:modalType', 'login')
      this.formDataReset()
    },
    toChangePassword() {
      const wrapper = this.$refs.wrapper
      wrapper.classList.add('activeForgetPassword')
      this.$emit('update:modalType', 'forgetPassword')
      this.formDataReset()
    },
    formDataReset() {
      this.email = ''
      this.password = ''
      this.repeatPassword = ''
      this.username = ''
      this.emailWithError = false
      this.passwordWithError = false
      this.nameWithError = false
      this.repeatPasswordWithError = false
      this.$emit('update:errorMsg', '')
    },
    closeModal() {
      this.$emit('update:isOpenModal', false)
      this.$emit('update:modalType', 'login')
      this.formDataReset()
      unlockScroll()
    },
    checkForm(e) {
      e.preventDefault()

      this.emailWithError = false
      this.passwordWithError = false
      this.nameWithError = false
      this.repeatPasswordWithError = false

      const emailRule =
        // eslint-disable-next-line no-useless-escape
        /^\w+((-\w+)|(\.\w+)|(\+\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

      // 驗證 email、密碼
      if (this.modalType === 'login') {
        if (this.email.search(emailRule) === -1)
          return (this.emailWithError = true)

        if (!this.password) return (this.passwordWithError = true)
      }

      // 驗證 userName、email、密碼
      if (this.modalType === 'register') {
        if (!this.username) return (this.nameWithError = true)
        if (!this.email) return (this.emailWithError = true)
        if (!this.password) return (this.passwordWithError = true)

        if (this.repeatPassword !== this.password) {
          return (this.repeatPasswordWithError = true)
        }
      }

      // 驗證email
      if (this.modalType === 'forgetPassword') {
        if (this.email.search(emailRule) === -1)
          return (this.emailWithError = true)
      }

      this.emitFormContent()
    },
    emitFormContent() {
      // 傳送emit事件與data 到default.vue執行login & register
      this.$emit('loginModalSubmit', {
        modalType: this.modalType,
        name: this.username,
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import './loginModal.scss';
</style>
