import {Avatar, Button, Form, Input, List, Skeleton, Space} from "antd";
import {useState} from "react";
import {http} from "@/utils";

const {TextArea} = Input;

const ChatGPT = () => {
    // list: [{role:"user|assistant",content:"**"}]
    const [list, setList] = useState([])
    const [form] = Form.useForm();
    const onFinish = (values) => {
        form.resetFields()
        const newList = [...list, {role: "user", content: values.content}]
        setList(newList)
        http.post("/chatgpt/process", {
            "messages": newList
        }).then(r => {
            const newList = r.data.messages
            setList(newList)
        }).catch(e => {
            alert('fail')
        })
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
            <Form
                form={form}
                onFinish={onFinish}
                layout={"inline"}
            >
                <Form.Item
                    name={'content'}
                >
                    {/*<Input placeholder={"Ask Ai"}/>*/}
                    <TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>Summit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ChatGPT