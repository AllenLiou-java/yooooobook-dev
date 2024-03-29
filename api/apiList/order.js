import API from '~/api/api.config'

export default (axios) => ({
  // 串接所有訂單資料
  getAllOrders(idToken) {
    return axios({
      method: API.order.getAllOrders.method,
      url: API.order.getAllOrders.url + '?auth=' + idToken,
    })
  },
  getOrderList(uid, idToken) {
    return axios({
      method: API.order.getOrderList.method,
      url:
        API.order.getOrderList.url.replace(':user_id.json', uid + '.json') +
        '?auth=' +
        idToken,
    })
  },
  getOrderInfo(uid, orderId, idToken) {
    return axios({
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
  patchOrderInfo(uid, orderId, idToken, data) {
    return axios({
      method: API.order.patchOrderInfo.method,
      url:
        API.order.patchOrderInfo.url.replace(
          ':user_id/:order_id.json',
          uid + '/' + orderId + '.json'
        ) +
        '?auth=' +
        idToken,
      data,
    })
  },
})
