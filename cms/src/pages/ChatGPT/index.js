import {Input, Radio, Button, Space, message} from "antd";
import {useState, useEffect} from "react";
import {http} from "@/utils";
import ChatList from "@/components/ChatList";

const {Search} = Input;

const ChatGPT = () => {
    // list: [{role:"user|assistant",content:"**"}]
    const [list, setList] = useState([])
    const [msg, setMsg] = useState('')
    const [session, setSession] = useState(0)
    const [sessionList, setSessionList] = useState([0])
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
            "session_id": session,
            "messages": newList
        }).then(r => {
            const newList = r.data.messages
            setList(newList)
        }).catch(e => {
            message.error("fail").then()
        })
        setMsg('')
    }
    return (
        <>
            <Space>
                <Button type="primary" shape="circle" onClick={onAddSession}>A</Button>
                <Button type="primary" shape="circle" onClick={onDelSession} danger>D</Button>
                <Radio.Group value={session} onChange={onSessionChange}>
                    {
                        sessionList.map((item, index) => (
                            <Radio.Button key={index} value={item}>{"Chat" + item}</Radio.Button>
                        ))
                    }
                </Radio.Group>
            </Space>
            {
                <ChatList datalist={list}/>
            }
            <Search
                placeholder="input your question"
                size="large"
                enterButton="Ask Ai"
                value={msg}
                onSearch={onFinish}
                onChange={handleChange}
            />
        </>
    )
}

export default ChatGPT