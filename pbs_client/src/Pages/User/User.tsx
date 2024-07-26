import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Button, DatePicker, Select, Avatar, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.css';
const { Content, Sider } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const App = () => {
    const [tabKey, setTabKey] = useState('1');

    const handleTabChange = (key) => {
        setTabKey(key);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} style={{ background: '#001529' }}>
                <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Quản lý tài khoản</Menu.Item>
                    <Menu.Item key="2">Tủ sách cá nhân</Menu.Item>
                    <Menu.Item key="3">Thành tích</Menu.Item>
                    <Menu.Item key="4">Lịch sử giao dịch</Menu.Item>
                    <Menu.Item key="5">Hỗ trợ khách hàng</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '16px', padding: '0 16px' }}>
                    <div className="site-layout-content" style={{ padding: '24px', background: '#fff', color: '#000' }}>
                        <h2>Quản lý thông tin</h2>
                        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                            <TabPane tab="Thông tin cá nhân" key="1">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Form
                                        layout="vertical"
                                        initialValues={{
                                            username: 'duynd.solid',
                                            userId: '9130240',
                                            fullName: 'ABC',
                                            dob: null,
                                            gender: 'Khác',
                                        }}
                                        style={{ flex: 1, marginRight: '24px' }}
                                    >
                                        <Form.Item label="Email" name="username">
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item label="User ID" name="userId">
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item label="Username" name="fullName">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Date of Birth" name="dob">
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item label="Gender" name="gender">
                                            <Select>
                                                <Option value="Nam">Nam</Option>
                                                <Option value="Nữ">Nữ</Option>
                                                <Option value="Khác">Khác</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Cập nhập
                                            </Button>
                                            <Button style={{ marginLeft: '8px' }} htmlType="button">
                                                Hủy
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar
                                            style={{ backgroundColor: '#87d068' }}
                                            icon={<UserOutlined />}
                                            size={64}
                                        />
                                        <Button style={{ marginTop: '16px' }}>Thay ảnh</Button>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Tài khoản và bảo mật" key="2">
                                <Form layout="vertical">
                                    <Form.Item label="Email">
                                        <Input value="duynd.solid@gmail.com" disabled />
                                    </Form.Item>
                                    <Form.Item label="Số điện thoại">
                                        <Input value="Chưa xác thực" disabled />
                                        <Button type="primary" style={{ marginTop: '8px' }}>
                                            Xác thực
                                        </Button>
                                    </Form.Item>
                                    <Form.Item label="Mật khẩu">
                                        <Input.Password value="********" disabled />
                                    </Form.Item>
                                    <Button type="link" style={{ color: '#ff4d4f' }}>
                                        Xóa tài khoản
                                    </Button>
                                </Form>
                            </TabPane>
                            <TabPane tab="Tài khoản liên kết" key="3">
                                <div>
                                    <div>
                                        <UserOutlined /> Google: Nguyễn Duy
                                    </div>
                                    <div>
                                        <Button type="primary" style={{ marginTop: '8px' }}>
                                            Kết nối
                                        </Button>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
