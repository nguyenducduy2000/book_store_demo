import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';

import './App.css';
import { LoginLayout, MainLayout } from './Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import config from './Config';

const App: React.FC = () => {
    return (
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
            </Routes>
        </Router>
    );
};

export default App;
