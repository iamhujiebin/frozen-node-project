import LoginStore from "./login.Store"
import React, { useContext } from "react"
import UserStore from "./user.Store"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
  }
}

const StoreContext = React.createContext(new RootStore())
export const useStore = () => useContext(StoreContext)