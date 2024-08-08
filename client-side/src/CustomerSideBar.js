import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./CustomerSideBar.css";
import Bell from "./photos/bell.png";
import { useParams } from 'react-router-dom';

const CustomerSideBar = () => {
    const {id}=useParams();
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
                        <Link to={`/CustomerArea/${id}`} className="link">Personal area</Link>
                        <Link to={`/CustomerPersonalDetails/${id}`} className="link">Personal details</Link>
                        <Link to={`/CustomerAssetsDetails/${id}`} className="link">Personal assets details</Link>
                        <Link to={`/CustomerContact/${id}`} className="link">Contact customer service</Link>
                        <Link to={`/CustomerReports/${id}`} className="link">Reports</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default CustomerSideBar;
