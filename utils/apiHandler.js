const statusDocument = {
  statusList: [
    {
      code: 400,
      error: 'EMAIL_NOT_FOUND',
      errorCH: 'Email 不存在',
    },
    {
      code: 400,
      error: 'EMAIL_EXISTS',
      errorCH: 'Email 已存在',
    },
    {
      code: 400,
      error: 'INVALID_EMAIL',
      errorCH: 'Email 格式錯誤',
    },
    {
      code: 400,
      error: 'INVALID_PASSWORD',
      errorCH: '密碼錯誤',
    },
    {
      code: 400,
      error: 'WEAK_PASSWORD : Password should be at least 6 characters',
      errorCH: '設定的密碼至少要6位數',
    },
    {
      code: 400,
      error: 'TOO_MANY_ATTEMPTS_TRY_LATER',
      errorCH: '已發送太多次請求，請稍後再提出請求',
    },
    {
      code: 401,
      error: 'Permission denied',
      errorCH: '權限不足',
    },
  ],
  matchErrorMsg(statusCode, statusError) {
    const statusMatched = statusDocument.statusList.filter((status) => {
      return status.code === statusCode && status.error === statusError.message
    })

    if (statusMatched.length > 0) {
      return statusMatched[0].errorCH
    } else {
      return statusError.message
    }
  },
}

export default statusDocument
