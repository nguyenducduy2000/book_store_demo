import clsx from 'clsx';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
    return (
        <Navbar expand="lg" sticky="top" className="bg-dark-subtle navbar-expand-lg">
            <Container fluid="xxl m-2">
                <Navbar.Brand>AI detction website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mb-2 mb-lg-0" variant="underline" defaultActiveKey="/">
                        <Nav.Item>
                            <Link className={clsx('nav-link')} to={'./'}>
                                Home
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className={clsx('nav-link')} to={'./'}>
                                Chart
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Button aria-controls="example-collapse-text">Filter</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
