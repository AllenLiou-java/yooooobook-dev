import API from '~/api/api.config'

export default (axios) => ({
  getProducts() {
    return axios({
      methods: API.products.getProducts.method,
      url: API.products.getProducts.url,
    })
  },
  getProduct(productId) {
    return axios({
      methods: API.products.getProduct.method,
      url: API.products.getProduct.url.replace(
        ':product_id.json',
        productId + '.json'
      ),
    })
  },
})
