import React from 'react';
import "./CustomerReports.css";
import Header from "./header";
import CustomerSideBar from "./CustomerSideBar";
import {Link} from "react-router-dom";
import CustomerContact from "./CustomerContact";
const CustomerReports = () => {
    return (
        <div className="background3"> {/* Added a class to use for setting the background */}
            <Header/>
            <CustomerSideBar/>
            <div className="App"> {/* Corrected the class assignment to className */}
                <h9>Dear client,</h9>
                <p>No relevant report was found to display for you.<br />
                    If you are interested in receiving a report,<br />
                    you can create a new customer service request.<br />
                    <Link to="/CustomerContact" className="link">Contact</Link>
                </p>
            </div>
        </div>
    );
};
export default CustomerReports;
