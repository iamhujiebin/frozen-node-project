import './index.scss'
import {Layout, Popconfirm, Menu, message, Drawer, Button, Space, Form, Input, Select} from "antd"
import demon from '@/assets/chicken.png'
import {observer} from 'mobx-react-lite'
import {
    LogoutOutlined,
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    FormOutlined,
    VideoCameraAddOutlined,
    RedditCircleFilled,
    InstagramOutlined
} from '@ant-design/icons'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {useStore} from '@/store'
import React, {useEffect, useState} from 'react'

const {Header, Sider} = Layout

const CMSLayout = () => {
    const MenuList = [
        {
            key: '/',
            label: (<Link to='/'>数据概览</Link>),
            icon: <HomeOutlined/>
        },
        {
            key: '/article',
            label: (<Link to='/article'>内容管理</Link>),
            icon: <DiffOutlined/>
        },
        {
            key: '/publish',
            icon: <EditOutlined/>,
            label: (<Link to='/publish'>发布文章</Link>),
        },
        {
            key: '/todo',
            icon: <FormOutlined/>,
            label: (<Link to='/todo'>todolist</Link>),
        },
        {
            key: '/camera',
            icon: <VideoCameraAddOutlined/>,
            label: (<Link to='/camera'>连麦</Link>),
        },
        {
            key: '/album',
            icon: <InstagramOutlined/>,
            label: (<Link to='/album'>相册</Link>),
        },
        {
            key: '/chatgpt',
            icon: <RedditCircleFilled/>,
            label: (<Link to='/chatgpt'>ChatGPT</Link>),
        },
        {
            key: '/antddemo',
            icon: <FormOutlined/>,
            label: (<Link to='/antddemo'>antddemo</Link>)
        }
    ]
    const location = useLocation()
    const selectedKey = location.pathname
    const {userStore, loginStore} = useStore()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const onLogout = () => {
        loginStore.logout()
        navigate('/login')
    }
    useEffect(() => {
        // 用axios包就要try包住，非200就会走到catch
        try {
            userStore.getUserInfo()
        } catch (e) {
            console.error('get user fail', e)
        }
    }, [userStore])
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = (value) => {
        console.log(value)
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo"></div>
                <div className="user-info">
                    <img alt={"avatar"} src={demon} width={45} height={45} onClick={showDrawer}
                         style={{
                             "backgroundColor": "#f0f0f0",
                             "borderRadius": "10px",
                             "marginRight": "5px",
                             "cursor": 'pointer',
                         }}
                    />
                    <span className="user-name">{userStore.userInfo.name}</span>
                    <span className="user-logout">
                        <Popconfirm title='是否确认退出?' okText='退出' cancelText='取消' onConfirm={onLogout}>
                            <LogoutOutlined/> 退出
                        </Popconfirm>
                    </span>
                </div>
                {/*抽屉打开User信息页面*/}
                <Drawer
                    title="Modify your account"
                    width={560}
                    onClose={onClose}
                    open={open}
                    bodyStyle={{
                        paddingBottom: 80,
                    }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onSubmit} type="primary">Submit</Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" initialValues={{"name": userStore.userInfo.name, "gender": "male"}}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter user name"/>
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{required: true}]}
                        >
                            <Select
                                placeholder="Your Gender"
                                allowClear
                            >
                                <Select.Option value="male">male</Select.Option>
                                <Select.Option value="female">female</Select.Option>
                                <Select.Option value="other">other</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Drawer>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    // collapsedWidth="0" // 这里是折叠后特殊样式
                    zeroWidthTriggerStyle={{
                        right: "-50px",
                        bottom: "-15px",
                    }}
                >
                    <Menu
                        mode='inline'
                        theme='dark'
                        defaultSelectedKeys={[selectedKey]}
                        style={{height: '100%', borderRight: 0}}
                        items={MenuList}
                    >
                    </Menu>
                </Sider>
                <Layout className='layout-content' style={{padding: 20}}>
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(CMSLayout)