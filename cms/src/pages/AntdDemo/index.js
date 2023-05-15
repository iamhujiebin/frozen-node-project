import {Radio, Space, Button, Tooltip, Divider, Dropdown, Avatar, List, Skeleton, Input, Form, Table} from "antd";
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect'
import {SearchOutlined, MenuOutlined} from "@ant-design/icons"
import React, {useEffect, useState} from "react";
import {DndContext} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

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
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address:
                'Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ]);
    const columns = [
        {
            key: 'sort',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const Row = ({children, ...props}) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            setActivatorNodeRef,
            transform,
            transition,
            isDragging
        } = useSortable({
            id: props['data-row-key'],
        });
        const style = {
            ...props.style,
            transform: CSS.Transform.toString(
                transform && {
                    ...transform,
                    scaleY: 1,
                },
            )?.replace(/translate3d\(([^,]+),/, 'translate3d(0,'),
            transition,
            cursor: 'move',
            ...(isDragging
                ? {
                    position: 'relative',
                    zIndex: 9999,
                }
                : {}),
        };
        return <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {
                React.Children.map(children, (child) => {
                    if (child.key === 'sort') {
                        return React.cloneElement(child, {
                            children: (
                                <MenuOutlined
                                    ref={setActivatorNodeRef}
                                    style={{
                                        touchAction: 'none',
                                        cursor: 'move',
                                    }}
                                    {...listeners}
                                />
                            ),
                        });
                    }
                    return child
                })

            }
        </tr>
    }
    const onDragEnd = ({active, over}) => {
        if (active.id !== over?.id) {
            setDataSource((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id)
                const overIndex = prev.findIndex((i) => i.key === over?.id)
                return arrayMove(prev, activeIndex, overIndex)
            })
        }
    }
    if (isMobile) {
        return <div> This content is available only on mobile</div>
    }
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
            <Divider orientation={'left'}>Divider</Divider>
            <DndContext onDragEnd={onDragEnd}>
                <SortableContext
                    // rowKey array
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                        components={{
                            body: {
                                row: Row,
                            },
                        }}
                        rowKey="key"
                        columns={columns}
                        dataSource={dataSource}
                    />
                </SortableContext>
            </DndContext>
        </>
    )
}

export default AntdDemo