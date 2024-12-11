import axios from 'axios'
import { useContext } from 'react'
// import { DashboardContext } from '@/context/Dashboard.context'
import { useLocation, useNavigate } from 'react-router-dom'

export default function useApi() {
  // ! dashboard context
  // const { setUserData } = useContext(DashboardContext)

  // ! location
  const location = useLocation()

  // ! navigate
  const navigate = useNavigate()

  // ! basic config
  const baseURL = import.meta.env.DEV
    ? import.meta.env.VITE_APP_LOCAL_URL
    : import.meta.env.VITE_APP_LIVE_URL
  const apiRequest = axios.create({
    baseURL,
    withCredentials: true,
  })

  // ! this interceptor will generate new access token if the current one is expired
  apiRequest.interceptors.response.use(
    (res) => res,
    async (error) => {
      let originalRequest = error.config
      if (error?.response?.status === 401) {
        const { data, config } = await axios.get(
          `${baseURL}/auth/generateToken`,
          { withCredentials: true }
        )
        if (!data?.owner) {
          return navigate('/auth/login', {
            state: { from: location.pathname },
          })
        }
        // setUserData && setUserData(data?.owner)

        return apiRequest(originalRequest)
      }
      return Promise.reject(error)
    }
  )

  return apiRequest
}
