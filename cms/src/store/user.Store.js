import { http } from "@/utils"
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
  }
}

export default UserStore