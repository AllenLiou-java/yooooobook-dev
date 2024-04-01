import indexApi from '@/utils/index'

// 轉換indexApi

export default function ({ $axios, store }, inject) {
  function axiosConfig($axios) {
    let requestConfig = {}

    // 設置API域名
    $axios.setBaseURL(process.env.API_URL)

    // 設置request攔截器
    $axios.onRequest((config) => {
      requestConfig = {
        baseURL: config.baseURL,
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers,
        params: config.params,
      }

      config.params = {
        key: process.env.FIREBASE_API_KEY,
      }

      config.startTime = new Date().getTime()
      config.headers['Content-Type'] = 'application/json'

      return config
    })

    // 設置response攔截器
    $axios.onResponse((response) => {
      response.config.endTime = new Date().getTime()
      const status = response.status

      if (status === 200) {
        console.info(
          response.config.url,
          '請求時間',
          response.config.endTime - response.config.startTime + 'ms'
        )
        return response
      } else {
        const responseConfig = response ? response.config : {}
        console.error('response攔截報錯提示：', {
          url: responseConfig.baseURL + responseConfig.url,
          sttatus: response.status,
          statusText: response.statusText,
          method: responseConfig.method,
          headers: responseConfig.headers,
          data: responseConfig.data,
          params: responseConfig.params,
          responseData: response.data,
        })
      }
    })

    $axios.onError((error) => {
      const response = error.response || {}
      const responseConfig = response.config || {}
      console.error('$axios.onError:', error)
      console.error('錯誤處理提示', {
        url: responseConfig.baseURL,
        status: response.status,
        statusText: response.statusText,
        method: responseConfig.method,
        headers: responseConfig.headers,
        data: responseConfig.data,
        params: responseConfig.params,
        responseData: response.data,
        ...requestConfig,
      })
    })

    return $axios
  }

  const apiObject = {}
  for (const i in indexApi) {
    apiObject[i] = indexApi[i](axiosConfig($axios))
  }

  inject('api', apiObject)
}
