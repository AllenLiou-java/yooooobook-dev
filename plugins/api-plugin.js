import apis from '@/api/index'
export default (ctx, inject) => {
  const apiObject = {}
  for (const i in apis) {
    apiObject[i] = apis[i](ctx.$axios)
  }

  inject('api', apiObject)
}
