import TodoStore from "./todo.Store"
import React from "react"

class RootStore {
  constructor() {
    this.todoStore = new TodoStore()
  }
}

// 利用react的hook中的context做响应式编程(数据驱动ui)
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)