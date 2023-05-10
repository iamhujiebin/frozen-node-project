import axios from "axios"
import {getToken, clearToken, history} from "@/utils"

const http = axios.create({
    // baseURL: 'http://geek.itheima.net/v1_0',
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 100000,
})

// 请求拦截器
// congfig: http的config
http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
    if (response.data.code !== 200) {
        return Promise.reject(response.data.message)
    }
    return response.data
}, (error) => {
    if (error.response.status === 401) {
        console.log('401:', error.response)
        clearToken()
        history.push('/login')
    }
    return Promise.reject(error) // 会throw error，可以被catch到
})

export {http}