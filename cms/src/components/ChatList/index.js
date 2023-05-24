import "./index.scss"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Divider, Empty} from "antd";
import {useStore} from '@/store'

import chicken from "@/assets/chicken.png"
import man from "@/assets/man.png"
import woman from "@/assets/woman.png"
import chatgpt from "@/assets/chatgpt.jpg"
import {observer} from "mobx-react-lite";

const userStyle = {textAlign: "right"}
const assistantStyle = {textAlign: "left"}

const ChatList = ({datalist}) => {
    const {userStore} = useStore()
    if (datalist.length > 0) {
        return (
            <div style={{border: "inset"}}>
                {
                    datalist.map((item, index) => {
                        return (
                            <div key={index} style={item.role === 'user' ? userStyle : assistantStyle}>
                                {/*<img style={{width: "50px", height: "50px"}}*/}
                                <img className={"avatar"}
                                     src={item.role === 'user' ?
                                         userStore.userInfo.gender === 1 ? man : userStore.userInfo.gender === 2 ? woman : chicken
                                         : chatgpt}
                                     alt={""}/>
                                <span>{item.createdTime}</span>
                                <ReactMarkdown children={item.content} remarkPlugins={[remarkGfm]}/>
                                <Divider/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <Empty/>
    )
}

export default observer(ChatList) // mobx 的数据监听,userStore中的任何数据变化都会重新渲染