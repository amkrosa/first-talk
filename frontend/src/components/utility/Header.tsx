import React from 'react';
import './Header.css';

const Header: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = ({children}) => {
    return (
        <header className="header">
            <h1>{children}</h1>
        </header>
    );
}

export default Header;