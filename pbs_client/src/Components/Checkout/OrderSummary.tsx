import { useEffect, useState } from 'react';
import { Button, List, Input, Image } from 'antd';
import { orderService } from '../../service/httpServices';
import useOrderState from '../../store/useOrderStore';
import { Container, Spinner } from 'react-bootstrap';
import formatService from '../../service/formatService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderSummary = ({ form }) => {
    const path = 'https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg';
    const { orderItem, setOrderItem } = useOrderState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await orderService.getOrderItem();
                setOrderItem(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', {
                    message: error.message,
                });
            }
        };

        fetchData();
    }, [setOrderItem]);

    const handleCheckout = async () => {
        try {
            if (!orderItem || !orderItem.books || orderItem.books.length === 0) {
                toast.error('No item in your cart!');
                return;
            }

            if (confirm('You are about to checkout this order?')) {
                const values = await form.validateFields();
                const data = {
                    status: 'processing',
                    ...values,
                };
                await orderService.checkout(data);
                navigate('/');
                toast.success('Order checkout successfully!');
            }
        } catch (error) {
            console.error('Error fetching data:', {
                message: error.message,
            });
            toast.error('Error checkout order!');
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

    const hasBooks = orderItem && orderItem.books && orderItem.books.length > 0;

    return (
        <div>
            <h3>Đơn hàng ({hasBooks ? orderItem.books.length : 0} sản phẩm)</h3>
            {hasBooks ? (
                <List
                    itemLayout="horizontal"
                    dataSource={orderItem.books}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image width={50} src={item.avatar || path} />}
                                title={item.title}
                                description={'Số lượng: ' + item.quantity}
                            />
                            <div>{formatService.currencyFormat(item.quantity * item.price)} đ</div>
                        </List.Item>
                    )}
                />
            ) : (
                <p>Không có sản phẩm trong giỏ hàng</p>
            )}
            <div style={{ marginTop: 16 }}>
                <p>Tạm tính: {formatService.currencyFormat(orderItem.totalPrice || 0)} đ</p>
                <p>Phí vận chuyển: 40,000 đ</p>
                <h3>Tổng cộng: {formatService.currencyFormat((orderItem.totalPrice || 0) + 40000)} đ</h3>
            </div>
            <Button type="primary" style={{ width: '100%' }} onClick={handleCheckout}>
                ĐẶT HÀNG
            </Button>
        </div>
    );
};

export default OrderSummary;
