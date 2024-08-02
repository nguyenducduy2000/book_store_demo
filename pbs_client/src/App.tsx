import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './scss/styles.scss';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { AppRoutes } from './Config';
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
                    {AppRoutes.map((route, index) => {
                        const Page = route.component;
                        const AppLayout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AppLayout>
                                        <Page />
                                    </AppLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </>
    );
};

export default App;
