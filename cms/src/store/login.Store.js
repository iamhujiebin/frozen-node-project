import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class LoginStore {
  constructor() {
    makeAutoObservable(this)
  }
  token = ''
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post('authorizations', {
      mobile,
      code
    })
    console.log('authorizations res', res)
    this.token = res.data.data.token
  }
}

export default LoginStore