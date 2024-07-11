import React from 'react';
// import { LayoutRouteProps } from 'react-router-dom';

type LayoutProps = {
    children: React.ReactNode;
};

const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="wrapper">{children}</div>
        </>
    );
};

export default LoginLayout;
