import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import "./CustomerSideBar.css";
import Bell from "./photos/bell.png";
import { useParams,useLocation } from 'react-router-dom';
import axios from 'axios';

const CustomerSideBar =  (e) => {
    const navigate = useNavigate();
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const customer_id = queryParams.get('customer_id'); 
    const customer=JSON.parse(localStorage.getItem(customer_id));
    console.log("side bar id is"  ,id)
    console.log("ncustomer is",customer_id)
    const [showAlerts, setShowAlerts] = useState(false);
    const [alerts,setAlerts]=useState([])
    useEffect(() => {
        console.log("I am in customerOPINION");
        // const id = 1; // replace this with actual id from useParams or other source
        console.log("ID from params: " + id);
        console.log(`http://localhost:3001/customer-opinions/${customer_id}`);
        
        const fetchCustomerOpinions = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/customer-opinions/${customer_id}`);
                console.log(response.data.customerOpinions);
                 // Filter customer opinions where rating is not equal to 0
                const filteredAlerts = response.data.customerOpinions
                ? response.data.customerOpinions.filter((opinion) => !opinion.rating)
                : [];
                console.log(filteredAlerts);
                // Set the filtered alerts
                setAlerts(filteredAlerts);

                // Log the filtered alerts

                console.log(alerts)
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        fetchCustomerOpinions();
    }, []);

    // const alerts = await axios.get ()
    // [
    //     "You have a new message."
    // ];

    return (
        <header>
            <div className="CustomerSideBar">
                <p>Menu</p>
                <img className="Bell" src={Bell} alt="Bell" onClick={() => setShowAlerts(!showAlerts)} />
                {showAlerts && (
                    <div className="alerts">
                        {alerts.map((alert, index) => (
                            <p
                                key={index}
                                onClick={() => navigate(`/CustomerSurvey/${id}?customer_id=${customer.customer_id}&opinion_id=${alert.opinion_id}`)}
                                style={{ cursor: 'pointer' }} // Add a pointer cursor for better UX
                            >{alert.more}</p>

                        ))}
                    </div>
                )}
                <Link to={`/CustomerArea/${id}?customer_id=${customer.customer_id}`} className="link">Personal area</Link>
                <Link to={`/CustomerPersonalDetails/${id}?customer_id=${customer.customer_id}`} className="link">Personal details</Link>
                <Link to={`/CustomerAssetsDetails/${id}?customer_id=${customer.customer_id}`} className="link">Personal assets details</Link>
                <Link to={`/CustomerContact/${id}?customer_id=${customer.customer_id}`} className="link">Contact customer service</Link>
                <Link to={`/CustomerReports/${id}?customer_id=${customer.customer_id}`} className="link">Reports</Link>
            </div>
        </header>
    );
};

export default CustomerSideBar;
