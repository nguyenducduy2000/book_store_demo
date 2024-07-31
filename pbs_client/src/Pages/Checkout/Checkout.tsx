import { Row, Col, Layout, Breadcrumb } from 'antd';
import { CheckoutForm, OrderSummary } from '../../Components/Checkout';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
const { Header, Content } = Layout;
const App = () => {
    const [form] = useForm();
    return (
        <Layout>
            <Header style={{ backgroundColor: '#fff', padding: '0 36px' }}>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: <Link to="/cart">Cart</Link>,
                        },
                        {
                            title: <>Checkout</>,
                        },
                    ]}
                />
            </Header>
            <Content style={{ padding: '50px' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CheckoutForm form={form} />
                    </Col>
                    <Col span={12}>
                        <OrderSummary form={form} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default App;
