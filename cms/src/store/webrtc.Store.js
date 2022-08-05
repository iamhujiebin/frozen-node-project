import SocketIOStore from '@/store/socketio.Store'
// const { makeAutoObservable } = require("mobx")

// stun服务器配置
const Config = {
  PC_INIT_CONFIG: {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }
    ]
  }
}

// socket io 事件
const SocketEvents = {
  OFFER: "offer",
  ANSWER: "answer",
  OFFER_ICE: "offerIce",
  ANSWER_ICE: "answerIce",
}

class WebrtcStore {
  socketio = new SocketIOStore()
  localStream = new MediaStream()
  remoteStream = new MediaStream()
  offerPc = null
  answerPc = null
  // constructor() {
  // makeAutoObservable(this)
  // }
  // 设置socketio
  setSocketIO (socketio) {
    this.socketio = socketio
    // socketIO处收到Offer/Answer/ice
    this.socketio?.socket?.on(SocketEvents.OFFER, data => {
      this.receiveOffer(data)
    })
    this.socketio?.socket?.on(SocketEvents.ANSWER, data => {
      this.receiveAnswer(data)
    })
    this.socketio?.socket?.on(SocketEvents.OFFER_ICE, data => {
      this.receiveOfferIce(data)
    })
    this.socketio?.socket?.on(SocketEvents.ANSWER_ICE, data => {
      this.receiveAnswerIce(data)
    })
  }
  // 设置localStream
  setLocalStream (stream) {
    this.localStream = stream
  }
  // 设置remoteStreamRef
  setRemoteStreamRef (ref) {
    this.remoteStreamRef = ref
  }
  // 创建webrtc offer
  async createOffer (receiver) {
    if (this.offerPc) {
      console.log('create offer before')
      return
    }
    let offerPc = new RTCPeerConnection(Config.PC_INIT_CONFIG)
    offerPc.onicecandidate = e => {
      if (e.candidate) {
        this.socketio.emit(SocketEvents.OFFER_ICE,
          { sender: this.socketio.socketId, receiver: receiver, ice: e.candidate }
        )
      }
    }
    // 接收对方的流
    offerPc.ontrack = e => {
      this.remoteStream.addTrack(e.track)
      this.remoteStreamRef.current.srcObject = this.remoteStream
    }
    // 推送自己的流
    this.localStream.getTracks().forEach(t => {
      offerPc.addTrack(t)
    })
    // 创建dataChannel (p2p的消息通道)
    let dc = offerPc.createDataChannel('MessageChannel')
    dc.onopen = e => {
      dc.send('Hello from RTC')
    }
    // 创建offer
    let offer = await offerPc.createOffer() // get from stun server
    this.socketio.emit(SocketEvents.OFFER,
      { sender: this.socketio.socketId, receiver: receiver, offer: offer }
    )
    await offerPc.setLocalDescription(new RTCSessionDescription(offer))

    // 赋值
    this.offerPc = offerPc
  }

  // 收到webrtc offer
  async receiveOffer (data) {
    console.log('recevier offer', data)
    let answerPc = new RTCPeerConnection(Config.PC_INIT_CONFIG)
    console.log('answer pc', answerPc)
    // 推送自己的流
    this.localStream.getTracks().forEach(t => {
      answerPc.addTrack(t)
    })
    // 获取对方的流
    answerPc.ontrack = e => {
      this.remoteStream.addTrack(e.track)
      this.remoteStreamRef.current.srcObject = this.remoteStream
    }
    // ice
    answerPc.onicecandidate = e => {
      if (e.candidate) {
        this.socketio.emit(SocketEvents.ANSWER_ICE,
          { sender: this.socketio.socketId, receiver: data.sender, ice: e.candidate }
        )
      }
    }
    // data channel
    answerPc.ondatachannel = e => {
      let dc = e.channel
      dc.onmessage = ev => {
        console.log('msg from dc', ev)
      }
    }
    // 设置SDP
    await answerPc.setRemoteDescription(new RTCSessionDescription(data.offer))
    let answer = await answerPc.createAnswer() // get from stun server
    this.socketio.emit(SocketEvents.ANSWER,
      { sender: this.socketio.socketId, receiver: data.sender, answer: answer }
    )
    await answerPc.setLocalDescription(new RTCSessionDescription(answer))
    this.answerPc = answerPc
  }

  // 收到webrtc answer！ 建立连接咯！
  async receiveAnswer (data) {
    if (this.answer) {
      console.log('receiver answer before')
      return
    }
    this.answer = data.answer
    this.offerPc.setRemoteDescription(new RTCSessionDescription(data.answer))
  }

  // offerIce
  async receiveOfferIce (data) {
    await this.answerPc?.addIceCandidate(new RTCIceCandidate(data.ice))
  }

  // answerIce
  async receiveAnswerIce (data) {
    await this.offerPc?.addIceCandidate(new RTCIceCandidate(data.ice))
  }
  clearStates () {
    this.remoteStream?.getTracks().forEach(t => {
      t.stop()
    })
    // this.remoteStreamRef.current.srcObject = ''
    this.answer = ''
    this.offerPc = null
  }
}

export default WebrtcStore