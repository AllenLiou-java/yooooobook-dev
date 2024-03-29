const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/orderConfirm', (req, res) => {
  const orderInfo = req.body

  sendOrderConfirmMail(orderInfo)
    .then((result) => {
      res.status(200).send('SEND OK')
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })
})

function contentHtml(orderInfo) {
  return `
  <p style="font-size: 20px; font-weight: bold;">親愛的顧客您好，</p>
  <p style="font-size: 16px;">感謝您的訂購，敬請於 <u>3日內</u> 將款項匯款至以下： </p>
  <ul style="font-size: 16px; list-style: none; padding-left: 0px; margin-top: 0">
    <li>匯款銀行：<span style="color: #F75000;">玉山銀行 - 台中分行</span></li>
    <li>銀行代碼：<span style="color: #F75000;">808</span></li>
    <li>銀行帳戶：<span style="color: #F75000;">1366940052966</span></li>
    <li>戶名：<span style="color: #F75000;">有良冊股份有限公司</span></li>
  </ul>
  <p style="font-size: 16px;">並於匯款後至有良冊LINE官方帳號(<span style="color: red;">@yooooobook</span>)告知您的<span style="color: #D26900;">「訂單編號」</span>、<span style="color: #D26900;">「匯款金額」</span>及<span style="color: #D26900;">「帳號末5碼」</span>等資料，</p>
  <p style="font-size: 16px;">我們將每天進行統一對帳，如無問題將不另行通知，或可至訂單查詢處查詢訂單進度。</p>
  
  <p style="font-size: 18px; font-weight: bold; margin-bottom: 0">【訂單資訊】</p>
  <ul style="font-size: 16px; list-style: none; padding-left: 0px; margin-top: 0">
    <li>訂單編號：${orderInfo.orderId}</li>
    <li>訂單日期：${orderInfo.oderDate}</li>
    <li>商品名稱：${orderInfo.orderList[0].productName}</li>
    <li>商品數量：${orderInfo.orderList[0].qty}</li>
    <li>商品金額：${orderInfo.totalPrice}</li>
  </ul>
  
  <p style="font-size: 18px; font-weight: bold; margin-bottom: 0">【發票及商品收件資料】</p>
  <ul style="font-size: 16px; list-style: none; padding-left: 0px; margin-top: 0">
    <li>收件人：${orderInfo.receiver.name}</li>
    <li>電話：${orderInfo.phone}</li>
    <li>寄送地址：${orderInfo.receiver.address}</li>
    <li>發票買受人：${orderInfo.buyer}</li>
    <li>發票統編：${orderInfo.taxId}</li>
  </ul>
  
  <p style="font-size: 18px; font-weight: bold; margin-bottom: 0">【其他注意事項】</p>
  <ul style="font-size: 16px; list-style: none; padding-left: 0px; margin-top: 0">
    <li>1、本訂單尚未完成訂購，若未於三日內完成匯款，視同未完成預購，若需購買請重新填單或連繫客服後再匯款。</li>
    <li>2、本商品預計將於12月中旬起依預購完成順序陸續出貨，敬請耐心等候。</li>
    <li>3、其他訂單問題，請洽LINE官方帳號：<span style="color: red;">@yooooobook</span>。</li>
  </ul>
  
  <p style="font-size: 16px;">(此信件由系統送出，請勿直接回覆)</p>
  `
}

async function sendOrderConfirmMail(orderInfo) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yooooobook@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'yooooobook@gmail.com',
    to: orderInfo.email,
    subject: '公司登記實務及案例解析【訂單成立通知】',
    html: contentHtml(orderInfo),
  }

  const result = await transporter.sendMail(mailOptions)
  return result
}

module.exports = app
