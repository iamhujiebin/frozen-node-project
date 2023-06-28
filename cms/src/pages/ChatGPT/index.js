import {Input, Radio, Button, Space, message} from "antd";
import {useState, useEffect} from "react";
import {getToken, http} from "@/utils";
import ChatList from "@/components/ChatList";
import {PubSub} from "pubsub-js";
import {createWebSocket, closeWebSocket} from "@/components/WebSocket";

const {Search} = Input;

const ChatGPT = () => {
    // list: [{role:"user|assistant",content:"**"}]
    const [list, setList] = useState([])
    const [msg, setMsg] = useState('')
    const [session, setSession] = useState(0)
    const [sessionList, setSessionList] = useState([0])
    // todo ws的功能需要后端wss支持,暂时不加
    // useEffect(() => {
    //     // 创建websocket
    //     const access_token = getToken()
    //     const url = `${process.env.REACT_APP_WS_URL}/${access_token}`
    //     createWebSocket(url)
    //     return () => {
    //         //卸载组件
    //         closeWebSocket()
    //     }
    // }, [])
    // let messageSocket = null
    // useEffect(() => {
    //     // console.log("listening to message")
    //     //订阅 'message' 发布的发布的消息
    //     if (!messageSocket) {
    //         messageSocket = PubSub.subscribe('message', function (topic, message) {
    //             //message 为接收到的消息
    //             // 重新加载消息列表
    //             if (message === "NEW_MSG") {
    //                 http.get("/chatgpt/session/detail/" + session).then(r => {
    //                     const newList = r.data?.messages ? r.data.messages : []
    //                     setList(newList)
    //                 }).catch(e => message.error("fail").then())
    //             }
    //             if (message === "NEW_SESSION") {
    //                 http.get("chatgpt/session/list").then(r => {
    //                     setSessionList(r.data)
    //                 }).catch(e => message.error("fail").then())
    //             }
    //         })
    //     }
    //     //卸载组件 取消订阅
    //     return () => {
    //         PubSub.unsubscribe(messageSocket);
    //     }
    // })
    useEffect(() => {
        document.body.style.overflow = "hidden" // 防止移动端下拉刷新。进入页面时给body添加行类样式 overflow:hidden
        return () => {
            document.body.style.overflow = "visible" //离开页面时给body还原 overflow 为默认值
        }
    }, [])
    useEffect(() => {
        http.get("chatgpt/session/list").then(r => {
            setSessionList(r.data)
        }).catch(e => message.error("fail").then())
    }, [])
    useEffect(() => {
        http.get("/chatgpt/session/detail/" + session).then(r => {
            const newList = r.data?.messages ? r.data.messages : []
            setList(newList)
        }).catch(e => message.error("fail").then())
    }, [session])
    const onAddSession = e => {
        http.post("/chatgpt/session/add").then(r => {
            setSession(r.data)
            setSessionList([...sessionList, r.data])
        }).catch(e => message.error("fail").then())
    }
    const onDelSession = e => {
        http.delete("/chatgpt/session/del/" + session).then(r => {
            const newSessionList = sessionList.filter(item => item !== session)
            setSessionList(newSessionList)
            if (newSessionList.length > 0) {
                setSession(newSessionList[newSessionList.length - 1])
            } else {
                setSession(0)
                setSessionList([0])
            }
        }).catch(e => message.error("fail").then())
    }
    const onSessionChange = e => {
        setSession(e.target.value)
    }
    const handleChange = event => {
        setMsg(event.target.value);
    };
    const onFinish = (values) => {
        const newList = [...list, {role: "user", content: values}]
        setList(newList)
        http.post("/chatgpt/process", {
            "session_id": session, "messages": newList
        }).then(r => {
            const newList = r.data.messages
            setList(newList)
        }).catch(e => {
            message.error("fail").then()
        })
        setMsg('')
    }
    return (<>
        <Space>
            <Button type="primary" shape="circle" onClick={onAddSession}>A</Button>
            <Button type="primary" shape="circle" onClick={onDelSession} danger>D</Button>
            <Radio.Group value={session} onChange={onSessionChange}>
                {sessionList.map((item, index) => (
                    <Radio.Button key={index} value={item}>{"Chat" + item}</Radio.Button>))}
            </Radio.Group>
        </Space>
        {<ChatList datalist={list}/>}
        <Search
            placeholder="input your question"
            size="large"
            enterButton="Ask Ai"
            value={msg}
            onSearch={onFinish}
            onChange={handleChange}
        />
    </>)
}

export default ChatGPT