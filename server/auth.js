/* eslint-disable camelcase */
const qs = require('querystring')
const express = require('express')
const app = express()
const axios = require('axios')

const google_client_id = process.env.GOOGLE_CLIENT_ID
const google_secret_id = process.env.GOOGLE_SECRET_ID // 這個一定不能曝露到客戶端!!!
// var firebaseApiKey = "AIzaSyCTwCfIuo0TtxxzJyOaj-1LJHO87WWVqbw" //填上firebase 的 api key (不能填 nuxt.config.js 裡的 process env)

// var process_url = "http://localhost:3013"; //填上你開發環境的網址
// if(process.env.NODE_ENV == "production") process_url = "https://wayne1894nuxt.club"; //填上你生產環境的網址

const firebaseApiKey = process.env.FIREBASE_API_KEY
const process_url = process.env.WEB_URL

app.get('/', (req, res) => {
  const referer = req.headers.referer // 前端請求過來的路徑
  if (!referer) {
    res.redirect('/')
    res.end()
  }

  // 前往以下網址，向Google的授權伺服器傳送要求
  const google_oauth_url =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    '&scope=email%20profile' +
    '&redirect_uri=' +
    process_url +
    '/auth/google' +
    '&state=' +
    referer +
    '&response_type=code' +
    '&client_id=' +
    google_client_id

  res.redirect(google_oauth_url)
})

app.get('/google', async (req, res) => {
  // 接收傳送過來的 state
  let referer = req.query.state
  if (referer.includes('?')) {
    // 有參數
    referer = referer + '&'
  } else {
    // 無參數
    referer = referer + '?'
  }

  // 如果使用者授予應用程式的存取權，您就可以將授權碼轉換為 access_token 和 refresh_token
  // 取得 google 的 access_token
  const api_url = 'https://oauth2.googleapis.com/token'
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  const token_option = {
    code: req.query.code,
    client_id: google_client_id,
    client_secret: google_secret_id,
    grant_type: 'authorization_code',
    // 要跟Google Console裡填的一樣
    redirect_uri: process_url + '/auth/google',
  }
  const result = await axios.post(api_url, qs.stringify(token_option), config)
  // const id_token = result.data.id_token // jwt token
  const access_token = result.data.access_token

  // console.log(access_token, "access_token")
  // 到這個流程就算取得 google 的 access_token ，你可以開始請求 google 的資源，例如請求使用者的 email
  // https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=ya29.a0Ae4lvC3EFz9mlS75b9DXi5x_1kIr83w21f6yk1S7JHmOm-rCJtzjWgW9_Z7QXwqweyDuhz-jATx2s_xieGZIPJPE6d4-B3wgrf2-BgN3m5BYStREsXsRmyq1x8CozKWConw3iugw-K0ZizMqqCge8kbT978CcVDTJWg

  // 使用 google 的 access_token 換取 firebase 的 token
  // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-with-oauth-credential
  const google_firebase =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=' +
    firebaseApiKey

  const firebase_result = await axios.post(google_firebase, {
    requestUri: process_url,
    postBody: 'access_token=' + access_token + '&providerId=google.com',
    returnSecureToken: true,
    returnIdpCredential: true,
  })

  // 要傳給前端的資訊
  const firebase_id_token = firebase_result.data.idToken
  const refresh_token = firebase_result.data.refreshToken

  res.redirect(
    referer +
      'id_token=' +
      firebase_id_token +
      '&refresh_token=' +
      refresh_token
  )
})

module.exports = app
