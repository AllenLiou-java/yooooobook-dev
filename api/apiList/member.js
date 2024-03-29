import API from '~/api/api.config'

export default (axios) => ({
  getMemberInfo(data) {
    return axios({
      method: API.getMemberInfo.method,
      url:
        API.getMemberInfo.url.replace(':user_id.json', data.localId + '.json') +
        '?auth=' +
        data.idToken,
    })
  },
  patchMemberInfo(localId, idToken, data) {
    return axios({
      method: API.patchMemberInfo.method,
      url:
        API.patchMemberInfo.url.replace(':user_id.json', localId + '.json') +
        '?auth=' +
        idToken,
      data,
    })
  },
  getAuthList(idToken) {
    return axios({
      method: API.auth.getAuthList.method,
      url: API.auth.getAuthList.url + '?auth=' + idToken,
    })
  },
})
