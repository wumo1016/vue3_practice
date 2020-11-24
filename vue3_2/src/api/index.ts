import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://www.fullstackjavascript.cn:3000'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data.data
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export default axios
