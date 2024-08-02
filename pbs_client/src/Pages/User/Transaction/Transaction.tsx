import { Layout, Table, Button } from 'antd';
import { useEffect } from 'react';
import { orderService } from '../../../service/httpServices';
import { useOrderStore } from '../../../store';
import formatService from '../../../service/formatService';
import { toast } from 'react-toastify';

const { Content } = Layout;
function Transaction() {
    const { orderItem, setOrderItem } = useOrderStore();

    useEffect(() => {
        // Fetch the orders from the backend
        const fetchOrders = async () => {
            try {
                const response = await orderService.getOrderList();
                if (Array.isArray(response)) {
                    setOrderItem(response);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching orders:', {
                    message: error.message,
                });
            }
        };
        fetchOrders();
    }, [setOrderItem]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const handleCompleteOrder = async (orderId) => {
        try {
            const response = await orderService.updateOrderStatus(orderId, 'paid');
            setOrderItem(response);
            toast.success('Order payed successfully');
        } catch (error) {
            console.error('Error completing order:', {
                message: error.message,
            });
            toast.error('Error completing order');
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await orderService.updateOrderStatus(orderId, 'cancelled');
            setOrderItem(response);
            toast.success('Order canceled successfully');
        } catch (error) {
            console.error('Error canceling order:', {
                message: error.message,
            });
            toast.error('Error canceling order');
        }
    };

    const columns = [
        {
            title: '#',
            key: 'orderNumber',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Cart Items',
            dataIndex: 'books',
            key: 'books',
            render: (books) => books.map((book, idx) => <div key={idx}>{book.title}</div>),
        },
        {
            title: 'Total Items',
            dataIndex: 'totalItems',
            key: 'totalItems',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `${formatService.currencyFormat(price)} VND`, // Assuming price is in cents
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Ordered Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => formatDate(date),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleCompleteOrder(record.id)} disabled={record.status !== 'processing'}>
                        Complete Order
                    </Button>
                    {record.status === 'processing' && (
                        <Button
                            onClick={() => handleCancelOrder(record.id)}
                            disabled={record.status !== 'processing'}
                            style={{ marginLeft: '8px' }}
                        >
                            Cancel Order
                        </Button>
                    )}
                </div>
            ),
        },
    ];
    return (
        <Layout>
            <Content>
                <Table dataSource={orderItem} columns={columns} rowKey="id" />
            </Content>
        </Layout>
    );
}

export default Transaction;
