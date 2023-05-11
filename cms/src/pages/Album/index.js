import {Radio, Button, Space, Carousel, Divider, Upload, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import {useState, useEffect} from "react";
import {http} from "@/utils";

const contentStyle = {
    height: '640px',
    lineHeight: '640px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    marginLeft: "auto",
    marginRight: "auto",
};

const Album = () => {
    const [session, setSession] = useState(0)
    const [sessionList, setSessionList] = useState([0])
    useEffect(() => {
        // http.get("/album/list").then(r => {
        //     setSessionList(r.data)
        // }).catch(e => alert('fail'))
    }, [])
    const onAddSession = e => {
        http.post("/album/add").then(r => {
            setSession(r.data)
            setSessionList([...sessionList, r.data])
        }).catch(e => alert('fail'))
    }
    const onDelSession = e => {
        http.delete("/album/del/" + session).then(r => {
            setSession(0)
            setSessionList(sessionList.filter(item => item !== session))
        }).catch(e => alert('fail'))
    }
    const onSessionChange = e => {
        setSession(e.target.value)
    }
    const props = {
        name: 'file',
        action: process.env.REACT_APP_UPLOAD_URL,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        showUploadList: false,
    }
    return (
        <>
            <Space direction={"vertical"}>
                <Space>
                    <Button type="primary" onClick={onAddSession}>新建相册</Button>
                    <Button type="primary" onClick={onDelSession} danger>删除相册</Button>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                </Space>
                <Radio.Group value={session} onChange={onSessionChange}>
                    {
                        sessionList.map(item => (
                            <Radio.Button value={item}>{"Album" + item}</Radio.Button>
                        ))
                    }
                </Radio.Group>
            </Space>
            <Divider orientation={'left'}></Divider>
            <Carousel
                dotPosition={"top"}
                autoplay
                autoplaySpeed={3000}
                effect={'fade'}
            >
                <div>
                    <img alt={'image1'} style={contentStyle}
                         src={'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'}/>
                </div>
                <div>
                    <img alt={'image2'} style={contentStyle}
                         src={'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'}/>
                </div>
                <div>
                    <img alt={'image3'} style={contentStyle}
                         src={'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'}/>
                </div>
            </Carousel>
        </>
    )
}

export default Album