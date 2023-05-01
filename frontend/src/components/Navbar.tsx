import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
    isLoggedIn: boolean;
    currentRoom: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, currentRoom }) => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-brand">
                AppName
            </NavLink>
            <div className="navbar-links">
                <NavLink to="/rooms" className="navbar-link">
                    Rooms
                </NavLink>
                {currentRoom && (
                    <NavLink to={`/room/${currentRoom}`} className="navbar-link">
                        {currentRoom}
                    </NavLink>
                )}
                {isLoggedIn ? (
                    <NavLink to="/logout" className="navbar-link">
                        Logout
                    </NavLink>
                ) : (
                    <NavLink to="/login" className="navbar-link">
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;