import { Menu, message, Space, Input } from "antd"
import { useEffect, useRef, useState, } from "react"
import { observer } from "mobx-react-lite"
import { history } from '@/utils'
import './index.scss'
import { useStore } from "@/store"

const { Search } = Input

// 是否能用麦克风/摄像头
function canGetUserMediaUse () {
  return !!(navigator.mediaDevices.getUserMedia)
}

// 获取media设备
async function getUserMedia (constrains) {
  let promise
  if (navigator.mediaDevices.getUserMedia) {
    message.success('最新标准API')
    promise = await navigator.mediaDevices.getUserMedia(constrains)
  } else if (navigator.webkitGetUserMedia) {
    console.log("webkit内核浏览器")
    //webkit内核浏览器
    promise = await navigator.webkitGetUserMedia(constrains)
  } else if (navigator.mozGetUserMedia) {
    console.log("Firefox浏览器")
    //Firefox浏览器
    promise = await navigator.mozGetUserMedia(constrains)
  } else if (navigator.getUserMedia) {
    console.log("旧版API")
    //旧版API
    promise = await navigator.getUserMedia(constrains)
  }
  return promise
}

const Camera = () => {
  const videoLocalRef = useRef(null)
  const videoRemoteRef = useRef(null)
  const textAreaRef = useRef(null)
  const mediaStream = useRef(new MediaStream()) // ref做暂存mediaStream
  const { socketioStore, webrtcStore } = useStore()
  // 初始化socketio/webrtc
  useEffect(() => {
    if (!canGetUserMediaUse) {
      message.error('不可以用麦克风/摄像头', 2).then(() => history.push('/'))
      return // 记得return,不然后面还会执行
    }
    const promise = getUserMedia({ video: true, audio: { "echoCancellation": false } })
    promise.then(stream => {
      mediaStream.current = stream
      videoLocalRef.current.srcObject = stream
      // 初始化webrtc/socketio
      socketioStore.connect().then(() => {
        socketioStore.setWebrtc(webrtcStore)
        webrtcStore.setSocketIO(socketioStore)
        webrtcStore.setLocalStream(mediaStream.current)
        webrtcStore.setRemoteStreamRef(videoRemoteRef)
      })
    }
    ).catch(err => {
      message.error('get stream fail')
    })
    // 清理函数
    return () => {
      // 清理socket.io
      socketioStore.disconnect()
      // 清理流
      mediaStream?.current?.getTracks()?.forEach(t => {
        t.stop()
      })
      // 清理webrtc
      webrtcStore.clearStates()
    }
  }, [socketioStore, webrtcStore])

  // 发送聊天数据
  const [chatValue, setChatValue] = useState('')
  const onChatSend = (value) => {
    if (!value) {
      message.error('你要选非自己的一个人发送非空白数据')
      return
    }
    // 公屏
    socketioStore.publicMsg(chatValue)
    setChatValue('')
    textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
  }

  const [target, setTarget] = useState('')
  const onReceiverClick = (e) => {
    setTarget(e.key)
    webrtcStore.createOffer(e.key)
  }
  return <div>
    <Space className="video" size='large'>
      <video
        ref={videoLocalRef}
        className="video-local"
        controls autoPlay
        muted
      >
      </video>
      <video
        ref={videoRemoteRef}
        className="video-remote"
        autoPlay>
      </video>
    </Space>
    <Menu
      className="chat"
      onClick={onReceiverClick}
      selectedKeys={[target]}
      mode="horizontal"
      items={socketioStore.menuItems}>
    </Menu>
    <textarea
      ref={textAreaRef}
      style={{ width: '100%' }}
      rows={10}
      value={socketioStore.textAreaMsgs} readOnly
    />
    <Search
      value={chatValue}
      onChange={(e) => setChatValue(e.target.value)}
      placeholder="请输入..."
      enterButton="发送"
      size="large"
      onSearch={(value) => onChatSend(value)} allowClear
    />
  </div >
}

export default observer(Camera)