import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import { bookService, genreService } from '../../service/httpServices';
import { useParams } from 'react-router-dom';
import { useBookState, usePaginationPage } from '../../store';
import { BookList } from '../../Components/BookList';
const Genre: React.FC = () => {
    const { books, setBooks } = useBookState((state) => state);
    const [loading, setLoading] = useState<boolean>(true);
    const param: { genreId?: string } = useParams();
    const { paginationPage, setPaginationPage } = usePaginationPage((state) => state);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                if (location.pathname.includes('/latest')) {
                    console.log(paginationPage.currentPage);

                    response = await bookService.getLatestBooks(paginationPage.currentPage);
                } else if (location.pathname.includes('/genre')) {
                    response = await genreService.displayBookGenre(param.genreId || '', paginationPage.currentPage);
                }

                if (response) {
                    setBooks(response.data);
                    setPaginationPage(response.meta);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location.pathname, param.genreId, paginationPage.currentPage]);
    if (loading) {
        return (
            <Container>
                <div className="d-flex justify-content-center mt-5">
                    <Spinner animation="border" />
                </div>
            </Container>
        );
    }
    return <>{books ? <BookList title="Tất cả các sách" books={books} /> : <h1>No data is found</h1>}</>;
};

export default Genre;
