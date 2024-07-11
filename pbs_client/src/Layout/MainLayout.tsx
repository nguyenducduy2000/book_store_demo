import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import { LayoutRouteProps } from 'react-router-dom';

type LayoutProps = {
    children: React.ReactNode;
};
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="wrapper">{children}</div>
            <Footer />
        </>
    );
};
export default MainLayout;
