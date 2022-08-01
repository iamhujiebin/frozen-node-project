import { makeAutoObservable } from "mobx"
import { http } from '@/utils'
import { clearToken, getToken, setToken } from "@/utils/token"

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post('/authorizations', {
      mobile,
      code
    })
    this.token = res.data.token
    // 本地存一份
    setToken(this.token)
  }
  logout = () => {
    this.token = ''
    clearToken()
  }
}

export default LoginStore