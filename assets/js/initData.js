export const initOrderInfo = () => {
  return {
    buyer: '',
    receiver: {
      name: '',
      address: '',
    },
    email: '',
    phone: '',
    taxId: '',
    bankAccountNo: '',
    orderId: '',
    orderList: [
      {
        productId: '',
        productName: '',
        qty: null,
        unitPrice: null,
        promote: null,
        discountList: null,
        totalPrice: null,
      },
    ],
    totalPrice: null,
    // mainOrderQty: null,
    oderDate: '',
    status: '',
    isClosed: '',
    delivery: {
      company: '',
      trackingNo: '',
      trackingUrl: '',
    },
    remark: '',
    buyerRemark: '',
    isFromGroup: false,
    files: [],
    deliveryList: [],
  }
}
