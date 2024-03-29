// 取得元素位置

import $axios from 'axios'

export const getPosition = (element) => {
  let x = 0
  let y = 0
  // 搭配上面的示意圖可比較輕鬆理解為何要這麼計算
  while (element) {
    x += element.offsetLeft - element.scrollLeft + element.clientLeft
    y += element.offsetTop - element.scrollLeft + element.clientTop
    element = element.offsetParent
  }

  return { x, y }
}

// 鎖定scroll
export const lockScroll = () => {
  document.documentElement.style.overflow = 'hidden'
}

// 解開scroll
export const unlockScroll = () => {
  document.documentElement.style.overflow = 'scroll'
}

// 轉換「訂單處理狀態」的編號(轉成對應中文名稱)
// 1-待匯款 、 2-匯款完成，訂單準備中 、 3-已發貨 、 4-未匯款，訂單取消 、 5-訂單取消，退款完成
export const switchOrderStatus = (statusId) => {
  if (statusId === '1') {
    return '待匯款'
  } else if (statusId === '2') {
    return '匯款完成，訂單準備中'
  } else if (statusId === '3') {
    return '已發貨'
  } else if (statusId === '4') {
    return '未匯款，訂單取消'
  } else if (statusId === '5') {
    return '訂單取消，退款完成'
  } else {
    return ''
  }
}

// 轉換「物流運送方式」的編號(轉成對應中文名稱)
//  1-黑貓宅急便 2-嘉里大榮 3-中華郵政
export const switchDeliveryCompany = (companyId) => {
  if (companyId === '1') {
    return '黑貓宅急便'
  } else if (companyId === '2') {
    return '嘉里大榮'
  } else if (companyId === '3') {
    return '中華郵政'
  } else {
    return ''
  }
}

// 將數字加入千分位數
export const NumberComma = (data) => {
  // const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  // eslint-disable-next-line prefer-regex-literals
  const comma = new RegExp('\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))', 'g')
  return data.toString().replace(comma, ',')
}

// 檔案下載
export const downloadFile = (storage, refPath, filename) => {
  const storageRef = storage.ref()
  const fileRef = storageRef.child(refPath)

  fileRef
    .getDownloadURL()
    .then((url) => {
      $axios({
        url,
        method: 'GET',
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')

          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          // 釋放blob物件
          window.URL.revokeObjectURL(url)
        })
        .catch(() => {
          this.openToast('檔案下載', '下載失敗', 'danger')
        })
    })
    .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          // User canceled the upload
          break
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break
      }
    })
}

// 優惠價轉換
export const normalDiscount = (qty, normalDiscountList) => {
  const priceList = normalDiscountList
  const discountList = Object.entries(priceList)
  discountList.sort(function (a, b) {
    return b[1] - a[1]
  })

  let discountPrice
  if (qty < 0) return 0

  for (let i = 0; i < discountList.length; i++) {
    // eslint-disable-next-line no-eval
    if (eval(qty + discountList[i][0])) {
      discountPrice = discountList[i][1]
      break
    }
  }
  return discountPrice
}

// 將string型別的cookie 轉成 object
export const parseCookie = (str) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
