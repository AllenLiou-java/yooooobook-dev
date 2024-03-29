const API = {
  member: {
    // 會員登入 with email / password
    login: {
      url: '/v1/accounts:signInWithPassword',
      method: 'post',
    },
    // 會員註冊 with email / password
    registered: {
      url: '/v1/accounts:signUp',
      method: 'post',
    },
    // 使用 refresh token 換取 ID token
    exchangeToken: {
      baseUrl: 'https://securetoken.googleapis.com',
      url: '/v1/token',
      method: 'post',
    },
    // request參數 {"requestType": "VERIFY_EMAIL", "idToken": ""}
    emailVerify: {
      url: '/v1/accounts:sendOobCode',
      method: 'post',
    },
    // request參數 {"requestType": "PASSWORD_RESET", "email": ""}
    passwordReset: {
      url: '/v1/accounts:sendOobCode',
      method: 'post',
    },
    getAccountInfo: {
      url: '/v1/accounts:lookup',
      method: 'post',
    },
  },
  // 取得會員資料
  getMemberInfo: {
    url: '/users/:user_id.json',
    method: 'get',
  },
  // 新增/編輯會員資料
  patchMemberInfo: {
    url: '/users/:user_id.json',
    method: 'patch',
  },
  order: {
    getAllOrders: {
      url: '/order.json',
      method: 'get',
    },
    // 取得會員的訂單列表
    getOrderList: {
      url: '/order/:user_id.json',
      method: 'get',
    },
    // 取得會員的特定訂單內容
    getOrderInfo: {
      url: '/order/:user_id/:order_id.json',
      method: 'get',
    },
    // 新增會員的訂單資訊
    patchOrderInfo: {
      url: '/order/:user_id/:order_id.json',
      method: 'patch',
    },
  },
  stock: {
    getStock: {
      url: '/stock/:product_id.json',
      method: 'get',
    },
    patchStock: {
      url: '/stock/:product_id.json',
      method: 'patch',
    },
  },
  products: {
    getProducts: {
      url: '/products.json',
      method: 'get',
    },
    getProduct: {
      url: '/products/:product_id.json',
      method: 'get',
    },
  },
  auth: {
    getAuthList: {
      url: '/auth.json',
      method: 'get',
    },
  },
}

export default API
