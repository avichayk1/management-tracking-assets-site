import "./CustomerArea.css";
import Header from "./header";
import Footer from "./footer";
import CustomerSideBar from "./CustomerSideBar";
import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams ,useLocation} from 'react-router-dom';


const CustomerArea = () => {
    console.log("i am in CustomerArea")
    const {id}=useParams();
    console.log("id from parms "+id)
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const customer_id = queryParams.get('customer_id'); 
    console.log("customer_id from quary "+customer_id)
   
    // useEffect(() => {
    //     console.log("heeeeeeeeeeeey")
    //     const fetchUserDetails = async () => {
    //         // const id = 3;
    //         console.log("your ikd is "+id)
    //         try {
    //             const response = await axios.get(`http://localhost:3000/customer-details/${customer_id}`); // Replace with your actual endpoint
    //             console.log(response.data)
    //             localStorage.setItem(response.data.customer.customer_id, JSON.stringify(response.data.customer));
    //         } catch (error) {
    //             console.error('Error fetching user details:', error);
    //         }
    //     };
    //     fetchUserDetails();
    // }, []);
    return (
        <div className="backgroundd"> {/* Added a class to use for setting the background */}
            <Header />
            <CustomerSideBar />
            <div className="App2"> {/* Corrected the class assignment to className */}
                <h6>Welcome to the personal area!</h6>
                <p>
                    We are happy to see you again.<br />
                    In this area, you can view your alerts, your personal information, your assets information,<br />
                    and contact customer service.<br />
                    We are available for you at any time, and hope you are satisfied with the service.<br />
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default CustomerArea;
