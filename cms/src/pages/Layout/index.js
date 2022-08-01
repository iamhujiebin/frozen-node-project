import './index.scss'
import { Layout, Popconfirm, Menu } from "antd"
import { observer } from 'mobx-react-lite'
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
const { Header, Sider } = Layout

const MenuList = [
  {
    key: '/',
    label: '数据概览',
    icon: <HomeOutlined />
  },
  {
    key: '/article',
    label: '内容管理',
    icon: <DiffOutlined />
  },
  {
    key: '/publish',
    label: '发布文章',
    icon: <EditOutlined />
  }
]

const CMSLayout = () => {
  const location = useLocation()
  const selectedKey = location.pathname
  const { userStore, loginStore } = useStore()
  const navigate = useNavigate()
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
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            theme='dark'
            defaultSelectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            items={MenuList}
          >
            {/* <Menu.Item icon={<HomeOutlined />} key='1'>
              数据概览
            </Menu.Item>
            <Menu.Item icon={<HomeOutlined />} key='2'>
              内容管理
            </Menu.Item>
            <Menu.Item icon={<HomeOutlined />} key='3'>
              发布文章
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className='layout-content' style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(CMSLayout)