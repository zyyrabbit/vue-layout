import http from './index'

export default {
  preview(params: any) {
    return http.post('/temp/preview', params)
  }
}
