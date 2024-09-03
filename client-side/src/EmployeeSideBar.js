import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import "./EmployeeSideBar.css";
import Bell from "./photos/bell.png";
import Facebook from "./photos/Facebook.png";

import AddingNewCustomer from "./AddingNewCustomer";
import { useParams ,useLocation} from 'react-router-dom';
const EmployeeSideBar = () => {
    const [showAlerts, setShowAlerts] = useState(false);
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const employee_id = queryParams.get('employee_id'); 
    const alerts = [
        "You have a new message."
    ];
    return (
        <header>
            <div className="CustomerSideBar">
                <p>Menu</p>
                <img className="Bell" src={Bell} alt="Bell" onClick={() => setShowAlerts(!showAlerts)} />
                {showAlerts && (
                    <div className="alerts">
                        {alerts.map((alert, index) => (
                            <p key={index}>{alert}</p>
                        ))}
                    </div>
                )}
                <Link to={`/EmployeeArea/${id}?employee_id=${employee_id}`} className="link">Personal area</Link>
                <Link to={`/EmployeePersonalDetails/${id}?employee_id=${employee_id}`} className="link">Personal details</Link>
                <Link to={`/AddingNewCustomer/${id}?employee_id=${employee_id}`} className="link">Add New Customer</Link>
                <Link to={`/EmployeeInventoryUpdate/${id}?employee_id=${employee_id}`} className="link">Inventory</Link>
                <Link to={`/EmployeeCalendar/${id}?employee_id=${employee_id}`} className="link">Calendar</Link>
                <Link to={`/EmployeeContact/${id}?employee_id=${employee_id}`} className="link">Contact info</Link>
            </div>
        </header>
    );
};
export default EmployeeSideBar;