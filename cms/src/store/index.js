import LoginStore from "./login.Store"
import React, { useContext } from "react"
import UserStore from "./user.Store"
import ChannelStore from "./channel.Store"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}

const StoreContext = React.createContext(new RootStore())
export const useStore = () => useContext(StoreContext)