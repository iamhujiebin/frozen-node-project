/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Input, Space, Popconfirm, Table } from 'antd'
import "./Antd.css"

const { Search } = Input

function App () {
  const [dataJson, setDataJson] = useState('data.json')
  const [list, setList] = useState([])
  const loadList = async (data = 'data.json') => {
    const res = await axios.get(data)
    setList(res.data.data)
  }
  // []: 启动的时候执行一次
  // [$param]: param变化的时候执行
  useEffect(() => {
    console.log('useEffect move', dataJson)
    loadList(dataJson)
  }, [dataJson])

  const del = async (id) => {
    console.log(id)
    // await axios.delete('./data_delete.json')
    setDataJson('data_delete.json')
  }

  const onSearch = async () => {
    // const res = await axios.get('./data_search.json')
    // setList(res.data.data)
    setDataJson('data_search.json')
  }

  const columns = [
    {
      title: '任务编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '任务描述',
      dataIndex: 'des',
      key: 'des',
    },
    {
      title: '操作',
      dataIndex: 'do',
      key: 'do',
      render: (text, record) => (
        <Space size='middle'>
          <Popconfirm title='确定要删除吗？' onConfirm={() => del(record.id)}>
            <a href='#'>删除</a>
          </Popconfirm>
        </Space>
      ),
    }
  ]

  return (
    <div className='container'>
      <div className='search-box'>
        <Search
          placeholder='请输入关键词'
          allowClear
          enterButton='搜索'
          size='large'
          onSearch={onSearch}
        />
      </div>
      <Table bordered
        dataSource={list}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  )
}

export default App