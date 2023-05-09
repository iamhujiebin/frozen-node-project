import {Avatar, Input, List, Skeleton, Space} from "antd";
import {useState} from "react";
import {http} from "@/utils";

const {Search} = Input;

const ChatGPT = () => {
    // list: [{role:"user|assistant",content:"**"}]
    const [list, setList] = useState([])
    const [message, setMessage] = useState('')
    const handleChange = event => {
        setMessage(event.target.value);
    };
    const onFinish = (values) => {
        const newList = [...list, {role: "user", content: values}]
        setList(newList)
        http.post("/chatgpt/process", {
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