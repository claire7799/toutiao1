import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 下面的token只能执行一次
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 修改config,追加headers
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, function (error) {
  // 认为返回错误的promise对象
  return Promise.reject(error)
})

export default axios
