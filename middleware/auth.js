export default function (context) {
  if (process.server) {
    if (!context.req.headers.cookie) {
      if (context.route.name === 'cart') {
        return context.redirect('/order')
      } else {
        return context.redirect('/')
      }
    }
    if (context.req.headers.cookie.includes('id_token=') === -1) {
      if (context.route.name === 'cart') {
        return context.redirect('/order')
      } else {
        return context.redirect('/')
      }
    }
    if (
      context.route.name === 'admin-search' ||
      context.route.name === 'admin-search-detail-orderId'
    ) {
      const isAdministrator =
        context.app.$cookies.get('isAdministrator') === 'true' || true
      if (!isAdministrator) {
        return context.redirect('/')
      }
    }
  }
  if (!context.store.state.isUserLoggedIn) {
    if (context.route.name === 'cart') {
      return context.redirect('/order')
    } else {
      return context.redirect('/')
    }
  }
}
