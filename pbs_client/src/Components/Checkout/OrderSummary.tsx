import React from 'react';
import { Button, List, Input, Image } from 'antd';

const OrderSummary = () => {
    const path = 'https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg';
    const data = [
        {
            title: 'CON ĐƯỜNG HỒI GIÁO',
            price: '326.400đ',
            discount: 'Giảm 15% so với giá bìa (-57.600đ)',
            image: path,
        },
        {
            title: 'BÓ XẤU, BÓ TỐT',
            price: '263.500đ',
            discount: 'Giảm 15% so với giá bìa (-46.500đ)',
            image: path,
        },
    ];

    return (
        <div>
            <h3>Đơn hàng (5 sản phẩm)</h3>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image width={50} src={item.image} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.discount}
                        />
                        <div>{item.price}</div>
                    </List.Item>
                )}
            />
            <Input placeholder="Nhập mã giảm giá" style={{ marginTop: 16 }} />
            <Button type="primary" style={{ marginTop: 8 }}>
                Áp dụng
            </Button>
            <div style={{ marginTop: 16 }}>
                <p>Tạm tính: 589.900đ</p>
                <p>Phí vận chuyển: 40.000đ</p>
                <h3>Tổng cộng: 629.900đ</h3>
            </div>
            <Button type="primary" style={{ width: '100%' }}>
                ĐẶT HÀNG
            </Button>
        </div>
    );
};

export default OrderSummary;
