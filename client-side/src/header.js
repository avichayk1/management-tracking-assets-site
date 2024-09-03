import React from 'react';
import { Link } from "react-router-dom";
import "./header.css";
import LOGO from "./photos/Logo.jpeg";

const header = () => {
    return (
        <header>
            <div className="Header">
                <ul>
                    <Link to="/" className="link">Home</Link>
                    <Link to="/contact" className="link">Contact</Link>
                    <Link to="/qa" className="link">Q&A</Link>
                    <Link to="/Login" className="link">Login</Link>
                    <Link to="/Login" className="link">Logout</Link>
                    <img className="Logo" src={LOGO} alt="Logo"/>
                </ul>
            </div>
        </header>
    );
};
export default header;
