// import React, { useEffect } from 'react';
import { Virtual, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookItem from '../Book/BookItem';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
interface AppSwiperProps {
    category: string;
    books: Array<any>;
}

const AppSwiper: React.FC<AppSwiperProps> = ({ category, books }) => {
    const navigate = useNavigate();

    const handleBookView = (book: any) => {
        navigate(`/books/${book.id}`);
    };
    return (
        <div className="w-100 position-relative px-3 mb-3 ">
            <div className="d-flex flex-row justify-content-between mb-3">
                <h1>{category.name} books</h1>
                <Link to={`/genres/${category.id}`}>See more</Link>
            </div>
            <Swiper
                autoHeight={true}
                modules={[Virtual, Navigation]}
                slidesPerView={6}
                centeredSlides={false}
                spaceBetween={10}
                navigation={true}
                virtual
            >
                {books.map((book) => (
                    <SwiperSlide key={book.id} virtualIndex={book.id}>
                        <BookItem
                            book={book}
                            onClick={() => {
                                handleBookView(book);
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AppSwiper;
