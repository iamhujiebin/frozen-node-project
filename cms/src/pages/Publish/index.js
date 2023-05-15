import {Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Space, Upload} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import {useStore} from '@/store'
import {useEffect, useRef, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {http, history} from '@/utils'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import quillEmoji from 'quill-emoji'
import "quill-emoji/dist/quill-emoji.css" //这个不引入的话会出现emoji框一直在输入框下面的情况
import {ImageDrop} from 'quill-image-drop-module' //讲图片拖进文本框，可以直接安装quill-image-drop-module；但由于我的webpack版本过低，无法兼容es6，所以把插件拿出来了
//注册ToolbarEmoji，将在工具栏出现emoji；注册TextAreaEmoji，将在文本输入框处出现emoji。VideoBlot是我自定义的视频组件，后面会讲，
const {EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji} = quillEmoji
Quill.register({
    'formats/emoji': EmojiBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji,
    // 'modules/ImageExtend': ImageExtend, //拖拽图片扩展组件
    'modules/ImageDrop': ImageDrop, //复制粘贴组件
}, true)

const {Option} = Select

const quillModules = {
    toolbar: {
        container: [
            [{'size': ['small', false, 'large', 'huge']}], //字体设置
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //标题字号，不能设置单个字大小
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'], // a链接和图片的显示
            [{'align': []}],
            ['clean'], //清空
            ['emoji'], //emoji表情，设置了才能显示
            ['code-block'], // 代码块
        ],
    },
    // ImageExtend: {
    //   loading: true,
    //   name: 'img',
    //   action: RES_URL + "connector?isRelativePath=true",
    //   response: res => FILE_URL + res.info.url
    // },
    ImageDrop: true,
    'emoji-toolbar': true,  //是否展示出来
    "emoji-textarea": false, //我不需要emoji展示在文本框所以设置为false
    "emoji-shortname": true,
}

const Publish = () => {
    const [params] = useSearchParams()
    const articleId = params.get('id')
    const {channelStore} = useStore()
    useEffect(() => {
        try {
            channelStore.getChannels()
        } catch (e) {
            console.error('fetch channel fail', e)
        }
    }, [channelStore])
    // 上传图片
    const [fileList, setFileList] = useState([])
    // 暂存文件ref
    const fileListRef = useRef([])
    const onUploadChange = ({fileList}) => {
        // 采取受控的写法，在最后一次log里面response
        // 最终react中state fileList才有response
        setFileList(fileList)
        // 暂存图片
        fileListRef.current = fileList
    }
    // 控制图片数量
    const [imgCount, setImgCount] = useState(1)
    const onChangeType = e => {
        const count = e.target.value
        setImgCount(count)

        if (count === 1) {
            const firstImg = fileListRef.current[0]
            setFileList(!firstImg ? [] : [firstImg])
        } else if (count === 3) {
            setFileList(fileListRef.current)
        }
    }
    // 发布文章
    const onFinish = async (values) => {
        const {channel_id, content, title, type} = values
        const params = {
            channel_id,
            content,
            title,
            type,
            cover: {
                type: type,
                images: fileList.map(item => {
                    return item.url ? item.url : item.response.data.url
                }),
            }
        }
        try {
            if (articleId) {
                await http.put(`/articles/${articleId}?draft=false`, params)
            } else {
                await http.post('/articles?draft=false', params)
            }
            message.success('发布成功')
            history.push('/article')
        } catch (e) {
            console.error('publish article fail', e)
        }
    }
    // 获取文章(编辑时)
    const form = useRef(null)
    useEffect(() => {
        async function getArticle() {
            try {
                const res = await http.get(`/articles/${articleId}`)
                const {cover, ...formValue} = res.data
                console.log(formValue)
                form.current.setFieldsValue({...formValue, type: cover.type})
                const imageList = cover.images.map(item => ({url: item})) // antd.Upload格式要求
                setFileList(imageList)
                setImgCount(cover.type)
                fileListRef.current = imageList // dom元素
            } catch (e) {
                message.error('fetch article fail', 2).then(() => {
                    history.push('/article')
                }) // onClose回调
            }
        }

        if (articleId) {
            getArticle()
        }
    }, [articleId, form])
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>
                            <Link to='/'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{!articleId ? '发布文章' : '编辑文章'}</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 1, content: ''}}
                    onFinish={onFinish}
                    ref={form}
                >
                    <Form.Item
                        label='标题'
                        name='title'
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder='请输入文章标题' style={{width: 400}}></Input>
                    </Form.Item>
                    <Form.Item
                        label='频道'
                        name='channel_id'
                        rules={[{required: true, message: '请输入文章频道'}]}
                    >
                        <Select placeholder='请选择文章频道' style={{width: 400}}>
                            {channelStore.channels.map(item => (
                                <Option key={item.id} value={item.name}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label='封面'>
                        <Form.Item name='type'>
                            <Radio.Group onChange={onChangeType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 &&
                            (<Upload
                                name='file'
                                listType='picture-card'
                                className='avatar-uploader'
                                showUploadList
                                // action="http://geek.itheima.net/v1_0/upload"
                                // action="http://47.244.34.27:7002/file/upload"
                                action={process.env.REACT_APP_UPLOAD_URL}
                                fileList={fileList}
                                onChange={onUploadChange}
                                maxCount={imgCount}
                                multiple={imgCount > 1}
                            >
                                <div style={{marginTop: 8}}>
                                    <PlusOutlined/>
                                </div>
                            </Upload>)
                        }
                    </Form.Item>
                    <Form.Item
                        label='内容'
                        name='content'
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        <ReactQuill
                            className='publish-quill'
                            theme='snow'
                            placeholder='请输入文章内容'
                            modules={quillModules}
                        ></ReactQuill>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size='large' type='primary'
                                    htmlType='submit'>{articleId ? '修改文章' : '发布文章'}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish)