import { io } from "socket.io-client"
import UserStore from "@/store/user.Store" // 不能直接用useStore,貌似因为useStore用了React的东西,只能组件内使用
import { makeAutoObservable } from "mobx" // 用到info的数据了，所以要响应式

// socketio 命令字
const PublicMsgEvent = 'public-msg'

class SocketIOStore {
  name = ''
  menuItems = []
  textAreaMsgs = ''
  constructor() {
    makeAutoObservable(this)
  }
  connect = () => {
    const userStore = new UserStore()
    userStore.getUserInfo().then(() => {
      if (this.socket) {
        console.log('new socket before')
        return
      }
      // 在promise返回拿到name再连socket.io
      this.name = userStore.userInfo.name
      this.socket = io('http://127.0.0.1:4443')
      this.socket.on('connect', () => {
        console.log('socket id', this.socket.id)
      })
      this.socket.on('login', (msg) => {
        this.isLogin = true
      })
      this.socket.emit('login', userStore.userInfo.name)

      this.socket.on(PublicMsgEvent, msg => {
        this.textAreaMsgs = this.textAreaMsgs + msg + '\n'
      })
      this.socket.on('listClients', data => {
        var clients = JSON.parse(data)
        var menuItems = []
        clients?.forEach((item) => {
          menuItems.push({ 'label': item.name, 'key': item.id })
        })
        this.menuItems = menuItems
        this.webrtcStore?.clearStates() // 暂时简化成成员变化就清理
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
  publicMsg = (msg) => {
    const data = {
      sender: this.socket?.id,
      msg
    }
    this.socket?.emit(PublicMsgEvent, data)
  }
  emit = (event, data) => {
    this.socket?.emit(event, data)
  }
  get socketId () {
    return this.socket?.id
  }
  setWebrtc (webrtcStore) {
    this.webrtcStore = webrtcStore
  }
}

export default SocketIOStore
