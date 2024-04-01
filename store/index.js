/* eslint-disable camelcase */
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
import qs from 'qs'
import API from '~/utils/api.config'

export const state = () => ({
  isUserLoggedIn: false,
  userPicture: '',
  userName: '',
  userUid: '',
  userEmail: '',
  emailVerified: false,
  isOpenLoginModal: false,
  isOpenLogoutModal: false,
  modalType: 'login',
  order: {},
  userOrderList: [],
  allOrderList: [],
  isAdministrator: false,
})

export const mutations = {
  setUserLoggedIn(state, payload) {
    state.isUserLoggedIn = true
    state.userPicture =
      payload.userPicture ||
      'https://dummyimage.com/100/5c6bc0/fff&text=' + payload.userName
    state.userName = payload.userName
    state.userUid = payload.userUid
    state.userEmail = payload.email
    state.emailVerified = payload.emailVerified

    if (process.client) {
      Cookie.set('userName', payload.userName)
      Cookie.set('emailVerified', payload.emailVerified)
      Cookie.set('userUid', payload.userUid)
      Cookie.set('id_token', payload.id_token)
      Cookie.set('refresh_token', payload.refresh_token)
      Cookie.set('email', payload.email)
      Cookie.set('userPicture', state.userPicture)
    }
  },
  setUserLogout(state, payload) {
    state.isUserLoggedIn = false
    state.userName = ''
    state.userPicture = ''

    if (process.client) {
      // 移除Cookie資訊
      Cookie.remove('id_token')
      Cookie.remove('refresh_token')
      Cookie.remove('userUid')
      Cookie.remove('userPicture')
      Cookie.remove('userName')
      Cookie.remove('email')
      Cookie.remove('emailVerified')
      Cookie.remove('orderListInCart')
      Cookie.remove('isAdministrator')
    }
  },
  setUserName(state, payload) {
    state.userName = payload
  },
  setOpenLoginModal(state, payload) {
    state.isOpenLoginModal = payload
  },
  setOpenLogoutModal(state, payload) {
    state.isOpenLogoutModal = payload
  },
  setModalType(state, payload) {
    state.modalType = payload
  },
  setEmailVerified(state, payload) {
    state.emailVerified = payload
  },
  seUsertOrder(state, payload) {
    state.order = payload
  },
  setUserOrderList(state, payload) {
    state.userOrderList = payload
  },
  setAllOrderList(state, payload) {
    state.allOrderList = payload
  },
  setIsAdministrator(state, payload) {
    state.isAdministrator = payload
  },
}

export const getters = {}

export const actions = {
  async nuxtServerInit({ state, commit, dispatch }, context) {
    let isAdministrator = false

    // Oauth 回來時提早觸發
    if (context.query.id_token && context.query.refresh_token) {
      const id_token_Decode = jwtDecode(context.query.id_token)
      commit('setUserLoggedIn', {
        userName: id_token_Decode.name,
        userUid: id_token_Decode.user_id,
        userPicture: id_token_Decode.picture,
        email: id_token_Decode.email,
        id_token: context.query.id_token,
        refresh_token: context.query.refresh_token,
      })

      dispatch('saveMemberInfo', {
        name: id_token_Decode.name,
        userUid: id_token_Decode.user_id,
        picture: id_token_Decode.picture,
        email: id_token_Decode.email,
        idToken: context.query.id_token,
      })

      // 判斷是否擁有後臺權限
      try {
        const promiseAuthList = await dispatch(
          'getAuthList',
          context.query.id_token
        )
        const authList = promiseAuthList.data
        isAdministrator = authList[id_token_Decode.user_id] === true
        context.app.$cookies.set('isAdministrator', isAdministrator)
        commit('setIsAdministrator', isAdministrator)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }

      // 在後端設定cookie
      context.app.$cookies.set('userName', id_token_Decode.name)
      context.app.$cookies.set('email', id_token_Decode.email)
      context.app.$cookies.set('userUid', id_token_Decode.user_id)
      context.app.$cookies.set('userPicture', id_token_Decode.picture)
      context.app.$cookies.set('id_token', context.query.id_token)
      context.app.$cookies.set('refresh_token', context.query.refresh_token)
      return
    }

    // 網頁重整時觸發
    if (context.app.$cookies.get('id_token')) {
      const picture = context.app.$cookies.get('userPicture')
      const name = context.app.$cookies.get('userName')
      const uid = context.app.$cookies.get('userUid')
      // const email = context.app.$cookies.get('email')

      commit('setUserLoggedIn', {
        userPicture: picture,
        userName: name,
        userUid: uid,
      })

      // 判斷是否擁有後臺權限，並更新
      const isAdministrator = context.app.$cookies.get('isAdministrator')
      commit('setIsAdministrator', isAdministrator)
    }
  },
  saveMemberInfo({ state, commit }, payload) {
    const uid = (payload && payload.userUid) || state.userUid
    const { idToken, ..._payload } = payload
    const _data = _payload || {
      name: state.userName,
      picture: state.userPicture,
    }

    return this.$axios({
      method: API.patchMemberInfo.method,
      url:
        API.patchMemberInfo.url.replace(':user_id.json', uid + '.json') +
        '?auth=' +
        idToken,
      data: {
        ..._data,
      },
    })
      .then((res) => {
        commit('setOpenLoginModal', false)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error, 'error')
      })
  },
  getOrderList({ state, commit, dispatch }, payload) {
    const uid = payload.localId || Cookie.get('userUid')
    const id_token = payload.idToken

    return this.$axios({
      method: API.order.getOrderList.method,
      url:
        API.order.getOrderList.url.replace(':user_id.json', uid + '.json') +
        '?auth=' +
        id_token,
    })
      .then((item) => {
        if (!item.data) return
        const orders = Object.values(item.data)

        commit('setUserOrderList', orders)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  getOrderInfo(context, payload) {
    const orderId = payload.orderId
    const uid = payload.uid
    const idToken = payload.idToken
    return this.$axios({
      method: API.order.getOrderInfo.method,
      url:
        API.order.getOrderInfo.url.replace(
          ':user_id/:order_id.json',
          uid + '/' + orderId + '.json'
        ) +
        '?auth=' +
        idToken,
    })
  },
  exchangeToken({ state, commit }) {
    const refreshToken = Cookie.get('refresh_token')

    const data = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }

    this.$axios({
      method: API.member.exchangeToken.method,
      url: API.member.exchangeToken.url,
      baseURL: API.member.exchangeToken.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })
      .then((res) => {
        if (process.client) {
          Cookie.set('id_token', res.data.id_token)
          Cookie.set('refresh_token', res.data.refresh_token)

          location.reload()
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error, 'error')
      })
  },
  getAuthList(context, idToken) {
    return this.$axios({
      method: API.auth.getAuthList.method,
      url: API.auth.getAuthList.url + '?auth=' + idToken,
    })
  },
}
