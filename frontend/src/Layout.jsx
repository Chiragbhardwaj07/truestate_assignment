import React from 'react';
import Sidebar from './components/Sidebar';

function Layout({ children }) {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="app-main-content">
                {children}
            </div>
        </div>
    );
}

export default Layout;
