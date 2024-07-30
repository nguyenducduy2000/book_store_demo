import React, { useEffect, useState } from 'react';
import { Layout, Menu, Form, Input, Button, DatePicker, Select, Avatar, Tabs, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userService } from '../../service/httpServices';
import './styles.css';
import useUserStore from '../../store/useUserStore';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import formatService from '../../service/formatService';
const { Content, Sider } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const User = () => {
    const [tabKey, setTabKey] = useState('1');
    const { user, setUser } = useUserStore();
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    const response = await userService.index();
                    // console.log(formatService.convertISOToObject(response.dateOfBirth));
                    setUser(response);
                }
            } catch (error) {
                console.error('Error fetching data:', {
                    status: error.code || 'unknown status',
                    message: error.message || 'Unknown error',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [setUser]);

    const handleTabChange = (key) => {
        setTabKey(key);
    };

    const handleUpdateUser = async () => {
        try {
            if (confirm('Are you sure you want to UPDATE information?')) {
                // Get values from form
                const values = await form.validateFields();
                // Convert the 'dob' object to an ISO string
                if (values.dob) {
                    values.dob = dayjs(values.dob).toISOString();
                }

                const response = await userService.update(values);
                console.log(response);
                setUser(response);
                toast.success('Cập nhật thông tin thành công');
            }
        } catch (error) {
            console.error('Error updating user:', {
                status: error.code || 'unknown status',
                message: error.message || 'Unknown error',
            });
            toast.error('Có lỗi trong quá trình cập nhật thông tin người dùng');
        }
    };

    if (loading) {
        return (
            <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" />
            </Layout>
        );
    }

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
                                        form={form}
                                        layout="vertical"
                                        initialValues={{
                                            email: user.email,
                                            userId: user.id,
                                            username: user.username,
                                            dob: '',
                                            phoneNumber: user.phoneNumber || null,
                                            address: user.address || null,
                                        }}
                                        style={{ flex: 1, marginRight: '24px' }}
                                    >
                                        <Form.Item label="Email" name="email">
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item label="User ID" name="userId">
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item label="Username" name="username">
                                            <Input placeholder="Nhập tên của bạn" />
                                        </Form.Item>
                                        <Form.Item label="Date of Birth" name="dob">
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item label="Phone number" name="phoneNumber">
                                            <Input placeholder="Nhập số điện thoại" />
                                        </Form.Item>
                                        <Form.Item label="Address" name="address">
                                            <Input placeholder="Nhập địa chỉ" />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" onClick={handleUpdateUser}>
                                                Cập nhập
                                            </Button>
                                            <Button
                                                style={{ marginLeft: '8px' }}
                                                htmlType="button"
                                                onClick={() => form.resetFields()}
                                            >
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
                                        <Input value={user.email} disabled />
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

export default User;
