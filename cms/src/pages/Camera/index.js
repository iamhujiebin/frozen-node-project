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
  const { socketioStore } = useStore()
  const videoLocalRef = useRef(null)
  const videoRemoteRef = useRef(null)
  const textAreaRef = useRef(null)
  const mediaStream = useRef(new MediaStream()) // 可以用来做暂存
  useEffect(() => {
    socketioStore.connect()
  }, [socketioStore])
  // 获取音视频
  useEffect(() => {
    if (!canGetUserMediaUse) {
      message.error('不可以用麦克风/摄像头', 2).then(() => history.push('/'))
      return // 记得return,不然后面还会执行
    }
    const promise = getUserMedia({ video: true, audio: false })
    promise.then(stream => {
      mediaStream.current = stream
      videoLocalRef.current.srcObject = stream
    }
    ).catch(err => {
      message.error('get stream fail')
    })
    return () => {
      // 清理函数
      // ?语法可以先保证不会null
      mediaStream?.current?.getTracks()?.forEach(t => {
        t.stop()
      })
    }
  }, [])
  // 聊天状态
  const [chatCurrent, setChatCurrent] = useState('self')
  const onChatClick = (e) => {
    console.log('click ', e)
    setChatCurrent(e.key)
  }
  // 发送聊天数据
  const [chatValue, setChatValue] = useState('')
  const onChatSend = (value) => {
    console.log('value', value)
    if (!value) {
      return
    }
    socketioStore.sendMsg(chatValue)
    setChatValue('')
    textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
  }
  return <div>
    <Space className="video" size='large'>
      <video
        ref={videoLocalRef}
        className="video-local"
        controls autoPlay>
      </video>
      <video
        ref={videoRemoteRef}
        className="video-remote"
        controls autoPlay>
      </video>
    </Space>
    <Menu
      className="chat"
      onClick={onChatClick}
      selectedKeys={[chatCurrent]}
      mode="horizontal"
      items={socketioStore.menuItems}>
    </Menu>
    <textarea
      ref={textAreaRef}
      style={{ width: '100%' }}
      rows={10}
      value={socketioStore.textAreaMsgs} readOnly
    />
    <Search value={chatValue} onChange={(e) => setChatValue(e.target.value)} placeholder="请输入..." enterButton="发送" size="large" onSearch={(value) => onChatSend(value)} allowClear />
  </div >
}

export default observer(Camera)