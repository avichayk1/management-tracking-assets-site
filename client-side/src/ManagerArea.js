import React from 'react';
import "./ManagerArea.css";
import Header from "./header";
import Footer from "./footer";
import ManagerSideBar from "./ManagerSideBar";
import { useParams ,useLocation} from 'react-router-dom';

const ManagerArea = () => {
    console.log("i am in ManagerArea")
    const {id}=useParams();
    console.log("id from parms "+id)
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const manager_id = queryParams.get('manager_id'); 
    console.log("manager_id from quary "+manager_id)
   
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
