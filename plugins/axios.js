import { parseCookie } from '~/assets/js/tool'

export default function ({ $axios, store, req }) {
  $axios.onRequest((config) => {
    config.params = {
      key: process.env.FIREBASE_API_KEY,
    }
    return config
  })

  $axios.onResponse((response) => {
    if (response.status === 200 && response) {
      return response
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    const statusText = error.response.statusText
    // eslint-disable-next-line no-console
    // console.log(error.response)
    if (code === 400) {
      // redirect("/400")
      // eslint-disable-next-line no-console
      console.log('error', code)
    }
    if (code === 401 && statusText === 'Unauthorized') {
      if (process.server) {
        const cookiesFromServer = parseCookie(req.headers.cookie)
        store.dispatch('exchangeToken', cookiesFromServer.refresh_token)
      } else {
        store.dispatch('exchangeToken')
      }
    }
  })
}
