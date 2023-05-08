import {Radio, Space, Button, Tooltip, Divider, Dropdown} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import {useState} from "react";

const AntdDemo = () => {
    const btnClick = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    const [size, setSize] = useState('large')
    const [loading, setLoading] = useState(false)
    return (
        <>
            <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                <Radio.Button value='large'>Large</Radio.Button>
                <Radio.Button value='small'>Small</Radio.Button>
            </Radio.Group>
            <Divider orientation={'left'}>Divider</Divider>
            <Space wrap>
                <Button type="primary" onClick={btnClick} loading={loading}>Primary</Button>
                <Tooltip title='search'>
                    <Button type='primary' shape='circle' icon={<SearchOutlined/>}/>
                </Tooltip>
                <Dropdown.Button
                    danger
                    menu={{items: [{'key': 1, 'label': 'item1'}, {'key': 2, 'label': 'item2'}], onClick: btnClick}}
                >
                    Dropdown
                </Dropdown.Button>
            </Space>
        </>
    )
}

export default AntdDemo