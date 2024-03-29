import API from '~/api/api.config'

export default (axios) => ({
  getStock(productId) {
    return axios({
      methods: API.stock.getStock.method,
      url: API.stock.getStock.url.replace(
        ':product_id.json',
        productId + '.json'
      ),
    })
  },
  patchStock(productId, qty, idToken) {
    return axios({
      method: API.stock.patchStock.method,
      url:
        API.stock.patchStock.url.replace(
          ':product_id.json',
          productId + '.json'
        ) +
        '?auth=' +
        idToken,
      data: qty,
    })
  },
})
