import React from 'react';
import "./EmployeeArea.css";
import Header from "./header";
import Footer from "./footer";
import EmployeeSideBar from "./EmployeeSideBar";
const EmployeeArea = () => {
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
