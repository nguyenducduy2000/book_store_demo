import React from 'react';
import { Row, Col, Layout } from 'antd';
import { CheckoutForm, OrderSummary } from '../../Components/Checkout';

const { Header, Content } = Layout;

const App = () => {
    return (
        <Layout>
            <Header>
                <img src="path/to/logo.png" alt="logo" />
            </Header>
            <Content style={{ padding: '50px' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CheckoutForm />
                    </Col>
                    <Col span={12}>
                        <OrderSummary />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default App;
