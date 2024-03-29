<template>
  <div class="accordion" role="tablist">
    <client-only>
      <b-card
        v-for="(qa, idx) in qaList"
        :key="idx"
        no-body
        class="mb-2"
        border-variant="secondary"
        header-bg-variant="secondary"
      >
        <div
          v-b-toggle="'accordion-' + qa.id"
          class="btn btn-secondary rounded-0 text-left p-2"
        >
          {{ qa.title }}
        </div>

        <b-collapse
          :id="'accordion-' + qa.id"
          :visible="false"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body body-text-variant="secondary" class="px-4 py-2">
            <b-card-text>
              <ul class="list-unstyled mb-0">
                <li v-for="(item, no) in qa.text" :key="no" class="mb-1">
                  <!-- {{ item }} -->
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <p class="mb-0" v-html="item"></p>
                </li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qaList: [
        {
          title: 'Q1、 預購流程 & 匯款方式？',
          text: [
            '▶ 填寫預購單<span style="color: red;">（預購至11月15日截止）</span> > 三日內匯款完成 > 確認收到款項後即完成預購 > 12月中旬起依預購完成順序陸續出貨，發票隨貨寄出 > 缺頁或破損請於收到後七日內連繫客服寄回進行換貨。',
            `▶ 備註1：請於 <u style="color: red;">3日內</u> 將款項匯款至以下：
                      <ul style="font-size: 16px; list-style: none; padding-left: 20px; margin-top: 16px; margin-bottom: 16px">
                        <li>匯款銀行：<span style="color: #F75000;">玉山銀行 - 台中分行</span></li>
                        <li>銀行代碼：<span style="color: #F75000;">808</span></li>
                        <li>銀行帳戶：<span style="color: #F75000;">1366940052966</span></li>
                        <li>戶名：<span style="color: #F75000;">有良冊股份有限公司</span></li>
                      </ul>
                      <p style="font-size: 16px; margin-bottom: 0;">並於匯款後至有良冊LINE官方帳號(<span style="color: red;">@yooooobook</span>)告知您的<span style="color: #D26900;">「訂單編號」</span>、<span style="color: #D26900;">「匯款金額」</span>及<span style="color: #D26900;">「帳號末5碼」</span>等資料，我們將每天進行統一對帳，如無問題將不另行通知。</p>
                      `,
            '▶ 備註2：若想查詢訂單進度，可前往<span style="color: red ;">「訂單查詢」</span>了解處理進度。',
          ],
          id: 1,
        },
        {
          title: 'Q2、 預購後未於時間內匯款？',
          text: [
            `視同未完成預購，若需購買請 <u style="font-weight: bold;">重新填單</u> 或 <u style="font-weight: bold;">聯繫客服</u><span style="color: red ;"> (請掃網站最下方QR Code加入本公司官方LINE帳號)</span>後再匯款。`,
          ],
          id: 2,
        },
        {
          title: 'Q3、 下訂後想要增加訂單數量？',
          text: [
            '▶ 已匯款者：請直接另外<span style="color: red ;">填寫新預購訂單並匯款</span>，我們於出貨時亦會依據訂單完成順序分批寄送。',
            `▶ 尚未匯款者：請直接聯繫客服<span style="color: red ;"> (請掃網站最下方QR Code加入本公司官方LINE帳號)</span>更改數量。`,
          ],
          id: 3,
        },
        {
          title: 'Q4、 下訂後想要減少訂單數量？',
          text: [
            `▶ 已匯款者:聯繫客服<span style="color: red ;"> (請掃網站最下方QR Code加入本公司官方LINE帳號)</span>修改數量，並提供退款帳號，最遲將於十個工作天內完成退款。`,
            '▶ 尚未匯款者:請直接<span style="color: red ;">聯繫客服</span>更改數量。',
          ],
          id: 4,
        },
        {
          title: 'Q5、 訂購金額是否需付額外的運費？',
          text: [
            '於預購期間完成預購者，運費部分將由本公司負擔，不需額外支付運費。（公會/協會等名義團體除外）',
          ],
          id: 5,
        },
        {
          title: 'Q6、預計什麼時候可以收到商品？',
          text: [
            '預計將於<span style="color: red ;">12月中旬</span>起依預購完成順序陸續出貨。',
          ],
          id: 6,
        },
        {
          title: 'Q7、 預購有什麼好處？ 預購截止後還可以購買嗎？',
          text: [
            '因本套書係依據預購數量印製數量，故本次預購銷售完畢後倘有剩餘存貨，還是可以購買本公司商品，惟不保證預購期間結束後是否有多餘商品供貨，仍建議於預購期間完成預購程序，以免向隅。',
          ],
          id: 7,
        },
        {
          title: 'Q8、 如果有公司登記相關問題，該如何聯繫你們？',
          text: [
            `▶ 書籍內容勘誤 ⇀ 請聯絡客服<span style="color: red ;"> (請掃網站最下方QR Code加入本公司官方LINE帳號)</span>。`,
            '▶ 公司登記問題 ⇀ 可以加入我們的line官方帳號<span style="color: red ;"> (請掃網站最下方QR Code加入本公司官方LINE帳號)</span>，並留下您的問題，我們會提供您完整的資訊。惟各公司登記機關對於所轄申請案件具有行政裁量權，案件仍應以所轄公司登記機關之規定辦理。',
          ],
          id: 8,
        },
        {
          title: 'Q9、 加入有良冊LINE官方帳號有什麼好處？',
          text: [
            `1、如果有什麼需求需要聯絡，可以透過LINE官方帳號<span style="color: red ;"> (請掃網站最下方QR Code加入)</span>即時聯繫我們。`,
            '2、免費提供公司登記問題回復，並詳述您的問題，我們會提供完整的資訊。',
            '3、如果書籍有錯誤需更正的地方，我們都會透過LINE官方帳號及E-MAIL通知書籍勘誤修正處。',
            '4、我們會不定期發送公司登記實務案例及相關函釋解析，讓讀者可及時取得公司登記相關的最新規定。',
            '5、本公司預計未來將陸續推出公司登記實務案例進階篇相關書籍，並將透過LINE官方帳號通知新書預購資訊。',
          ],

          id: 9,
        },
        {
          title: 'Q10、 可否單買其中一本書？',
          text: [
            '目前皆以<span style="color: red ;">套書方式</span>進行販售。',
          ],
          id: 10,
        },
        {
          title: 'Q11、 如何查詢我的訂單狀態？',
          text: [
            '登入會員後，點選<span style="color: red ;">「訂單查詢」</span>，即可查詢訂單狀態。',
          ],
          id: 11,
        },
        {
          title: 'Q12、 為什麼匯款後訂單狀態還未顯示已收到款項？',
          text: [
            `因人工對帳無法即時更新入帳資訊，若<span style="color: red ;">匯款後三個工作天</span>後仍未更新訂單狀態，敬請聯繫客服<span style="color: red ;"> (請掃網站最下方QR Code加入本公司官方LINE帳號)</span>確認。`,
          ],
          id: 12,
        },
        {
          title:
            'Q13、 除了本次預購套書外，有其他公司登記實務相關書籍可以購買嗎？',
          text: [
            '本公司已著手規劃中，未來將陸續推出公司登記實務進階篇相關書籍，敬請期待！',
          ],
          id: 13,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
