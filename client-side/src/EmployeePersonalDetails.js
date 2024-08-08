import React, { useState } from 'react';
import './EmployeePersonalDetails.css';
import EmployeeSideBar from './EmployeeSideBar';
import Header from "./header";

const EmployeePersonalDetails = () => {
    const [employee, setEmployee] = useState({
        firstName: 'David',
        lastName: 'Cohen',
        phoneNumber: '054-984-2342',
        email: 'DavidC@move.com',
        address: 'Sderot Yaalim 98, Tel Aviv',
        idNumber: '205621414',
        employeeImage: 'default-Employee-image.jpg',
        isEditable: false
    });

    const [isImageUploaderOpen, setImageUploaderOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEmployee(prevState => ({ ...prevState, [id]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setEmployee(prevState => ({ ...prevState, employeeImage: e.target.result }));
        };
        reader.readAsDataURL(file);
    };

    const toggleEdit = () => {
        setEmployee(prev => ({ ...prev, isEditable: !prev.isEditable }));
        setMessage('');
    };

    const saveDetails = () => {
        setMessage('Details have been updated successfully!');
    };

    return (
        <div className="EmployeePersonalDetails">
            <Header/>
            <EmployeeSideBar />
            <div className="container2">
                <h43>Personal Information</h43> {/* Changed h43 to h1 for proper semantics */}
                <div id="EmployeeDetails">
                    <img id="EmployeeImage" src={employee.employeeImage} alt="Employee" />

                    <div className="button-container">
                        <button onClick={() => setImageUploaderOpen(!isImageUploaderOpen)}>Upload Image</button>
                        {isImageUploaderOpen && (
                            <input type="file" id="imageUploadInput" accept="image/*" onChange={handleImageChange} />
                        )}
                        <button onClick={toggleEdit}>{employee.isEditable ? 'Cancel Edit' : 'Update Details'}</button>
                        {employee.isEditable && <button onClick={saveDetails}>Save Changes</button>}
                    </div>
                    {message && <p>{message}</p>}

                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" value={employee.firstName} onChange={handleInputChange} disabled={!employee.isEditable} />

                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={employee.lastName} onChange={handleInputChange} disabled={!employee.isEditable} />

                    <label htmlFor="idNumber">ID Number:</label>
                    <input type="text" id="idNumber" value={employee.idNumber} disabled />

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" value={employee.phoneNumber} onChange={handleInputChange} disabled={!employee.isEditable} />

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" value={employee.email} onChange={handleInputChange} disabled={!employee.isEditable} />

                    <label htmlFor="address">Address:</label>
                    <textarea id="address" rows="4" value={employee.address} onChange={handleInputChange} disabled={!employee.isEditable}></textarea>
                </div>
            </div>
        </div>
    );
};

export default EmployeePersonalDetails;
