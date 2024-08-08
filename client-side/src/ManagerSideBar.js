import React from 'react';
import { Link } from "react-router-dom";
import "./ManagerSideBar.css";

const ManagerSideBar = () => {
    return (
        <header>
            <div className="CustomerSideBar">
                <ul>
                    <p>Menu</p>
                    <Link to="/ManagerArea" className="link">Personal area</Link>
                    <Link to="/ManagerAvailableInventory" className="link">Inventory: Available & Order</Link>
                    <Link to="/ManagerCalendar" className="link">Tasks & Calendar</Link>
                    <Link to="/ManagerSurveyDistribution" className="link">Survey distribution</Link>
                </ul>
            </div>
        </header>
    );
};
export default ManagerSideBar;