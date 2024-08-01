import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const BASE_URL = 'https://oomerz-app-a2149b56e423.herokuapp.com/api'
