import { useEffect } from 'react';
import { Form, Input, Radio } from 'antd';
import { userService } from '../../service/httpServices';
import useUserStore from '../../store/useUserStore';

const CheckoutForm = ({ form }) => {
    const { setUser } = useUserStore();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    const response = await userService.index();
                    setUser(response);
                    form.setFieldsValue({
                        email: response.email,
                        username: response.username,
                        phoneNumber: response.phoneNumber,
                        address: response.address,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', {
                    status: error.code || 'unknown status',
                    message: error.message || 'Unknown error',
                });
            }
        };
        fetchData();
    }, [setUser, form]);

    return (
        <Form form={form} layout="vertical">
            <h3 className="mb-3">Thông tin nhận hàng</h3>
            <Form.Item label="Email" name="email">
                <Input readOnly disabled />
            </Form.Item>
            <Form.Item label="Họ và tên" name="username">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại (tùy chọn)" name="phoneNumber">
                <Input placeholder="VD: 0123..." />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
                <Input placeholder="Nhập địa chỉ vào đây" />
            </Form.Item>
            <Form.Item label="Ghi chú (tùy chọn)" name="note">
                <Input.TextArea placeholder="Ghi chú cho nhân viên giao hàng" />
            </Form.Item>

            <h3>Thanh toán</h3>
            <Form.Item name="payment" initialValue="cash">
                <Radio.Group className="d-flex flex-column mb-3">
                    <Radio value="cash">Thanh toán khi giao hàng (COD)</Radio>
                    <Radio value="card">Thanh toán bằng thẻ ngân hàng nội địa</Radio>
                    <Radio value="visa">Thanh toán bằng thẻ Visa</Radio>
                    <Radio value="paypal">Thanh toán bằng paypal</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    );
};

export default CheckoutForm;
