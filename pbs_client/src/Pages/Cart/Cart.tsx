import { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, InputNumber, Button, DatePicker, Checkbox } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { orderService } from '../../service/httpServices';
import useOrderState from '../../store/useOrderStore';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
const { Header, Content } = Layout;
// const { Option } = Select;

const Cart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { orderItem, setOrderItem } = useOrderState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await orderService.getOrderItem();
                // console.log('response::: ', response.books);
                setOrderItem(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setOrderItem]);

    const handleDeleteCartItem = async (bookId: number) => {
        try {
            const response = await orderService.deleteCartItem(bookId);
            setOrderItem(response);
            toast.success('Cart item deleted successfully');
        } catch (error) {
            console.error('Error deleting cart item:', error);
            toast;
        }
    };

    const handleQuantityChange = async (value: number, record: Object<any>) => {
        // console.log(value, record.id);
        try {
            // toast.info('Updating cart item...');
            const response = await orderService.updateCartItem(record.id, value);
            setOrderItem(response);
            // toast.success('Cart item updated successfully');
        } catch (error) {
            console.error('Error updating cart item:', error);
            toast.error('Error updating cart item');
        }
    };

    if (loading) {
        return (
            <Container>
                <div className="d-flex justify-content-center mt-5">
                    <Spinner animation="border" />
                </div>
            </Container>
        );
    }

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
                    ]}
                />
            </Header>
            <Content style={{ padding: '20px' }}>
                <h2>Your shopping cart</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 3 }}>
                        <Table
                            dataSource={orderItem.books}
                            pagination={false}
                            summary={() => (
                                <Table.Summary.Row>
                                    <Table.Summary.Cell colSpan={2}>Total:</Table.Summary.Cell>
                                    <Table.Summary.Cell className="text-center">
                                        {orderItem.totalItems}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell>
                                        <span style={{ color: 'green' }}>{orderItem.totalPrice}đ</span>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            )}
                        >
                            <Table.Column
                                title="Thông tin sản phẩm"
                                dataIndex="product"
                                key="product"
                                render={(text, record) => (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={
                                                record.avatar ||
                                                'https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg'
                                            }
                                            alt={record.title}
                                            style={{ width: 50, marginRight: 10 }}
                                        />
                                        <div>
                                            <div>{record.title}</div>
                                            <Button
                                                onClick={() => {
                                                    handleDeleteCartItem(record.id);
                                                }}
                                                danger
                                                ghost
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            />
                            <Table.Column
                                title="Đơn giá"
                                dataIndex="price"
                                key="price"
                                render={(text, record) => <span style={{ color: 'green' }}>{record.price}đ</span>}
                            />
                            <Table.Column
                                title="Số lượng"
                                dataIndex="quantity"
                                key="quantity"
                                render={(text, record) => (
                                    <InputNumber
                                        min={1}
                                        defaultValue={record.quantity}
                                        onChange={(value) => handleQuantityChange(value, record)}
                                    />
                                )}
                            />
                            <Table.Column
                                title="Thành tiền"
                                dataIndex="total"
                                key="total"
                                render={(text, record) => (
                                    <span style={{ color: 'green' }}>{record.price * record.quantity}đ</span>
                                )}
                            />
                        </Table>
                    </div>
                    <div style={{ flex: 1, marginLeft: '20px' }}>
                        <div>Delivery date</div>
                        <DatePicker style={{ width: '100%' }} />
                        <br />
                        <Checkbox style={{ marginTop: 10 }}>Xuất hóa đơn công ty</Checkbox>
                        <br />
                        <Button
                            type="primary"
                            size="large"
                            style={{ marginTop: 20, width: '100%' }}
                            onClick={() => navigate('/checkout')}
                        >
                            Check out
                        </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Cart;
