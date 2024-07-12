import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import { userService } from '../../service';

const Header: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            userService
                .index()
                .then((userData) => {
                    setUser(userData.username);
                    setIsLogin(true);
                })
                .catch(() => {
                    setIsLogin(false);
                    // console.error('Failed to fetch user data:', error);
                });
        }
    }, []);

    // const checkIfTokenExpired = (token: string): boolean => {
    //     try {
    //         const decodedToken: {
    //             id(id: number): unknown;
    //             exp: number;
    //         } = jwtDecode(token);
    //         const isExpired = decodedToken.exp < Date.now() / 1000;
    //         return isExpired;
    //     } catch (error) {
    //         console.error('Invalid token:', error);
    //         return true;
    //     }
    // };

    return (
        <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#e3f2fd' }}>
            <Container fluid="xxl">
                <Navbar.Brand>Bookstore</Navbar.Brand>
                <Nav className="me-auto mb-2 mb-lg-0" variant="underline" defaultActiveKey="/">
                    <Nav.Item>
                        <Link className={clsx('nav-link')} to={'/'}>
                            Home
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className={clsx('nav-link')} to={'/category'}>
                            Category
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button aria-controls="example-collapse-text">Filter</Button>
                    </Nav.Item>
                </Nav>
                <Nav className="ml-auto d-flex align-items-center">
                    {isLogin ? (
                        <div className="d-flex align-items-center">
                            <Nav.Item className="d-flex align-items-center">
                                <p className="mb-0 mr-2">Hello,</p>
                                <Link className={clsx('nav-link')} to={'/profile'}>
                                    {user}
                                </Link>
                            </Nav.Item>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <NavDropdown className="d-flex align-items-center" title="" id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link className={clsx('nav-link')} to={'/profile'}>
                                            Profile
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link className={clsx('nav-link')} to={'/logout'}>
                                            Logout
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Collapse>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <Nav.Item>
                                <Link className={clsx('nav-link')} to={'/login'}>
                                    Login
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className={clsx('nav-link')} to={'/register'}>
                                    Register
                                </Link>
                            </Nav.Item>
                        </div>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
