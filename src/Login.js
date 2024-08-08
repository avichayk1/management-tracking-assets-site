import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import Footer from "./footer";
import './Login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending login request:', { username, password });

            const response = await axios.post(`http://localhost:9124/login?username=${username}&password=${password}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data === true) {
                localStorage.setItem('customerId', username); // Save customerId to localStorage
                navigate('/CustomerArea');
            } else {
                setError('Invalid username or password, please try again');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Server error');
        }
    };

    return (
        <div className="main-container">
            <Header />
            <div className="body">
                <div className="grey">
                    <hr className="Login" />
                    <h589>Login to the personal area:</h589>
                    <form onSubmit={handleLogin}>
                        <label>Username:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <br />
                        <label>Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <br />
                        <button className="btn_enter" type="submit">Login</button>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
