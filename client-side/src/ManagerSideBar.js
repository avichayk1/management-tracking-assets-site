import React from 'react';
import { Link } from "react-router-dom";
import "./ManagerSideBar.css";
import { useParams ,useLocation} from 'react-router-dom';
import axios from 'axios';
const ManagerSideBar = () => {
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const manager_id = queryParams.get('manager_id'); 
    return (
        <header>
            <div className="CustomerSideBar">
                <ul>
                    <p>Menu</p>
                    <Link to={`/ManagerArea/${id}?manager_id=${manager_id}`} className="link">Personal area</Link>
                    <Link to={`/ManagerAvailableInventory/${id}?manager_id=${manager_id}`} className="link">Inventory: Available & Order</Link>
                    <Link to={`/ManagerCalendar/${id}?manager_id=${manager_id}`} className="link">Tasks & Calendar</Link>
                    <Link to={`/ManagerSurveyDistribution/${id}?manager_id=${manager_id}`} className="link">Survey distribution</Link>
                </ul>
            </div>
        </header>
    );
};
export default ManagerSideBar;