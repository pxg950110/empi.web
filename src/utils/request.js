/**
 * @author pxg
 * @emil pxg950110@163.com
 * @date 2020/3/11
 * @version v1.0
 * @description
 *   调用接口
 */
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
// import {MessageBox, Message} from 'element-ui'
// import store from '../store/store'
/// common/serviceurl
const service = axios.create({
  baseURL: 'http://127.0.0.1:9000',
  timeout: 100000 // 设置超时时间
})
service.interceptors.request.use(
  config => {
    config.headers['authorToken'] = localStorage.getItem('authorToken')
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    // 错误
    JSON.stringify()
    console.error(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(response => {
  const res = response.data
  return res
},
error => {
  console.error('err' + error)
  // Message({
  //   message: error.message || 'ERROR',
  //   type: 'error',
  //   duration: 5 * 1000
  // })
  return Promise.reject(error)
})
export default service
