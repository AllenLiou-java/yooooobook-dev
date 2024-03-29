<template>
  <div>
    <div :class="[isOpenLogoutModal ? 'background_modal' : '']"></div>
    <client-only>
      <div
        ref="wrapper"
        :class="['wrapper', isOpenLogoutModal ? 'active_popup' : '']"
      >
        <span class="icon_close">
          <close @click="closeModal()" />
        </span>

        <div class="form_box logout">
          <h2 class="mb-3">登出</h2>

          <form>
            <div
              class="user_info d-flex flex-column justify-content-center align-items-center"
            >
              <div class="img_wrappr">
                <img :src="userPicture" alt="user_photo" />
              </div>
              <p class="mb-2">{{ email }}</p>
              <template v-if="isEmailVerified">
                <a class="btn btn-success col-4 mb-3 p-1">
                  <CheckBold class="mr-1" />Email 已驗證
                </a>
              </template>
              <template v-else>
                <a
                  v-if="!hasSendedVerifiedEmail"
                  class="btn btn-danger col-4 mb-3 p-1"
                  @click="verifiedEmail"
                >
                  Email 待驗證
                </a>
                <a v-else class="btn btn-danger col-4 mb-3 p-1 disabled">
                  已送出驗證信
                </a>
              </template>
            </div>

            <button type="submit" class="btn btn_secondary" @click="logout">
              登出
            </button>
          </form>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { unlockScroll } from '@/assets/js/tool'

export default {
  name: 'LogoutModal',
  props: {
    isOpenLogoutModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasSendedVerifiedEmail: false,
    }
  },
  computed: {
    userName() {
      return this.$store.state.userName
    },
    userPicture() {
      return this.$store.state.userPicture
    },
    email() {
      if (this.$store.state.userEmail) {
        return this.$store.state.userEmail
      } else {
        return Cookie.get('email')
      }
    },
    isEmailVerified() {
      return this.$store.state.emailVerified
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:isOpenLogoutModal', false)
      unlockScroll()
    },
    logout() {
      this.$store.commit('setUserLogout')
      this.closeModal()
    },
    verifiedEmail() {
      if (!this.hasSendedVerifiedEmail) {
        this.$emit('verifiedEmail')
        this.hasSendedVerifiedEmail = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './logoutModal.scss';
</style>
