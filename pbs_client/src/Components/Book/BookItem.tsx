import React, { useEffect } from 'react';
import './style.css';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { orderService } from '../../service/httpServices';
import useOrderState from '../../store/useOrderStore';
const { Meta } = Card;
import { toast } from 'react-toastify';
interface BookItemProps {
    book: any;
}

const BookItem: React.FC<BookItemProps> = (book) => {
    const navigate = useNavigate();
    const { orderItem, setOrderItem } = useOrderState();
    const handleBookView = () => {
        navigate(`/books/${book.id}`);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target instanceof HTMLElement && e.target.tagName !== 'BUTTON' && !e.target.closest('.overlay-buttons')) {
            handleBookView();
        }
    };
    const handleAddToCart = async () => {
        try {
            const response = await orderService.addCartItem(book.id);
            setOrderItem({ ...orderItem, books: [...orderItem.books, response] });
            setOrderItem(response);
            toast.success('Book added to cart successfully');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            toast.error('Error adding book to cart');
        }
    };
    // console.log('book item:::', book);
    return (
        <>
            <div className="book-item-container">
                <Card
                    onClick={handleClick}
                    hoverable
                    style={{ width: 240, position: 'relative' }}
                    cover={<img alt={book.title} src={book.cover} />}
                >
                    <Meta title={book.title} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }} />
                    <div className="overlay">
                        <div className="overlay-content">
                            <div className="overlay-description">
                                <p>{book.description}</p>
                                <p>Author: {book.author}</p>
                                <div className="overlay-icon">
                                    <HeartOutlined style={{ fontSize: '24px', color: 'white' }} />
                                </div>
                            </div>
                            <div className="overlay-buttons">
                                <Button type="primary" icon={<ShoppingCartOutlined />} block>
                                    Buy
                                </Button>
                                <Button
                                    onClick={() => handleAddToCart()}
                                    type="primary"
                                    icon={<ShoppingCartOutlined />}
                                    block
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default BookItem;
