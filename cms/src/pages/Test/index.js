import {useEffect, useState} from "react";
import {getToken} from "@/utils";
import {createWebSocket} from "@/components/WebSocket";
import {PubSub} from 'pubsub-js';
import ReactPlayer from "react-player";
import music from "@/assets/1.mp3"

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
    const handleReady = () => {
        console.log("视频准备就绪");
    };

    const handleStart = () => {
        console.log("视频开始播放");
    };

    const handlePause = () => {
        console.log("视频暂停");
    };

    const handleEnded = () => {
        console.log("视频播放结束");
    };
    return (<div className='App'>
        <div className='container'>
            {message}
            <div>
                <ReactPlayer
                    // url="https://www.youtube.com/watch?v=dM_zrOuN1FY"
                    url="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4"
                    playing={true}
                    loop={true}
                    controls={true}
                    volume={0.5}
                    onReady={handleReady}
                    onStart={handleStart}
                    onPause={handlePause}
                    onEnded={handleEnded}
                />
            </div>
            <div>
                <ReactPlayer
                    url={music}
                    playing={true}
                    loop={true}
                    controls={true}
                    volume={0.5}
                    onReady={handleReady}
                    onStart={handleStart}
                    onPause={handlePause}
                    onEnded={handleEnded}
                />
            </div>
        </div>
    </div>)
}

export default Test