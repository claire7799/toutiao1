import axios from 'axios'
import store from '@/store'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 下面的token只能执行一次
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 修改config,追加headers
    config.headers = {
      Authorization: `Bearer ${store.getUser().token}`
    }
    return config
  },
  function (error) {
    // 认为返回错误的promise对象
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  // 状态码是401  跳转到登录页面
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
