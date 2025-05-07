import React from 'react';
import { Link } from "react-router-dom";
import "./header.css";
import LOGO from "./photos/Logo.jpeg";

const Header = () => {
    return (
        <header>
            <div className="Header">
                <ul>
                    <li><Link to="/" className="link">Home</Link></li>
                    <li><Link to="/contact" className="link">Contact</Link></li>
                    <li><Link to="/qa" className="link">Q&A</Link></li>
                    <li><Link to="/Login" className="link">Login</Link></li>
                    <li><Link to="/Login" className="link">Logout</Link></li>
                    <li><img className="Logo" src={LOGO} alt="Logo" /></li>
                </ul>
            </div>
        </header>
    );
};
export default Header;
