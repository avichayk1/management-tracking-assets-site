import React, { useState, useEffect } from 'react';
import './CustomerPersonalDetails.css';
import CustomerSideBar from './CustomerSideBar';
import Header from "./header";
import { useParams ,useLocation} from 'react-router-dom';
import axios from 'axios';

const CustomerPersonalDetails = () => {
    const { id } = useParams();
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const customer_id = queryParams.get('customer_id'); 
    console.log("CustomerPersonalDetails ",customer_id )
    const storedCustomer = JSON.parse(localStorage.getItem(customer_id));

    const [customer, setCustomer] = useState({
        customer_f_name: '',
        customer_l_name: '',
        customer_phone: '',
        customer_mail: '',
        customer_adress: '',
        customer_id: '',
        customerImage: 'default-customer-image.jpg',
        isEditable: false
    });

    useEffect(() => {
        if (storedCustomer) {
            setCustomer({
                customer_f_name: storedCustomer.customer_f_name,
                customer_l_name: storedCustomer.customer_l_name,
                customer_phone: storedCustomer.customer_phone,
                customer_mail: storedCustomer.customer_mail,
                customer_adress: storedCustomer.customer_adress,
                customer_id: storedCustomer.customer_id,
                customerImage: 'default-customer-image.jpg',
                isEditable: false
            });
        }
    }, []);

    const [isImageUploaderOpen, setImageUploaderOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setCustomer(prevState => ({ ...prevState, customerImage: e.target.result }));
        };
        reader.readAsDataURL(file);
    };

    const toggleEdit = () => {
        setCustomer(prev => ({ ...prev, isEditable: !prev.isEditable }));
        setMessage('');
    };

    const saveDetails = async (e) => {
        e.preventDefault();
    
        const updatedCustomer = {
            customer_f_name: customer.customer_f_name,
            customer_l_name: customer.customer_l_name,
            customer_id: customer.customer_id,
            customer_phone: customer.customer_phone,
            customer_mail: customer.customer_mail,
            customer_adress: customer.customer_adress
        };
    
        try {
            const response = await axios.put(`http://localhost:3001/updateCustomer/${customer.customer_id}`, updatedCustomer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Update customer successfuly")
            const { message } = response.data;
            setMessage(message);
            setError('')
        } catch (error) {
            console.error('Error during update:', error);
            setError('Server error');
        }
    };

    return (
        <div className="CustomerPersonalDetails">
            <Header />
            <CustomerSideBar />
            <div className="container2">
                <h1>Personal Information</h1>
                <div id="customerDetails">
                    <img id="customerImage" src={customer.customerImage} alt="Customer" />

                    <div className="button-container">
                        <button onClick={() => setImageUploaderOpen(!isImageUploaderOpen)}>Upload Image</button>
                        {isImageUploaderOpen && (
                            <input type="file" id="imageUploadInput" accept="image/*" onChange={handleImageChange} />
                        )}
                        <button onClick={toggleEdit}>{customer.isEditable ? 'Cancel Edit' : 'Update Details'}</button>
                        {customer.isEditable && <button onClick={saveDetails}>Save Changes</button>}
                    </div>
                    {message && <p>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={customer.customer_f_name}
                        disabled={!customer.isEditable}
                        onChange={(e) => setCustomer({ ...customer, customer_f_name: e.target.value })}
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={customer.customer_l_name}
                        disabled={!customer.isEditable}
                        onChange={(e) => setCustomer({ ...customer, customer_l_name: e.target.value })}
                    />

                    <label htmlFor="idNumber">ID Number:</label>
                    <input
                        type="text"
                        id="idNumber"
                        value={customer.customer_id}
                        disabled
                    />

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={customer.customer_phone}
                        disabled={!customer.isEditable}
                        onChange={(e) => setCustomer({ ...customer, customer_phone: e.target.value })}
                    />

                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={customer.customer_mail}
                        disabled={!customer.isEditable}
                        onChange={(e) => setCustomer({ ...customer, customer_mail: e.target.value })}
                    />

                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        rows="4"
                        value={customer.customer_adress}
                        disabled={!customer.isEditable}
                        onChange={(e) => setCustomer({ ...customer, customer_adress: e.target.value })}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default CustomerPersonalDetails;
