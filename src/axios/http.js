import Axios from 'axios'

Axios.defaults.timeout = 60 * 1000;
Axios.defaults.withCredentials = true
Axios.defaults.Samesite = 'Strict'

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

Axios.interceptors.response.use(response => {
  if (response.data && response.data.status === 200) {
    return response.data.data
  } else {
    return Promise.reject(response.data ? response.data.errorinfo : '')
  }
})

export default Axios
