import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { genreService } from '../../service/httpServices';
import { useGenreView } from '../../store';
import { Link } from 'react-router-dom';

const GenreContent = () => {
    const { genres, setGenres } = useGenreView((state) => state);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await genreService.index();
                setGenres(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setGenres]);

    // Split genres into sub-arrays of 5 items each
    const groupedGenres = [];
    for (let i = 0; i < genres.length; i += 5) {
        groupedGenres.push(genres.slice(i, i + 5));
    }

    return (
        <Container>
            <Row>
                {groupedGenres.map((group, groupIndex) => (
                    <Col key={groupIndex} sm={12} md={6} lg={3}>
                        <Row>
                            {group.map((genre) => (
                                <Col key={genre.id} xs={12}>
                                    <Link to={`/genres/${genre.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        {genre.name}
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default GenreContent;
