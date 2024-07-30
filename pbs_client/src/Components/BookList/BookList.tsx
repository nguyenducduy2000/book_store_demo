import React from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Card, Pagination } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import './styles.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import useOrderState from '../../store/useOrderStore';
import { orderService } from '../../service/httpServices';
import { toast } from 'react-toastify';
import { usePaginationPage } from '../../store';
import PaginationPage from '../PaginationPage';

const { Meta } = Card;
const path = 'https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg';
interface BookListProps {
    title: string;
    books: Array<any> | object;
    category: object;
}

const BookList: React.FC<BookListProps> = ({ title, books, category }) => {
    const { orderItem, setOrderItem } = useOrderState();
    const navigate = useNavigate();
    const { paginationPage, setCurrentPage } = usePaginationPage((state) => state);
    const handleItemSelect = (id: number) => {
        navigate(`/books/${id}`);
    };

    const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        try {
            event.stopPropagation();
            const response = await orderService.addCartItem(id);
            setOrderItem(response);
            toast.success('Book added to cart successfully');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            toast.error('Error adding book to cart');
        }
    };

    const handleBuyNow = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        event.stopPropagation();
        // Add your buy-now logic here
        console.log(`Buy Now for book ID: ${id}`);
    };

    const handlePageChange = (value: number) => {
        setCurrentPage(value);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            navigate(`?page=${value}`);
        }, 0);
    };

    return (
        <Container>
            <div className="d-flex flex-row justify-content-between">
                <h1 className="mt-4 mb-4">{title}</h1>
                {location.pathname === '/' && category && <Link to={`/genres/${category.id}`}>See more</Link>}
            </div>
            {books.length > 0 ? (
                <>
                    <Row>
                        {books.map((book) => (
                            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Card
                                    className="card-hover-effect"
                                    onClick={() => handleItemSelect(book.id)}
                                    cover={
                                        <div className="image-container">
                                            <img alt={book.title} src={book.avatar || path} className="card-image" />
                                            <div className="hover-details">
                                                <div>
                                                    <p>{book.description}</p>
                                                    <p>
                                                        <HeartOutlined /> {book.likes}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    actions={[
                                        <Button
                                            key="addToCart"
                                            type="primary"
                                            onClick={(event) => handleAddToCart(event, book.id)}
                                        >
                                            Add to Cart
                                        </Button>,
                                        <Button
                                            key="buyNow"
                                            type="default"
                                            onClick={(event) => handleBuyNow(event, book.id)}
                                        >
                                            Buy Now
                                        </Button>,
                                    ]}
                                >
                                    <Meta title={book.title} className="mb-2 text-center" />
                                    {book.price && (
                                        <span className="text-center d-flex flex-fill justify-content-center">
                                            Price: {book.price}
                                        </span>
                                    )}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {location.pathname !== '/' && (
                        <div className="pagination-container d-flex justify-content-center">
                            <Pagination
                                current={paginationPage.currentPage}
                                total={paginationPage.total}
                                pageSize={paginationPage.perPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center">
                    <p>No books found.</p>
                </div>
            )}
        </Container>
    );
};

export default BookList;
