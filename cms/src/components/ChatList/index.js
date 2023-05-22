import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Divider, Empty} from "antd";

const userStyle = {textAlign: "right"}
const assistantStyle = {textAlign: "left"}

const ChatList = ({datalist}) => {
    if (datalist.length > 0) {
        return (
            <div style={{border: "inset"}}>
                {
                    datalist.map(item => {
                        return (
                            <div style={item.role === 'user' ? userStyle : assistantStyle}>
                                <img style={{width: "50px", height: "50px"}}
                                     src={item.role === 'user' ? 'https://randomuser.me/api/portraits/men/20.jpg' : 'https://randomuser.me/api/portraits/women/27.jpg'}
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

export default ChatList