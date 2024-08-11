import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./EmployeeSideBar.css";
import Bell from "./photos/bell.png";
import AddingNewCustomer from "./AddingNewCustomer";
import { useParams } from 'react-router-dom';

const EmployeeSideBar = () => {
    const [showAlerts, setShowAlerts] = useState(false);
    const {id}=useParams();
    const alerts = [
        "You have a new message."
    ];
    return (
        <header>
            <div className="CustomerSideBar">
                <ul>
                    <li>
                        <p>Menu</p>
                        <img className="Bell" src={Bell} alt="Bell" onClick={() => setShowAlerts(!showAlerts)} />
                        {showAlerts && (
                            <div className="alerts">
                                {alerts.map((alert, index) => (
                                    <p key={index}>{alert}</p>
                                ))}
                            </div>
                        )}
                        <Link to={`/EmployeeArea/${id}`} className="link">Personal area</Link>
                        <Link to={`/EmployeePersonalDetails/${id}`} className="link">Personal details</Link>
                        <Link to={`/AddingNewCustomer/${id}`} className="link">Add New Customer</Link>
                        <Link to={`/EmployeeInventoryUpdate/${id}`} className="link">Inventory</Link>
                        <Link to={`/EmployeeCalendar/${id}`} className="link">Calendar</Link>
                        <Link to={`/EmployeeContact/${id}`} className="link">Contact info</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};
export default EmployeeSideBar;