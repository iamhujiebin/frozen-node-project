import {Radio, Button, Space, Divider, Upload, message, Image, Empty, Carousel} from "antd";
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
    const [list, setList] = useState([])
    const [session, setSession] = useState(0)
    const [sessionList, setSessionList] = useState([0])
    useEffect(() => {
        http.get("/album/list").then(r => {
            setSessionList(r.data)
        }).catch(e => message.error("fail").then())
    }, [])
    useEffect(() => {
        http.get("/album/detail/" + session).then(r => {
            const newList = r.data ? r.data : []
            setList(newList)
        }).catch(e => message.error("fail").then())
    }, [session])
    const onAddSession = e => {
        http.post("/album/add").then(r => {
            setSession(r.data)
            setSessionList([...sessionList, r.data])
        }).catch(e => message.error("fail").then())
    }
    const onDelSession = e => {
        http.delete("/album/del/" + session).then(r => {
            setSession(0)
            setSessionList(sessionList.filter(item => item !== session))
        }).catch(e => message.error("fail").then())
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
                console.log(info)
                message.success(`${info.file.name} file uploaded successfully`);
                const newList = [...list, info.file.response.data.url]
                http.post("/album/detail", {
                    "albumId": session,
                    "images": newList,
                }).then(r => {
                    setList(newList)
                }).catch(e => {
                    message.error("fail").then()
                })
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        showUploadList: false,
    }
    const [visible, setVisible] = useState(false);
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
                        sessionList.map((item, index) => (
                            <Radio.Button key={index} value={item}>{"Album" + item}</Radio.Button>
                        ))
                    }
                </Radio.Group>
            </Space>
            <Divider orientation={'left'}></Divider>
            {list.length === 0 && <Empty/>}
            {list.length > 0 &&
                <div style={{marginRight: "auto", marginLeft: "auto"}}>
                    <Image
                        preview={{
                            visible: false,
                        }}
                        width={300}
                        src={list[0]}
                        onClick={() => setVisible(true)}

                    />
                    <div
                        style={{
                            display: 'none',
                        }}
                    >
                        <Image.PreviewGroup
                            preview={{
                                visible,
                                onVisibleChange: (vis) => setVisible(vis),
                            }}
                        >
                            {list.map(item => <Image src={item}/>)}
                        </Image.PreviewGroup>
                    </div>
                </div>
            }
            <Divider/>
            <Carousel
                dotPosition={"top"}
                autoplay
                autoplaySpeed={3000}
                effect={'fade'}
            >
                {
                    list.map((item, index) => (
                        <div key={index}>
                            <img alt={'image' + index} style={contentStyle}
                                 src={item}/>
                        </div>
                    ))
                }
            </Carousel>
        </>
    )
}

export default Album