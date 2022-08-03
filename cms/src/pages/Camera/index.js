import { Menu, message, Space, Input, } from "antd"
import { useEffect, useRef, useState, } from "react"
import { history } from '@/utils'
import './index.scss'

const { TextArea, Search } = Input

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
  const mediaStream = useRef(new MediaStream()) // 可以用来做暂存
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
  // 列表数据 todo get from useState
  const items = [
    {
      label: 'self',
      key: 'self',
    },
    {
      label: 'remote1',
      key: 'remote1',
    }
  ]
  // 发送聊天数据
  const chatRef = useRef(null)
  const onChatSend = (value) => {
    chatRef.current.input.value = ''
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
    <Menu className="chat" onClick={onChatClick} selectedKeys={[chatCurrent]} mode="horizontal" items={items}></Menu>
    <TextArea rows={10} readOnly />
    <Search ref={chatRef} placeholder="请输入..." enterButton="发送" size="large" onSearch={onChatSend} allowClear />
  </div >
}

export default Camera