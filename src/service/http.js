import Axios from 'axios'

Axios.defaults.timeout = 60 * 1000 // 接口设置超时一分钟
Axios.defaults.withCredentials = true

Axios.interceptors.request.use(config => {
  config.headers['origin-type'] = 'WEB'

  if (config.method.toLocaleLowerCase() === 'get' || config.method.toLocaleLowerCase() === 'GET') {
    if (!config.params) {
      config.params = {}
    }
    config.params.t = new Date().getTime()
  }

  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(resp => {
  let obj = resp.data

  if (obj && obj.status && obj.data) {
    return obj.data
  }

  return Promise.reject(obj ? obj.errorinfo : '')
})

export default Axios
