import React, { useState } from 'react';
import './AddingNewCustomer.css';
import Header from './header'; // Ensure paths are correct
import EmployeeSideBar from './EmployeeSideBar';

const AddingNewCustomer = () => {
    const [isOpen, setIsOpen] = useState({
        personalDetails: false,
        addProperties: false,
        websiteDetails: false
    });

    const toggleAccordion = section => {
        setIsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const register = () => {
        alert('Client successfully registered!');

    };

    return (
        <div className="AddingNewCustomer">
            <Header />
            <EmployeeSideBar />
            <div className="container789">
                <h1>Registration Form</h1>
                <button className={`accordion ${isOpen.personalDetails ? 'active' : ''}`}
                        onClick={() => toggleAccordion('personalDetails')}>
                    Personal Details
                </button>
                <div className="panel" style={{ display: isOpen.personalDetails ? 'block' : 'none' }}>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="text" placeholder="ID" />
                    <input type="tel" placeholder="Phone Number" />
                    <input type="email" placeholder="Email Address" />

                </div>

                <button className={`accordion ${isOpen.addProperties ? 'active' : ''}`}
                        onClick={() => toggleAccordion('addProperties')}>
                    Asset Details
                </button>
                <div className="panel" style={{ display: isOpen.addProperties ? 'block' : 'none' }}>
                    <input type="text" placeholder="Asset Address" />
                    <input type="text" placeholder="Asset Number" />
                    <input type="text" placeholder="District" />
                    <input type="text" placeholder="Responsible Team" />
                    <input type="text" placeholder="Treatment Type" />
                    <input type="text" placeholder="Estimated Cost" />
                    <input type="text" placeholder="Registration Date" />
                    <input type="text" placeholder="End Date" />
                    <input type="number" placeholder="Size" />
                    <input type="text" placeholder="Summaries" />
                </div>

                <button className={`accordion ${isOpen.websiteDetails ? 'active' : ''}`}
                        onClick={() => toggleAccordion('websiteDetails')}>
                    Website Details
                </button>
                <div className="panel" style={{ display: isOpen.websiteDetails ? 'block' : 'none' }}>
                    <input type="password" placeholder="Password" />
                </div>

                <button className="register-btn" onClick={register}>Register Client</button>
            </div>
        </div>

    );
};

export default AddingNewCustomer;
