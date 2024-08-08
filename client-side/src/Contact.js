import React, { useState } from 'react';
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";
import './Contact.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        message: ''
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending contact form:', formData);
            const response = await axios.post('http://localhost:9124/contact', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Your message has been sent!');
                setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    message: ''
                });
            } else {
                setError('Failed to send message, please try again');
            }
        } catch (error) {
            console.error('Error during sending message:', error);
            setError('Failed to send message, please try again');
        }
    };

    return (
        <div className="Contact-background">
            <Header />
            <div className="Melal">
                <h77>How can you contact us?</h77>
                <p>We will be happy to provide a service for you, in the way you choose. <br />
                    You can send us an email: help@move.co.il<br />
                    You can call us: 03-7461940<br />
                    You can send us a message on our social networks accounts: Instagram, Facebook and Twitter - "Move" <br />
                    Or alternatively, fill in your details in the following form and we will contact you:<br />
                </p>
                <form onSubmit={handleSubmit} className="contact-form">
                    <label>
                        Full name:
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    </label>
                    <label>
                        Phone:
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                        Message:
                        <textarea name="message" value={formData.message} onChange={handleChange} />
                    </label>
                    <button type="submit">Send</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;
