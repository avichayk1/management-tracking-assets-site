import React, { useState } from 'react';
import './AddingNewCustomer.css';
import Header from './header'; // Ensure paths are correct
import EmployeeSideBar from './EmployeeSideBar';
import axios from 'axios';
import { useParams ,useLocation} from 'react-router-dom';

const AddingNewCustomer = () => {
    console.log("EmployeePersonalDetails")
    const { id } = useParams();
    const [message, setMessage] = useState('');

    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const employee_id = queryParams.get('employee_id'); 
    console.log("employee_id is:",employee_id)
    const storedEmployee = JSON.parse(localStorage.getItem(employee_id));        
    console.log("i am in AddingNewCustomer id is:" , employee_id)
    const [isOpen, setIsOpen] = useState({
        personalDetails: false,
        addProperties: false,
        websiteDetails: false
    });

    const [customer_personal_details, setCustomer_personal_details] = useState({
        customer_f_name: '',
        customer_l_name: '',
        customer_phone: '',
        customer_mail: '',
        customer_adress: '',
        customer_id: '',
        customerImage: 'default-customer-image.jpg',
    });

    const [customer_asset,setCustomer_asset]=useState({
        asset_adress:'',
        asset_district:'',
        asset_path:'',
        asset_cost:'',
        ending_date:'',
        team:'',
        size:'',
    })
    const [user,setUser]=useState({
        user_name:'',
        user_password:''
    })
    const toggleAccordion = section => {
        setIsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const register = async (e) => {
        e.preventDefault();
        const updatedData = {
            customer_personal_details: customer_personal_details,
            customer_asset: customer_asset,
            user: user
        };
        console.log("updatedData ", updatedData)
        try {
            console.log(`http://localhost:3000/registerCustomer/${storedEmployee.employee_id}`)
            const response = await axios.put(`http://localhost:3000/registerCustomer/${storedEmployee.employee_id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Register customer successfuly")
            const { message } = response.data;
            setMessage(message);
            // setError('')
        } catch (error) {
            console.error('Error during update:', error);
            // setError('Server error');
        }
        alert('Client successfully registered!');

    };

    return (
        <div className="AddingNewCustomer">
            <Header />
            <EmployeeSideBar />
            <div className="container789">
                <h1>Registration Form</h1>
                <button className={`accordion ${isOpen.personalDetails ? 'active' : ''}`}
                        onClick={() => toggleAccordion('personalDetails')}>
                    Personal Details
                </button>
                <div className="panel" style={{ display: isOpen.personalDetails ? 'block' : 'none' }}>
                    <input type="text" placeholder="First Name"  
                        id="First Name"
                        value={customer_personal_details.customer_f_name}
                        onChange={(e) => setCustomer_personal_details({ ...customer_personal_details, customer_f_name: e.target.value })}
                    />
                    <input type="text" placeholder="Last Name"
                        id="lastName"
                        value={customer_personal_details.customer_l_name}
                        onChange={(e) => setCustomer_personal_details({ ...customer_personal_details, customer_l_name: e.target.value })}
                    />
                    <input type="text" placeholder="ID"
                        id="ID"
                        value={customer_personal_details.customer_id}
                        onChange={(e) => setCustomer_personal_details({ ...customer_personal_details, customer_id: e.target.value })}
                    />
                    <input type="tel" placeholder="Phone Number"
                        id="phone"
                        value={customer_personal_details.customer_phone}
                        onChange={(e) => setCustomer_personal_details({ ...customer_personal_details, customer_phone: e.target.value })}
                    />
                    <input type="email" placeholder="Email Address"
                         id="email"
                         value={customer_personal_details.customer_mail}
                         onChange={(e) => setCustomer_personal_details({ ...customer_personal_details, customer_mail: e.target.value })}
                      />

                </div>

                <button className={`accordion ${isOpen.addProperties ? 'active' : ''}`}
                        onClick={() => toggleAccordion('addProperties')}>
                    Asset Details
                </button>
                <div className="panel" style={{ display: isOpen.addProperties ? 'block' : 'none' }}>
                    <input type="text" placeholder="Asset Address" 
                         id="address"
                         value={customer_asset.asset_adress}
                         onChange={(e) => setCustomer_asset({ ...customer_asset, asset_adress: e.target.value })}
                     />
                    <input type="text" placeholder="Asset Number" />
                    <input type="text" placeholder="District" 
                     id="district"
                     value={customer_asset.asset_district}
                     onChange={(e) => setCustomer_asset({ ...customer_asset, asset_district: e.target.value })}
                 />
                    <input type="text" placeholder="Responsible Team"
                     id="team"
                     value={customer_asset.team}
                     onChange={(e) => setCustomer_asset({ ...customer_asset, team: e.target.value })}
                  />
                    <input type="text" placeholder="Treatment Type" />
                    <input type="text" placeholder="Estimated Cost" 
                     id="cost"
                     value={customer_asset.asset_cost}
                     onChange={(e) => setCustomer_asset({ ...customer_asset, asset_cost: e.target.value })}
                 />
                    <input type="text" placeholder="Registration Date" />
                    <input type="text" placeholder="End Date" 
                     id="end_date"
                     value={customer_asset.ending_date}
                     onChange={(e) => setCustomer_asset({ ...customer_asset, ending_date: e.target.value })}
                 />
                    <input type="number" placeholder="Size" 
                     id="size"
                     value={customer_asset.size}
                     onChange={(e) => setCustomer_asset({ ...customer_asset, size: e.target.value })}
                 />
                    <input type="text" placeholder="Summaries" />
                </div>

                <button className={`accordion ${isOpen.websiteDetails ? 'active' : ''}`}
                        onClick={() => toggleAccordion('websiteDetails')}>
                    Website Details
                </button>
                <div className="panel" style={{ display: isOpen.websiteDetails ? 'block' : 'none' }}>
                <input type="text" placeholder="User name" 
                     id="user_name"
                     value={user.user_name}
                     onChange={(e) => setUser({...user ,user_name: e.target.value})}
                 />
                    <input type="password" placeholder="Password" 
                     id="password"
                     value={user.user_password}
                     onChange={(e) => setUser({...user ,user_password: e.target.value})}
                 />
                </div>

                <button className="register-btn" onClick={register}>Register Client</button>
            </div>
        </div>

    );
};

export default AddingNewCustomer;
