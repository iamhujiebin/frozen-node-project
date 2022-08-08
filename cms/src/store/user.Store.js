import { http } from "@/utils"
import { setUser } from "@/utils/token"
import { makeAutoObservable } from "mobx"

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }
  userInfo = {}
  async getUserInfo () {
    const res = await http.get('/user/profile')
    console.log('user', res.data)
    this.userInfo = res.data
    setUser(res.data.name)
  }
}

export default UserStore