import "./index.scss"
import {Divider, Empty, Space} from "antd";
import {useStore} from '@/store'
import chicken from "@/assets/chicken.png"
import man from "@/assets/man.png"
import woman from "@/assets/woman.png"
import chatgpt from "@/assets/chatgpt.jpg"
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';
import {CopyOutlined} from '@ant-design/icons'

const ChatList = ({datalist}) => {
    const {userStore} = useStore()
    const chatBoxRef = useRef(null)
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [datalist]);
    const copyText = (content) => {
        navigator.clipboard.writeText(content);
        alert("文本已复制到剪贴板。");
    }
    if (datalist.length > 0) {
        return (
            <div className={"box"}
                 ref={chatBoxRef}
            >
                {datalist.map((item, index) => {
                    if (item.role === 'user') {
                        return (<div key={index} style={{textAlign: "right"}}>
                            <Space>
                                <Space direction={"vertical"} size={1}>
                                    <Space>
                                        <span>{item.createdTime}</span>
                                    </Space>
                                    <Space>
                                        <MarkdownPreview className={"chat"} source={item.content}/>
                                    </Space>
                                </Space>
                                <img className={"avatar"}
                                     src={userStore.userInfo.gender === 1 ? man : userStore.userInfo.gender === 2 ? woman : chicken}
                                     alt={""}/>
                            </Space>
                            <Divider/>
                        </div>)
                    }
                    // assistant
                    return (
                        <div key={index} style={{textAlign: "left"}}>
                            <Space>
                                <img className={"avatar"}
                                     src={chatgpt}
                                     alt={""}/>
                                <Space direction={"vertical"} size={1}>
                                    <span>{item.createdTime}</span>
                                    <CopyOutlined onClick={() => copyText(item.content)}/>
                                    <MarkdownPreview wrapperElement={{"data-color-mode": "light"}}
                                                     className={"chat"}
                                                     source={item.content}/>
                                </Space>
                            </Space>
                            <Divider/>
                        </div>
                    )
                })}
            </div>)
    }
    return (<Empty className={"box"}/>)
}

export default observer(ChatList) // mobx 的数据监听,userStore中的任何数据变化都会重新渲染