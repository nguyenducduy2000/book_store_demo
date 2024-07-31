// import React from 'react';
import { Breadcrumb, Row, Col, Card, Button, Rate, InputNumber, Dropdown, Menu } from 'antd';
import { BookOutlined, ShoppingCartOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { bookService, orderService } from '../../service/httpServices';
import useBookView from '../../store/useBookView';
import useOrderState from '../../store/useOrderStore';
import { toast } from 'react-toastify';
import { useModalState } from '../../store';
const { Meta } = Card;

const BookCard = () => {
    const param = useParams();
    // console.log('param::: ', typeof param.id);

    const { toggleShow, setStatus } = useModalState();
    const { book, setBooks } = useBookView((state) => state);
    const { orderItem, setOrderItem } = useOrderState();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bookService.getBook(param.id);
                setBooks(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setBooks]);

    const handleAddToCart = async () => {
        try {
            const response = await orderService.addCartItem(book.id);
            setOrderItem({ ...orderItem, books: [...orderItem.books, response] });
            toast.success('Book added to cart successfully');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            toast.error('Error adding book to cart');
        }
    };

    const handleUpdateBook = () => {
        toggleShow();
        setStatus('update');
    };

    const handleDeleteBook = async () => {
        try {
            if (confirm('Are you sure you want to DELETE this book?')) {
                await bookService.delete(book.id);
                navigate('/');
                toast.success('Book deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            toast.error('Error deleting book');
        }
    };

    return (
        <>
            <div className="container" style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
                <Breadcrumb
                    style={{ marginBottom: '20px' }}
                    items={[
                        {
                            title: <Link to="/">Trang chủ</Link>,
                        },
                        {
                            title: book.title,
                        },
                    ]}
                />

                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="example"
                                    src={
                                        book.avatar ||
                                        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                                    }
                                />
                            }
                            style={{ height: '100%' }}
                        />
                    </Col>
                    <Col span={16}>
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Meta
                                    title={
                                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                            {book.title || 'N/A'}
                                        </div>
                                    }
                                    description={
                                        <div style={{ fontSize: '16px' }}>
                                            <p style={{ marginBottom: '10px' }}>AUTHOR: {book.author.name || 'N/A'}</p>
                                            <p style={{ marginBottom: '10px' }}>
                                                Giá:{' '}
                                                <span style={{ color: 'green', fontWeight: 'bold' }}>
                                                    {book.price || 'N/A'}đ
                                                </span>{' '}
                                                <span style={{ textDecoration: 'line-through' }}>128.000đ</span>{' '}
                                                <span style={{ color: 'red' }}>-15%</span>
                                            </p>
                                            <InputNumber min={1} max={100} defaultValue={1} />
                                            <p style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                Còn lại {book.stock || 'N/A'} trong kho
                                            </p>
                                            <Rate allowHalf defaultValue={5} style={{ marginBottom: '10px' }} />
                                            <p style={{ marginBottom: '10px' }}>Nhà xuất bản: NXB Dân Trí</p>
                                            <p>
                                                Genres:{' '}
                                                {book.genres && book.genres.length > 0
                                                    ? book.genres.map((genres, index) => (
                                                          <span key={index}>
                                                              {genres.name}
                                                              {index !== book.genres.length - 1 ? ', ' : ''}
                                                          </span>
                                                      ))
                                                    : 'N/A'}
                                            </p>
                                            <p style={{ marginBottom: '10px' }}>Số trang: 304</p>
                                            <p style={{ marginBottom: '10px' }}>Ngày phát hành: 2024</p>
                                        </div>
                                    }
                                />
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="1" icon={<EditOutlined />} onClick={handleUpdateBook}>
                                                Cập nhật sách
                                            </Menu.Item>
                                            <Menu.Item key="2" icon={<DeleteOutlined />} onClick={handleDeleteBook}>
                                                Xóa sách
                                            </Menu.Item>
                                        </Menu>
                                    }
                                    trigger={['click']}
                                >
                                    <Button style={{ fontSize: '16px', marginTop: '10px' }}>
                                        Tùy chọn <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                <Button
                                    type="primary"
                                    icon={<ShoppingCartOutlined />}
                                    style={{ fontSize: '16px', height: '50px', width: '45%' }}
                                    onClick={handleAddToCart}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                                <Button
                                    type="default"
                                    icon={<BookOutlined />}
                                    style={{ fontSize: '16px', height: '50px', width: '45%' }}
                                >
                                    Mua ngay
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Card>
                            <h3>Giới thiệu sách</h3>
                            <p>{book.description}</p>
                            <p>
                                <em>- Author: {book.author.name}</em>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default BookCard;
