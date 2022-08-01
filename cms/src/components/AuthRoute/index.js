import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

const AuthRoute = ({ children }) => {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    console.log('auth fail,navigate to login')
    return <Navigate to='/login' replace />
  }
}

export { AuthRoute }