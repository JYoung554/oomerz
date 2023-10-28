import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return token
  },
  (error) => {
    Promise.reject(error)
  }
)

export const BASE_URL = 'http://localhost:3001'