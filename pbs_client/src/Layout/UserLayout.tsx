import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { userService } from '../service/httpServices';

const { Sider } = Layout;

type LayoutProps = {
    children: React.ReactNode;
};

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const currentURL = location.pathname;
    const [selectedKey, setSelectedKey] = useState(currentURL);

    useEffect(() => {
        const checkForLogin = async () => {
            try {
                const response = await userService.index();
                if (!response || response.error) {
                    if (location.pathname === '/transactions') {
                        console.log(location.pathname);
                        setSelectedKey('/transactions');
                        navigate('/transactions');
                    } else {
                        navigate('/account');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', {
                    status: error.code || 'unknown status',
                    message: error.message || 'Unknown error',
                });
                navigate('/');
            }
        };

        checkForLogin();
    }, [navigate]);

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);

        switch (e.key) {
            case '/account':
                navigate('/account');
                break;
            case '/favorites':
                navigate('/favorites');
                break;
            case '/transactions':
                navigate('/transactions');
                break;
            default:
                break;
        }
    };

    return (
        <div className="d-flex flex-fill flex-column">
            <Header />
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={200} style={{ background: '#001529' }}>
                    <Menu theme="dark" mode="vertical" selectedKeys={[selectedKey]} onClick={handleMenuClick}>
                        <Menu.Item key="/account">Quản lý tài khoản</Menu.Item>
                        <Menu.Item key="/favorites">Tủ sách cá nhân</Menu.Item>
                        <Menu.Item key="/transactions">Lịch sử giao dịch</Menu.Item>
                    </Menu>
                </Sider>
                <Layout>{children}</Layout>
            </Layout>
            <Footer />
        </div>
    );
};

export default UserLayout;
