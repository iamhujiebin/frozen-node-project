import './index.scss'
import {Layout, Popconfirm, Menu} from "antd"
import {observer} from 'mobx-react-lite'
import {
    LogoutOutlined,
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    FormOutlined,
    VideoCameraAddOutlined,
    RedditCircleFilled,
} from '@ant-design/icons'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {useStore} from '@/store'
import {useEffect, useState} from 'react'

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
    const [collapsed, setCollapsed] = useState(true)
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
    return (
        <Layout>
            <Header className="header">
                <div className="logo"></div>
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.name}</span>
                    <span className="user-logout">
            <Popconfirm title='是否确认退出?' okText='退出' cancelText='取消' onConfirm={onLogout}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    collapsedWidth="0" // 这里是折叠后特殊样式
                    zeroWidthTriggerStyle={{
                        right: "-50px",
                        top: "15px",
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