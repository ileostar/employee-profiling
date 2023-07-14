import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use((config: any) => {
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default {
  login: (params: any) => {
    return axios.post('/api/users/login', params)
  }
}
