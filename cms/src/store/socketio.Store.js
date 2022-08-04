import { io } from "socket.io-client"
import UserStore from "@/store/user.Store" // 不能直接用useStore,貌似因为useStore用了React的东西,只能组件内使用
import { makeAutoObservable } from "mobx" // 用到info的数据了，所以要响应式

class SocketIOStore {
  name = ''
  menuItems = []
  textAreaMsgs = ''
  info = {
    socket: null,
    isLogin: false,
  }
  constructor() {
    makeAutoObservable(this)
  }
  connect = () => {
    const userStore = new UserStore()
    userStore.getUserInfo().then(() => {

      // 在promise返回拿到name再连socket.io
      this.name = userStore.userInfo.name
      this.menuItems = [{ 'label': this.name, 'key': 'self' }]
      this.socket = io('http://127.0.0.1:4443')
      this.socket.on('connect', () => {
        console.log('socket id', this.socket.id)
      })
      this.socket.on('login', (msg) => {
        console.log('login', msg)
        this.isLogin = true
      })
      this.socket.emit('login', userStore.userInfo.name)

      this.socket.on('msg', msg => {
        this.textAreaMsgs = this.textAreaMsgs + msg + '\n'
      })

    }).catch(e => {
      console.error('get user fail', e)
      return
    })
  }
  disconnect = () => {
    this.isLogin = false
    this.socket?.close()
    this.socket = null
    this.name = ''
  }
  get socketInfo () {
    return this.info
  }
  sendMsg = (msg) => {
    this.socket?.emit('msg', msg)
  }
}

export default SocketIOStore
