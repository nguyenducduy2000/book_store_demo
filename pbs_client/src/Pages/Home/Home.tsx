// import Carousel from '../../Components/Carousel';
import { useEffect, useState } from 'react';
import { bookService } from '../../service/httpServices';
// import Carousel from '../../Components/Carousel';

import './style.css';
import { useNewBook, useBookState } from '../../store';
import { Container, Spinner } from 'react-bootstrap';
import { BookList } from '../../Components/BookList';
function Home() {
    const { loading, setLoading }= useState(true);
    const { books, setBooks } = useBookState((state) => state);
    const { newBooks, setNewBooks } = useNewBook((state) => state);
    // get data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookGenres, latestBooks] = await Promise.all([bookService.home(), bookService.getLatestBooks()]);
                // const response = await bookService.home();
                setBooks(bookGenres);
                setNewBooks(latestBooks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', {
                    message: error.message,
                });
            }
        };

        fetchData();
    }, [setBooks, setNewBooks, setLoading]);

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
        <div className="wrapper d-flex flex-column justify-content-center align-items-center flex-grow-1">
            {/* {books ? (
                Object.keys(books).map((key) => {
                    const matchedGenre = books[key][0].genres.find((genre) => genre.name === key);
                    if (matchedGenre) {
                        return <Swiper key={key} category={matchedGenre} books={books[key]} />;
                    }
                    return null;
                })
            ) : (
                <h1>No data is found</h1>
            )} */}
            {books ? (
                Object.keys(books).map((key) => {
                    if (!books[key] || books[key].length === 0) {
                        return (
                            <div key={key} className="genre-message">
                                <h2>No books in the {key} genre yet</h2>
                            </div>
                        );
                    }
                    const matchedGenre = books[key][0].genres.find((genre) => genre.name === key);
                    if (matchedGenre) {
                        return (
                            <BookList
                                key={key}
                                title={`Sách trong ${key}`}
                                books={books[key]}
                                category={matchedGenre}
                            />
                        );
                    }
                    return null;
                })
            ) : (
                <h1>No data is found</h1>
            )}
            <BookList title="Sách mới nhất" books={newBooks} />
        </div>
    );
}

export default Home;
