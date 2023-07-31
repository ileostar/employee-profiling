// import router from '@/router';
// import { useUsersStore } from '@/stores/users';
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// import { ElMessage } from 'element-plus';
// import { storeToRefs } from 'pinia';

const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URI,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Credentials':'true',
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error: unknown) {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // if(response.data.errmsg === 'token error'){
  //   const usersStore = useUsersStore()
  //   usersStore.clearAllCookie()
  //   ElMessage.error('auth error');
  //   setTimeout(()=>{
  //     window.location.replace('/login');
  //   }, 1000)
  // } else if(response.data.errmsg === 'error'){
  //   router.push('/500');
  // }
  return response;
}, function (error: unknown) {
  return Promise.reject(error);
});

interface Data {
  [index: string]: unknown
}

interface Http {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
  get(url, data, config){
    return instance.get(url, {
      params: data,
      ...config
    })
  },
  post(url, data, config){
    return instance.post(url, data, config)
  },
  put(url, data, config){
    return instance.put(url, data, config)
  },
  patch(url, data, config){
    return instance.patch(url, data, config)
  },
  delete(url, data, config){
    return instance.delete(url, {
      data,
      ...config
    })
  }
}

export default http;
