/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '../router'
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 响应成功2xx
  return response
}, async function (error) {
  // Do something with request error
  // 响应失败
  const status = error.response.status
  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token失效
    const { user } = store.state
    if (!user || !user.token) {
      return redirectLogin()
    }
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUser', user)
    } catch (err) {
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务器错误
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.replace('/login')
}
export default request
