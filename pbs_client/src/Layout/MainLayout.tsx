import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import { LayoutRouteProps } from 'react-router-dom';

type LayoutProps = {
    children: React.ReactNode;
};
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="d-flex flex-fill flex-column">
            <Header />
            <div className="wrapper">{children}</div>
            <Footer />
        </div>
    );
};
export default MainLayout;
