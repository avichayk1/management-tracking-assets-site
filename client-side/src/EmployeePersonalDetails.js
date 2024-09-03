import React, { useState,useEffect } from 'react';
import './EmployeePersonalDetails.css';
import EmployeeSideBar from './EmployeeSideBar';
import Header from "./header";
import { useParams,useLocation } from 'react-router-dom';
import axios from 'axios';

const EmployeePersonalDetails = () => {
    console.log("EmployeePersonalDetails")
    const { id } = useParams();
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const employee_id = queryParams.get('employee_id'); 
    console.log("employee_id is:",employee_id)
    const storedEmployee = JSON.parse(localStorage.getItem(employee_id));        
    console.log("i am in EmployeePersonalDetails id is:" , employee_id)

    const [employee, setEmployee] = useState({
        employee_f_name: "",
        employee_l_name: "",
        employee_phone: "",
        employee_mail: "",
        employee_adress: "",
        employee_id: "",
        employee_team: "",
        customerImage: 'default-customer-image.jpg',
        isEditable: false
    });

    const [isImageUploaderOpen, setImageUploaderOpen] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        console.log("i am in EmployeePersonalDetails id is:" , id)
        console.log('storedEmployee  ', storedEmployee)
        if (storedEmployee) {
            setEmployee({
                employee_f_name: storedEmployee.employee_f_name,
                employee_l_name: storedEmployee.employee_l_name,
                employee_phone: storedEmployee.employee_phone,
                employee_mail: storedEmployee.employee_mail,
                employee_adress: storedEmployee.employee_adress,
                employee_id: storedEmployee.employee_id,
                employee_team: storedEmployee.employee_team,
                customerImage: 'default-customer-image.jpg',
                isEditable: false
            });
        }
    }, []);
    // const handleInputChange = (e) => {
    //     const { id, value } = e.target;
    //     setEmployee(prevState => ({ ...prevState, [id]: value }));
    // };

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

    const saveDetails = async (e) => {
        const updatedEmployee = {
            employee_f_name: employee.employee_f_name,
            employee_l_name: employee.employee_l_name,
            employee_id: employee.employee_id,
            employee_phone: employee.employee_phone,
            employee_mail: employee.employee_mail,
            employee_adress: employee.employee_adress
        };
        try {
            const response = await axios.put(`http://localhost:3001/updateEmployee/${employee.employee_id}`, updatedEmployee, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Update employee successfuly")
            const { message } = response.data;
            setMessage(message);
            // setError('')
        } catch (error) {
            console.error('Error during update:', error);
            // setError('Server error');
        }
        setMessage('Details have been updated successfully!');
    };

    return (
        <div className="EmployeePersonalDetails">
            <Header/>
            <EmployeeSideBar />
            <div className="container2">
                <h1>Personal Information</h1> {/* Changed h43 to h1 for proper semantics */}
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
                    <input type="text" id="firstName" value={employee.employee_f_name} onChange={(e)=>setEmployee({...employee, employee_f_name: e.target.value})} disabled={!employee.isEditable} />

                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={employee.employee_l_name}onChange={(e)=>setEmployee({...employee, employee_l_name: e.target.value})} disabled={!employee.isEditable} />

                    <label htmlFor="idNumber">ID Number:</label>
                    <input type="text" id="idNumber" value={employee.employee_id} disabled />

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" value={employee.employee_phone} onChange={(e)=>setEmployee({...employee, employee_phone: e.target.value})} disabled={!employee.isEditable} />

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" value={employee.employee_mail} onChange={(e)=>setEmployee({...employee, employee_mail: e.target.value})} disabled={!employee.isEditable} />

                    <label htmlFor="address">Address:</label>
                    <textarea id="address" rows="4" value={employee.employee_adress} onChange={(e)=>setEmployee({...employee, employee_adress: e.target.value})} disabled={!employee.isEditable}></textarea>
                </div>
            </div>
        </div>
    );
};

export default EmployeePersonalDetails;
