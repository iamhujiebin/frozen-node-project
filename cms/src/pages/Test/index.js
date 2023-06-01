import {useEffect, useState} from "react";
import {getToken} from "@/utils";
import {createWebSocket} from "@/components/WebSocket";
import {PubSub} from 'pubsub-js';

function Test() {
    const [message, setMessage] = useState("todo")
    useEffect(() => {
        //订阅 'message' 发布的发布的消息
        let messageSocket = PubSub.subscribe('message', function (topic, message) {
            //message 为接收到的消息
            setMessage(message)
        })
        //卸载组件 取消订阅
        return () => {
            PubSub.unsubscribe(messageSocket);
        }
    })
    useEffect(() => {
        const access_token = getToken()
        const url = `${process.env.REACT_APP_WS_URL}/${access_token}`
        createWebSocket(url)
    }, [])
    return (<div className='App'>
        <div className='container'>
            {message}
        </div>
    </div>)
}

export default Test