import {useEffect, useRef, useState} from "react";
import Vap from 'video-animation-player'
import config from './demo.json'
import demo from './demo.mp4'
import config2 from './vapc.json'
import demo2 from './video.mp4'
import man from "@/assets/man.png"
import woman from "@/assets/woman.png"


function Test() {
    let vapPlayer = useRef(null);
    let vapPlayer2 = useRef(null);
    const [name,setName] = useState("皇马嗯")

    useEffect(() => {
        vapPlayer.current = new Vap().play(Object.assign({}, {
            container: vapPlayer.current,
            // 素材视频链接
            src: demo,
            // 素材配置json对象
            config: config,
            // width: 900,
            // height: 400,
            // 同素材生成工具中配置的保持一致
            // fps: 20,
            // 是否循环
            loop: true,
            // 起始播放时间点
            beginPoint: 0,
            // 精准模式
            accurate: true
            // 播放起始时间点(秒)
        }, {
            // 融合信息（图片/文字）,同素材生成工具生成的配置文件中的srcTag所对应，比如[imgUser] => imgUser
            imgUser: man,
            imgAnchor: woman,
            textUser: 'jiebin',
            textAnchor: 'mengyin',
            type: 2
        }))
        vapPlayer2.current = new Vap().play(Object.assign({}, {
            container: vapPlayer2.current,
            // 素材视频链接
            src: demo2,
            // 素材配置json对象
            config: config2,
            // width: 900,
            // height: 400,
            // 同素材生成工具中配置的保持一致
            // fps: 20,
            // 是否循环
            loop: true,
            // 起始播放时间点
            beginPoint: 0,
            // 精准模式
            accurate: true
            // 播放起始时间点(秒)
        }, {
            // 融合信息（图片/文字）,同素材生成工具生成的配置文件中的srcTag所对应，比如[imgUser] => imgUser
            name: name,
        }))
    }, [name]);
    return (
        <>
            <div ref={vapPlayer}/>
            <div ref={vapPlayer2}/>
            <p>{name}</p>
        </>
    )
}

export default Test