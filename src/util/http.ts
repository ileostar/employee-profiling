import { ElLoading } from 'element-plus';
import { usePage } from '@/stores/usePage';
import axios from 'axios'
import type { CreateAxiosDefaults,AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { storeToRefs } from "pinia";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
});

type AxiosRequestType = AxiosRequestConfig & {
  loading?: boolean; // 加载页面loading
};

// 显示loading
let loadingInstance: any = null;
let loadingTimer: number = 0;
const showLoading = (target: string = 'body') => {
  // 加一个延迟，若加载时间小于100ms，则显示loading，算是一个小优化，也可以不要延迟
  loadingTimer = window.setTimeout(() => {
      if (loadingTimer && !loadingInstance) {
          loadingInstance = ElLoading.service({
              target,
              background: '#ccc',
          });
      }
  }, 100);
};
// 关闭loading
const closeLoading = () => {
  loadingTimer && window.clearTimeout(loadingTimer);
  loadingTimer = 0;
  loadingInstance && loadingInstance.close();
  loadingInstance = null;
};

// 请求拦截器
instance.interceptors.request.use(function (config) {
  const { pageData, updatePageData } = usePage();
    const { requestingObj, route } = pageData;
    // 判断如果是需要loading的请求，则在requestingObj中添加此数据
    if (config.loading) {
        const key = config.method + (config.url || ''); // 这里的key命名方式可能不太严谨，有可能不唯一，但是为了后边为了方便删除此项，所以暂且先如此命令
        requestingObj[key] = true;
        updatePageData({ requestingObj });
    }
    // 如果有需要loading的请求，则loading
    if (JSON.stringify(requestingObj) !== '{}') {
        showLoading(route.meta.loadingContainerDom);
    }

    return config;
}, function (error) {
  return Promise.reject(error);
}


// 响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
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
