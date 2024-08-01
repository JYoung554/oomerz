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

export const BASE_URL =
  'postgres://jfears:aarons@localhost:5432/oomerz_development/api'
