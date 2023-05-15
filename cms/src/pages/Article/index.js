import {Breadcrumb, Button, Card, DatePicker, Form, Popconfirm, Radio, Select, Skeleton, Space, Table, Tag} from "antd"
import {Link} from "react-router-dom"
import './index.scss'
import locale from 'antd/es/date-picker/locale/zh_CN'
import img404 from '@/assets/error.png'
import {EditOutlined, DeleteOutlined, LayoutOutlined} from '@ant-design/icons'
import {useStore} from "@/store"
import {observer} from "mobx-react-lite"
import {useEffect, useState} from "react"
import {http, history} from "@/utils"

const {Option} = Select
const {RangePicker} = DatePicker

const Article = () => {
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover?.images?.[0] || img404} width={80} height={60} alt=''></img>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color='green'>审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate',
        },
        {
            title: '阅读数',
            dataIndex: 'read_count',
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size='middle'>
                        <Link to={`/detail?id=${data.id}`} target="_blank"><Button type='primary' shape='circle'
                                                                                   icon={<LayoutOutlined/>}
                                                                                   onClick={() => history.push()}/></Link>
                        <Button type='primary' shape='circle' icon={<EditOutlined/>}
                                onClick={() => history.push(`/publish?id=${data.id}`)}></Button>
                        <Popconfirm
                            title='确认删除该条文章吗？'
                            onConfirm={() => onDelArticle(data)}
                            okText='确认'
                            cancelText='取消'
                        >
                            <Button type='primary' shape='circle' icon={<DeleteOutlined/>} danger></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    // const data = [
    //   {
    //     id: '8218',
    //     comment_count: 0,
    //     cover: {
    //       images: ['http://geek.itheima.net/resources/images/15.jpg'],
    //     },
    //     like_count: 0,
    //     pubdate: '2019-03-11 09:00:00',
    //     read_count: 2,
    //     status: 2,
    //     title: 'wkwebview离线化加载h5资源解决方案'
    //   }
    // ]
    // 获取channel
    const {channelStore} = useStore()
    useEffect(() => {
        try {
            channelStore.getChannels()
        } catch (e) {
            console.error('fetch channels fail')
        }
    }, [channelStore])
    // 获取文章
    const [article, setArticle] = useState({
        list: [],
        count: 0,
    })
    // 查询条件
    const [params, setParams] = useState({
        page: 1,
        per_page: 10,
    })
    const [loading, setLoading] = useState(true)
    // params变化时候的副作用
    useEffect(() => {
        async function fetchArticleList() {
            const res = await http.get('/articles', {params})
            const {results, total_count} = res.data
            // 触发article的渲染
            setArticle({
                list: results,
                count: total_count,
            })
            setLoading(false)
        }

        fetchArticleList(params)
    }, [params])
    // 筛选功能
    const onSearch = values => {
        const {status, channel_id, date} = values
        const _params = {}
        if (status !== -1) {
            _params.status = status
        }
        if (channel_id) {
            _params.channel_id = channel_id
        }
        if (date) {
            _params.begin_pubdate = date[0].format('YYYY-MM-DD')
            _params.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        // 触发副作用
        setParams({
            ...params,
            ..._params,
        })
    }
    // 分页功能
    const onPageChange = (page, pageSize) => {
        setParams({
            ...params,
            page: page,
            per_page: pageSize,
        })
    }
    // 删除功能
    const onDelArticle = async (data) => {
        await http.delete(`/articles/${data.id}`)
        // 刷新列表
        setParams({
            page: 1,
            per_page: 10
        })
    }
    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>
                            <Link to='/'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form initialValues={{status: -1,}} onFinish={onSearch}>
                    <Form.Item label='状态' name='status'>
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='频道' name='channel_id'>
                        <Select
                            placeholder='请选择文章频道'
                            style={{width: 240}}
                            allowClear
                        >
                            {channelStore.channels.map(item => (
                                <Option key={item.id} value={item.name}>{item.name}</Option>
                            ))}
                            {/* <Option value='Frozen'>Frozen</Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item label='日期' name='date'>
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' style={{marginLeft: 80}}>筛选</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title={`根据筛选条件共查询到 ${article.count}条结果:`}>
                <Skeleton active loading={loading}>
                    <Table rowKey={record => record.id} columns={columns} dataSource={article.list}
                           pagination={{
                               position: 'bottomCenter',
                               current: params.page,
                               pageSize: params.per_page,
                               onChange: onPageChange,
                               total: article.count,
                           }}
                    />
                </Skeleton>
            </Card>
        </div>
    )
}

export default observer(Article)