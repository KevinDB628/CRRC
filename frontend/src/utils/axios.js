console.log(">>> axios.js loaded (enhanced version)")

import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 Axios 实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  }
})

/* --------------------------
    请求拦截器
---------------------------*/
instance.interceptors.request.use(
  (config) => {
    // 给 GET 请求加上时间戳，避免缓存
    if (config.method === 'get') {
      config.params = {
        _t: Date.now(),
        ...config.params,
      }
    }

    // 预留 token 位
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error("【请求错误】", error)
    ElMessage.error("请求发送失败")
    return Promise.reject(error)
  }
)

/* --------------------------
    响应拦截器
---------------------------*/
instance.interceptors.response.use(
  (response) => {
    // 成功仍然返回完整 response，兼容你现在的 res.data 用法
    return response
  },
  (error) => {
    console.error("【响应错误】", error)

    // 网络错误、无响应
    if (!error.response) {
      ElMessage.error("无法连接服务器，请检查后端是否启动")
      return Promise.reject(error)
    }

    const data = error.response.data
    let msg = ''

    // ★ 后端直接返回字符串，比如 "类型名称不能重复！"
    if (typeof data === 'string') {
      msg = data
    }
    // ★ 后端返回 JSON 且有 message 字段
    else if (data && typeof data.message === 'string') {
      msg = data.message
    }
    // ★ 否则兜底用 error.message
    else {
      msg = error.message || '请求失败'
    }

    ElMessage.error(msg)
    return Promise.reject(error)
  }
)


export default instance
