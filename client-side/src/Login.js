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
    const [customer_id, setCustomer_id] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        console.log("i here in handleLogin");
        e.preventDefault();
        try {
            console.log('Sending login request:', { username, password });

            const response = await axios.post('http://localhost:3000/logIn', {
                user_name: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);

            if (response.data.user) {
                const userWithoutPassword = {
                    user_id: response.data.user.user_id,
                    user_name: response.data.user.user_name,
                    user_type: response.data.user.user_type
                };
                localStorage.setItem(response.data.user.user_name, JSON.stringify(userWithoutPassword)); // Save customerId to localStorage

                if (response.data.user.user_type === 'employee') {
                    navigate(`/EmployeeArea/${response.data.user.user_id}`);
                } else if (response.data.user.user_type === 'manager') {
                    navigate(`/ManagerArea/${response.data.user.user_id}`);
                } else {
                    const fetchUserDetails = async () => {
                        const id = response.data.user.user_id;
                        console.log("your id is " + id);
                        try {
                            console.log('axios.get:', `http://localhost:3000/customer-details/${id}`);
                            const response = await axios.get(`http://localhost:3000/customer-details/${id}`); // Replace with your actual endpoint
                            console.log("i succeeded", response.data);
                            setCustomer_id(response.data.customer.customer_id);
                            console.log("response.data.customer.customer_id", response.data.customer.customer_id);
                            localStorage.setItem(response.data.customer.customer_id, JSON.stringify(response.data.customer));
                            return response.data.customer.customer_id;
                        } catch (error) {
                            console.error('Error fetching user details:', error);
                        }
                    };

                    const fetchedCustomerId = await fetchUserDetails();
                    console.log("fetch succeeded", fetchedCustomerId);
                    console.log('Navigating to:', `/CustomerArea/${response.data.user.user_id}?customer_id=${fetchedCustomerId}`);
                    navigate(`/CustomerArea/${response.data.user.user_id}?customer_id=${fetchedCustomerId}`);
                }

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
