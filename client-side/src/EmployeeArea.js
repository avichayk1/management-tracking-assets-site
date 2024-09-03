import "./EmployeeArea.css";
import Header from "./header";
import Footer from "./footer";
import EmployeeSideBar from "./EmployeeSideBar";
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';
const EmployeeArea = () => {
    console.log("i am in EmployeeArea")
    const {id}=useParams();
    console.log("employee id is: ",id)
    console.log("id from parms "+id)
    useEffect(() => {

        const fetchUserDetails = async () => {
            // const id = 3;
            console.log("your ikd is "+id)
            try {
                const response = await axios.get(`http://localhost:3001/employee-details/${id}`); // Replace with your actual endpoint
                console.log(response.data)
                localStorage.setItem(response.data.employee.employee_id, JSON.stringify(response.data.employee));
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);
    return (
        <div className="EmployeeAreabackground"> {/* Added a class to use for setting the background */}
            <Header/>
            <EmployeeSideBar/>
            <div className="App6"> {/* Corrected the class assignment to className */}
                <h1>Welcome to your personal area!</h1>
                <p9>We are happy to see you again.<br />
                    In this area, you can view you can view your alerts, view your personal information,<br />
                    Make an inventory updates, and view the Calendar.<br />
                </p9>
            </div>
            <Footer/>
        </div>
    );
};
export default EmployeeArea;
