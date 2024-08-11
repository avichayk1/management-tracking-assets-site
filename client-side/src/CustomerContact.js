import React, { useState,useEffect } from 'react';
import './CustomerContact.css';
import Header from "./header";
import Footer from "./footer";
import CustomerSideBar from "./CustomerSideBar";
import axios from 'axios';
import { useParams ,useLocation } from 'react-router-dom';
const CustomerContact = () => {
    const [formData, setFormData] = useState({
        // fullName: '',
        // email: '',
        // phone: '',
        // message: '',
        // requestCall: false,
        // requestReport: false,
        // requestBid: false,
        // file: null
    });
    const location = useLocation(); // Access the location object
        
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const customer_id = queryParams.get('customer_id'); 
    const [submitSuccess, setSubmitSuccess] = useState(false);
    // const {id}=useParams();
    // console.log("const {customerId}=useParams(): " + id);
    const [{id},setId]=useState(useParams())
    console.log("const [{id},setId]=useState(useParams()): " + id);
    useEffect(() => {
        console.log("I am in CustomerContact");
        // const { id } = useParams();
        console.log("ID from params: " + id);
        console.log(`http://localhost:3000/CustomerContact/${customer_id}`);
        
        const fetchAssets = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/customer-contact/${customer_id}`);
                console.log(response.data);
                const contact  = response.data.customer_contact ? [response.data.customer_contact[0]] : [];
                console.log("contact", contact);
                    // Create a new object with the additional properties
                const updatedContact = {
                    ...contact[0],
                    requestReport: false,
                    requestBid: false
                };
                console.log("newContact", updatedContact);
                setFormData(updatedContact);
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        fetchAssets();
    }, []);

    useEffect(() => {
        console.log("formData updated", formData);
    }, [formData]);
    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const validateForm = () => {
        if (!formData.fullName || !formData.email.includes('@') || formData.phone.length > 13 || !formData.message) {
            alert('Please fill out the form correctly.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            try {
                console.log('Sending form data:', formDataToSend);
                const response = await fetch('http://localhost:9124/contact', {
                    method: 'POST',
                    body: formDataToSend
                });

                if (response.ok) {
                    setSubmitSuccess(true);
                    console.log('Form data submitted successfully');
                } else {
                    console.error('Form submission failed', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error submitting the form:', error);
            }
        }
    };

    return (
        <div className="customer-contact">
            <Header />
            <h3>Please fill the following form:</h3>

            <CustomerSideBar />

            <div className="form">
                <form onSubmit={handleSubmit}>
                    <label>
                        Full name:
                        <input type="text" name="fullName" value={formData.full_name} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.customer_mail} onChange={handleChange} />
                    </label>
                    <label>
                        Telephone:
                        <input type="text" name="phone" value={formData.customer_phone} onChange={handleChange} />
                    </label>
                    <label>
                        Message:
                        <textarea name="message" value={formData.message} onChange={handleChange} />
                    </label>
                    <label>
                        Request for a phone call:
                        <input type="checkbox" name="requestCall" checked={formData.requestCall} onChange={handleChange} />
                    </label>
                    <label>
                        Request to update a bid:
                        <input type="checkbox" name="requestBid" checked={formData.requestBid} onChange={handleChange} />
                    </label>
                    <label>
                        Request for a new financial report:
                        <input type="checkbox" name="requestReport" checked={formData.requestReport} onChange={handleChange} />
                    </label>
                    <label>
                        Upload a file:
                        <input type="file" name="file" onChange={handleChange} />
                    </label>
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className="message">
                {submitSuccess && <p>The request has been sent successfully.</p>}
            </div>
            <Footer />
        </div>
    );
};

export default CustomerContact;
