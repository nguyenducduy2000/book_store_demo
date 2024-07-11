import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './LoginForm.css';
import Logo from '../../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.pathname === '/register') {
            setInputUsername(''); // Show the username field
        } else {
            setInputUsername(''); // Hide the username field
        }
    }, [location.pathname]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        await delay(500);
        console.log(`Username :${inputEmail}, Password :${inputPassword}`);
        if (inputEmail !== 'admin' || inputPassword !== 'admin') {
            setShow(true);
        }
        setLoading(false);
    };

    const handlePassword = () => {};

    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
            <img className="img-thumbnail mx-auto d-block mb-2" src={Logo} alt="logo" />
            <div className="h4 mb-2 text-center">{location.pathname === '/register' ? 'Register' : 'Sign In'}</div>
            {show && (
                <Alert className="mb-2" variant="danger" onClose={() => setShow(false)} dismissible>
                    Incorrect username or password.
                </Alert>
            )}
            {inputUsername !== undefined && (
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputUsername}
                        placeholder="Username"
                        onChange={(e) => setInputUsername(e.target.value)}
                        required
                    />
                </Form.Group>
            )}
            <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={inputEmail}
                    placeholder="Email"
                    onChange={(e) => setInputEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={inputPassword}
                    placeholder="Password"
                    onChange={(e) => setInputPassword(e.target.value)}
                    required
                />
            </Form.Group>
            {location.pathname === '/login' && (
                <Form.Group className="mb-2" controlId="checkbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
            )}
            {!loading ? (
                <Button className="w-100 mt-2" variant="primary" type="submit">
                    {location.pathname === '/register' ? 'Register' : 'Log In'}
                </Button>
            ) : (
                <Button className="w-100 mt-2" variant="primary" type="submit" disabled>
                    {location.pathname === '/register' ? 'Registering...' : 'Logging In...'}
                </Button>
            )}
            {location.pathname !== '/register' && (
                <div className="d-grid justify-content-between">
                    <Button className="text-muted px-0" variant="link" onClick={handlePassword}>
                        Forgot password?
                    </Button>
                    <Button className="text-muted px-0" variant="link" onClick={() => navigate('/register')}>
                        Create an account
                    </Button>
                </div>
            )}
        </Form>
    );
};

export default Login;