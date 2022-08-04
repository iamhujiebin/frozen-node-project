import { io } from "socket.io-client"
import UserStore from "@/store/user.Store" // 不能直接用useStore,貌似因为useStore用了React的东西,只能组件内使用
import { makeAutoObservable } from "mobx" // 用到info的数据了，所以要响应式

// socketio 命令字
const PublicMsgEvent = 'public-msg'

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
      this.socket = io('http://127.0.0.1:4443')
      this.socket.on('connect', () => {
        console.log('socket id', this.socket.id)
      })
      this.socket.on('login', (msg) => {
        console.log('login', msg)
        this.isLogin = true
      })
      this.socket.emit('login', userStore.userInfo.name)

      this.socket.on(PublicMsgEvent, msg => {
        this.textAreaMsgs = this.textAreaMsgs + msg + '\n'
      })
      this.socket.on('listClients', data => {
        var clients = JSON.parse(data)
        console.log('listClients', clients)
        var menuItems = []
        clients?.forEach((item) => {
          menuItems.push({ 'label': item.name, 'key': item.id })
        })
        this.menuItems = menuItems
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
  publicMsg = (msg) => {
    const data = {
      sender: this.socket?.id,
      msg
    }
    this.socket?.emit(PublicMsgEvent, data)
  }
}

export default SocketIOStore
