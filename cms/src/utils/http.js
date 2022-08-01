import axios from "axios"
import { getToken } from "./token"

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

// 请求拦截器
// congfig: http的config
http.interceptors.request.use((config) => {
  const token = getToken
  if (token) {
    config.headers.Authorrization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error) // 会throw error，可以被catch到
})

export { http }