// import clsx from 'clsx';
import { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    MenuItem,
    Box,
    Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Popover } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ModalForm from '../ModalForm';
import { userService, orderService } from '../../service/httpServices';
import { Search, SearchIconWrapper, StyledInputBase } from '../Search';
import GenreContent from '../GenreContent';
import useOrderState from '../../store/useOrderStore';
import { useModalState } from '../../store';
import { toast } from 'react-toastify';
const Header: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { orderItem, setOrderItem } = useOrderState();
    const { toggleShow } = useModalState();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                if (token) {
                    const [userData, orderData] = await Promise.all([userService.index(), orderService.getOrderItem()]);
                    // console.log({ userData, orderData });
                    setUser(userData);
                    setOrderItem(orderData);
                    setIsLogin(true);
                }
            } catch (error) {
                // if no data is fetch, get data from local storage
                console.error('Error fetching data:', {
                    status: error.code || 'unknown',
                    message: error.message || 'Unknown error',
                });
                setIsLogin(false);
            }
        };
        fetchData();
    }, [setOrderItem]);

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

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        try {
            if (confirm('Are you sure you want to logout?')) {
                handleCloseUserMenu();
                localStorage.removeItem('token');
                setIsLogin(false);
                navigate('/');
                toast.success('Logout successfully');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error logging out');
        }
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: 'flex', mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href=""
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                display: 'flex',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            BookStore
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            ></Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                News
                            </Button>
                            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Contact
                            </Button>
                            <Popover content={<GenreContent />} trigger="hover">
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Genre
                                </Button>
                            </Popover>
                            {/* 
                            <Search sx={{ my: 2, width: '100%', flexGrow: 0 }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                            </Search> */}
                        </Box>
                        <Box sx={{ mr: 2 }}>
                            <IconButton size="large" color="inherit" onClick={() => navigate('/cart')}>
                                <Badge
                                    badgeContent={orderItem && orderItem.books && orderItem.books.length}
                                    color="error"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                        {isLogin ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.username} src={user.avatar || 'https://i.pravatar.cc/300'} />
                                        <Typography sx={{ color: 'white', mx: 1 }}>hello {user.username}</Typography>
                                    </IconButton>
                                </Box>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={() => navigate('/account')}>
                                            Profile
                                        </Typography>
                                    </MenuItem>
                                    {user.isAdmin && (
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography
                                                textAlign="center"
                                                onClick={() => {
                                                    toggleShow();
                                                }}
                                            >
                                                Create new book
                                            </Typography>
                                        </MenuItem>
                                    )}

                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Button color="inherit" sx={{ color: 'white' }}>
                                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        Login
                                    </Link>
                                </Button>
                                <Button color="inherit" sx={{ color: 'white' }}>
                                    <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        Register
                                    </Link>
                                </Button>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <ModalForm />
        </>
    );
};

export default Header;
