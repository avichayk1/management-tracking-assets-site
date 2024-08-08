import React from 'react';
import "./ManagerArea.css";
import Header from "./header";
import Footer from "./footer";
import ManagerSideBar from "./ManagerSideBar";
const ManagerArea = () => {
    return (
        <div className="ManagerAreabackground"> {/* Added a class to use for setting the background */}
            <Header/>
            <ManagerSideBar/>
            <div className="Text"> {/* Corrected the class assignment to className */}
                <h26>Welcome to your personal area!</h26>
                <p>We are happy to see you again.<br />
                    In this area, you can watch available Inventory, Make an inventory order,<br />
                    View financial information, and view/ edit/ add tasks.<br />
                </p>
            </div>
            <Footer/>
        </div>
    );
};
export default ManagerArea;
