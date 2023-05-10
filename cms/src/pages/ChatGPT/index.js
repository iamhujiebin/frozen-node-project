import {Avatar, Input, List, Skeleton, Radio, Button, Space} from "antd";
import {useState, useEffect} from "react";
import {http} from "@/utils";

const {Search} = Input;

const ChatGPT = () => {
    // list: [{role:"user|assistant",content:"**"}]
    const [list, setList] = useState([])
    const [message, setMessage] = useState('')
    const [session, setSession] = useState(0)
    const [sessionList, setSessionList] = useState([0])
    useEffect(() => {
        http.get("chatgpt/session/list").then(r => {
            setSessionList(r.data)
        }).catch(e => alert('fail'))
    }, [])
    useEffect(() => {
        http.get("/chatgpt/session/detail/" + session).then(r => {
            const newList = r.data?.messages ? r.data.messages : []
            setList(newList)
        }).catch(e => alert("fail"))
    }, [session])
    const onAddSession = e => {
        http.post("/chatgpt/session/add").then(r => {
            setSession(r.data)
            setSessionList([...sessionList, r.data])
        }).catch(e => alert('fail'))
    }
    const onDelSession = e => {
        http.delete("/chatgpt/session/del/" + session).then(r => {
            setSession(0)
            setSessionList(sessionList.filter(item => item !== session))
        }).catch(e => alert('fail'))
    }
    const onSessionChange = e => {
        setSession(e.target.value)
    }
    const handleChange = event => {
        setMessage(event.target.value);
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
            alert('fail')
        })
        setMessage('')
    }
    return (
        <>
            <Space>
                <Button type="primary" shape="circle" onClick={onAddSession}>A</Button>
                <Button type="primary" shape="circle" onClick={onDelSession} danger>D</Button>
                <Radio.Group value={session} onChange={onSessionChange}>
                    {
                        sessionList.map(item => (
                            <Radio.Button value={item}>{"Chat" + item}</Radio.Button>
                        ))
                    }
                </Radio.Group>
            </Space>
            <List
                bordered
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        // style={{justifyContent: "flex-end"}}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.role === 'user' ?
                                    'https://randomuser.me/api/portraits/men/20.jpg' : 'https://randomuser.me/api/portraits/women/27.jpg'}/>}
                                title={item.role}
                                description={item.content}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Search
                placeholder="input your question"
                size="large"
                enterButton="Ask Ai"
                value={message}
                onSearch={onFinish}
                onChange={handleChange}
            />
        </>
    )
}

export default ChatGPT