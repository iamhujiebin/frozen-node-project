import LoginStore from "./login.Store"
import React, { useContext } from "react"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
  }
}

const StoreContext = React.createContext(new RootStore())
export const useStore = () => useContext(StoreContext)