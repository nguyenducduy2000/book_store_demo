import React from 'react';
import { Form, Input, Select, Radio } from 'antd';

const { Option } = Select;

const CheckoutForm = () => {
    return (
        <Form layout="vertical">
            <h3>Thông tin nhận hàng</h3>
            <Form.Item label="Số địa chỉ">
                <Select>
                    <Option value="address1">Địa chỉ khác...</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Email">
                <Input value="nguyenducduy2000@gmail.com" readOnly />
            </Form.Item>
            <Form.Item label="Họ và tên">
                <Input value="Duy Nguyễn" />
            </Form.Item>
            <Form.Item label="Số điện thoại (tùy chọn)">
                <Input addonAfter={<img src="path/to/flag.png" alt="flag" />} />
            </Form.Item>
            <Form.Item label="Địa chỉ (tùy chọn)">
                <Input />
            </Form.Item>
            <Form.Item label="Tỉnh thành">
                <Select>
                    <Option value="an-giang">An Giang</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Quận huyện (tùy chọn)">
                <Select>
                    <Option value="quanhuyen1">---</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Phường xã (tùy chọn)">
                <Select>
                    <Option value="phuongxa1">---</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Ghi chú (tùy chọn)">
                <Input.TextArea />
            </Form.Item>

            <h3>Vận chuyển</h3>
            <Radio.Group defaultValue="delivery">
                <Radio value="delivery">Giao hàng tận nơi 40.000đ</Radio>
            </Radio.Group>

            <h3>Thanh toán</h3>
            <Radio.Group defaultValue="cod">
                <Radio value="cod">Thanh toán khi giao hàng (COD)</Radio>
            </Radio.Group>
        </Form>
    );
};

export default CheckoutForm;
