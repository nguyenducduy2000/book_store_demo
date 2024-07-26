import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './scss/styles.scss';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { LoginLayout, MainLayout } from './Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import config from './Config';
import Cart from './Pages/Cart';
import BookView from './Pages/BookView';
import User from './Pages/User';
import Genre from './Pages/Genre';
import Checkout from './Pages/Checkout';

const App: React.FC = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Router>
                <Routes>
                    <Route
                        path={config.routes.home}
                        element={
                            <MainLayout>
                                <Home />
                            </MainLayout>
                        }
                    />
                    <Route
                        path={config.routes.login}
                        element={
                            <LoginLayout>
                                <Login />
                            </LoginLayout>
                        }
                    />
                    <Route
                        path={config.routes.register}
                        element={
                            <LoginLayout>
                                <Login />
                            </LoginLayout>
                        }
                    />
                    <Route
                        path={config.routes.cart}
                        element={
                            <MainLayout>
                                <Cart />
                            </MainLayout>
                        }
                    />
                    <Route
                        path={config.routes.bookView}
                        element={
                            <MainLayout>
                                <BookView />
                            </MainLayout>
                        }
                    />
                    <Route
                        path={config.routes.account}
                        element={
                            <MainLayout>
                                <User />
                            </MainLayout>
                        }
                    />
                    <Route
                        path={config.routes.genres}
                        element={
                            <MainLayout>
                                <Genre />
                            </MainLayout>
                        }
                    />
                    <Route
                        path={config.routes.checkout}
                        element={
                            <MainLayout>
                                <Checkout />
                            </MainLayout>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
};

export default App;
