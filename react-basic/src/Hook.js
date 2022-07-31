/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useState, useEffect, useContext, useRef } from 'react'
import { Input, Space, Popconfirm, Table } from 'antd'
import "./Antd.css"
import Context from './Context'

const { Search } = Input

function App () {
  const searchRef = useRef(null)
  const placeholder = useContext(Context)
  const [dataJson, setDataJson] = useState('data.json')
  const [list, setList] = useState([])
  const loadList = async (data = 'data.json') => {
    const res = await axios.get(data)
    setList(res.data.data)
  }
  // []: 启动的时候执行一次，在dom渲染完之后执行
  useEffect(() => {
    console.log('after dom render:SearchRef', searchRef.current)
  }, [])
  // [$param]: 启动+param变化的时候执行
  useEffect(() => {
    console.log('dataJson change,but strict mode has two', dataJson)
    loadList(dataJson)
  }, [dataJson])

  const del = async (id) => {
    // await axios.delete('./data_delete.json')
    setDataJson('data_delete.json')
  }

  const onSearch = async () => {
    // const res = await axios.get('./data_search.json')
    // setList(res.data.data)
    setDataJson('data_search.json')
  }

  const onCancel = async () => {
    setDataJson('data.json')
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
          <Popconfirm title='确定要删除吗？' onCancel={onCancel} onConfirm={() => del(record.id)}>
            <a href='#'>删除</a>
          </Popconfirm>
        </Space>
      ),
    }
  ]

  return (
    <div className='container'>
      <div className='search-box'>
        <Search ref={searchRef}
          placeholder={placeholder}
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