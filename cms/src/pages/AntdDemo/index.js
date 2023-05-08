import {Radio, Space, Button, Tooltip, Divider, Dropdown, Avatar, List, Skeleton, Input, Form} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import {useEffect, useState} from "react";

const AntdDemo = () => {
    const btnClick = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    const [size, setSize] = useState('large')
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                // setInitLoading(false);
                // setData(res.results);
                setList(res.results);
            });
    }, [fakeDataUrl]);
    const [form] = Form.useForm();
    const onLoadMore = (values) => {
        // setLoading(true);
        // setList(
        //     data.concat(
        //         [...new Array(count)].map(() => ({
        //             loading: true,
        //             name: {},
        //             picture: {},
        //         })),
        //     ),
        // );
        console.log(values);
        form.resetFields();
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = res.results.concat(list);
                setList(newData);
                // window.dispatchEvent(new Event('resize'));
            });
    };
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
            <Divider orientation={'left'}>Divider</Divider>
            <List
                bordered
                loading={false}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        // style={{justifyContent: "flex-end"}}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large}/>}
                                title={<a href="https://ant.design">{item.name?.last}</a>}
                                description={item.desc ? item.desc : "Ant Design, a design language for background applications, is refined by Ant UED Team"}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Form form={form} onFinish={onLoadMore}>
                <Form.Item
                    name={'sendText'}
                >
                    <Input placeholder={"Send something"}/>
                </Form.Item>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>Summit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AntdDemo