import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./CustomerSideBar.css";
import Bell from "./photos/bell.png";
import { useParams,useLocation } from 'react-router-dom';

const CustomerSideBar = () => {
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const customer_id = queryParams.get('customer_id'); 
    const customer=JSON.parse(localStorage.getItem(customer_id));
    console.log("side bar id is"  ,id)
    console.log("ncustomer is",customer_id)
    const [showAlerts, setShowAlerts] = useState(false);
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
                        <Link to={`/CustomerArea/${id}?customer_id=${customer.customer_id}`} className="link">Personal area</Link>
                        <Link to={`/CustomerPersonalDetails/${id}?customer_id=${customer.customer_id}`} className="link">Personal details</Link>
                        <Link to={`/CustomerAssetsDetails/${id}?customer_id=${customer.customer_id}`} className="link">Personal assets details</Link>
                        <Link to={`/CustomerContact/${id}?customer_id=${customer.customer_id}`} className="link">Contact customer service</Link>
                        <Link to={`/CustomerReports/${id}?customer_id=${customer.customer_id}`} className="link">Reports</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default CustomerSideBar;
