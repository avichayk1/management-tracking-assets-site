import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import "./CustomerSideBar.css";
import Bell from "./photos/bell.png";
import { useParams,useLocation } from 'react-router-dom';
import axios from 'axios';
import LOGO from './photos/Logo.jpeg';
import { useUser } from './UserContext';
import './sideBar.css'; 
import { useTheme } from '@mui/material/styles';

import {
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Button,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const SideBar =  (e) => {
    const { isLogin, userType, setIsLogin } = useUser(); // הוספתי userType

    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false); // State for the navigation drawer
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false); // State for the alerts drawer

    const theme = useTheme(); // Access the theme object

    const navigate = useNavigate();
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    // const queryParams = new URLSearchParams(location.search);
    // const customer_id = queryParams.get('customer_id');
    const userId = isLogin ? new URLSearchParams(location.search).get(`${userType}_id`) : null;
    let user = null; 
    if (isLogin && userId) {
        user = JSON.parse(localStorage.getItem(userId));
    }
    const handleLogout = () => {
      setIsLogin(false); // שנה את ה-context ל-false
    };
    const sideBarLinks = {
        manager: [
          { to: `/ManagerArea/${id}?manager_id=${userId}`, label: 'Personal Area' },
          { to: `/ManagerAvailableInventory/${id}?manager_id=${userId}`, label: 'Inventory: Available & Order' },
          { to: `/ManagerCalendar/${id}?manager_id=${userId}`, label: 'Tasks & Calendar' },
          { to: `/ManagerSurveyDistribution/${id}?manager_id=${userId}`, label: 'Survey Distribution' },
        ],
        employee: [
          { to: `/EmployeeArea/${id}?employee_id=${userId}`, label: 'Personal Area' },
          { to: `/EmployeePersonalDetails/${id}?employee_id=${userId}`, label: 'Personal Details' },
          { to: `/AddingNewCustomer/${id}?employee_id=${userId}`, label: 'Add New Customer' },
          { to: `/EmployeeInventoryUpdate/${id}?employee_id=${userId}`, label: 'Inventory' },
          { to: `/EmployeeCalendar/${id}?employee_id=${userId}`, label: 'Calendar' },
        ],
        customer: [
          { to: `/CustomerArea/${id}?customer_id=${userId}`, label: 'Personal Area' },
          { to: `/CustomerPersonalDetails/${id}?customer_id=${userId}`,label:'Personal Details'},
          { to: `/CustomerAssetsDetails/${id}?customer_id=${userId}`, label: 'Assets' },
          { to: `/CustomerContact/${id}?customer_id=${userId}`,label:'Contact customer service'},
          { to:`/CustomerReports/${id}?customer_id=${userId}`,label:'Reports'},
          { to: `/CustomerSurvey/${id}?customer_id=${userId}`, label: 'Surveys' },
          { to: `/CustomerOpinions/${id}?customer_id=${userId}`, label: 'Feedback' },
        ],
      };
      
    const renderSideBarLinks = (userType) => {
    return sideBarLinks[userType]?.map((link, index) => (
      <>
        <ListItem key={index}>
        <Link
            to={link.to}
            className="link"
        >
            {link.label}
        </Link>
        </ListItem>
        {index !== sideBarLinks[userType]?.length - 1 && (
            <Divider sx={{ margin: '10px 0', borderBottomWidth: 2, borderColor: '#ccc' }} />
        )}
      </>


    ));
    };
    console.log("user_type is:",userType)
    console.log("side bar id is"  ,id)
    console.log("user_id is:",userId)
    // console.log("ncustomer is",customer_id)
    const [showAlerts, setShowAlerts] = useState(false);
    const [alerts,setAlerts]=useState([])

        // Function to toggle the navigation drawer's open state
    const toggleLeftDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        setLeftDrawerOpen(open);
    };

    // Function to toggle the alerts drawer's open state
    const toggleRightDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        setRightDrawerOpen(open);
    };
    useEffect(() => {
        if (!isLogin){
            console.log("User is not logged in or customer_id is missing, skipping API call.");
            return;
        }
        console.log("I am in customerOPINION");
        // const id = 1; // replace this with actual id from useParams or other source
        console.log("ID from params: " + id);
        console.log(`http://localhost:3001/customer-opinions/${userId}`);
        
        const fetchCustomerOpinions = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/customer-opinions/${userId}`);
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
    const HeaderNavigationLinks = (
        <Box
        sx={{
        display: 'flex',         // Use flexbox for layout
        alignItems: 'center',    // Center items vertically
        justifyContent: 'space-between', // Distribute space between items
        width: '100%',           // Full width of the container
        }}
        >
            <Link
            to="/"
            className="link"
            >
            Home
            </Link>
            <Link
            to="/contact"
            className="link"
            >
            Contact
            </Link>
            <Link
            to="/qa"
            className="link"
            >
            Q&A
            </Link>
            <Link
            to="/Login"
            className="link"
            style={{
                textDecoration: 'none',    // Remove underline
                color: '#fff',             // White color to match Typography
                fontSize: '2rem',          // Adjust font size
            }}
            onClick={() => isLogin && setIsLogin(false)}
            >
            {isLogin? 'Logout': 'Login'}
            </Link>
      </Box>
      );
   
      // Drawer content displaying alerts
      const alertsContent = (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleRightDrawer(false)}
          onKeyDown={toggleRightDrawer(false)}
        >
          <List>
            {alerts.map((alert, index) => (
              <ListItem key={index}>
                <ListItemText primary={alert} />
              </ListItem>
            ))}
          </List>
        </Box>
      );
    return (
        <header>
            <AppBar position="static"   sx={{
                  borderRadius: "10px",    // או כמה שאתה רוצה
                  }}>
                <Toolbar>
                {/* IconButton with Menu Icon that opens the Navigation Drawer */}
                {isLogin && (
                    <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            // sx={{ mr: 2 }}
                            onClick={toggleLeftDrawer(true)} // Opens the left drawer on click
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1,width: 280,mr:11 }}>
                        {userType.charAt(0).toUpperCase() + userType.slice(1)} Menu
                        </Typography>
                    </>
                )}
                {HeaderNavigationLinks}
                {/* IconButton with Bell Icon that opens the Alerts Drawer */}
                {isLogin && (
                    <>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="alerts"
                            onClick={toggleRightDrawer(true)} // Opens the right drawer on click
                        >
                            <img src={Bell} alt="Bell" style={{ width: '72px', height: '72px' }} />
                        </IconButton>
                    </>
                )}
                <img className="Logo" src={LOGO} alt="Logo" />


                </Toolbar>
            </AppBar>

            {/* Navigation Drawer (Left) */}
            <Drawer anchor="left" open={leftDrawerOpen} onClose={toggleLeftDrawer(false)}        sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: theme.palette.primary.main, // Set background color
                    position: 'fixed', // Fix the drawer in place
                    top: '130px', // Adjust based on AppBar height
                    height: 'calc(100% - 130px)', // Adjust height based on remaining space
                    overflow: 'auto', // Ensure scrolling if content overflows
                },
                }}>
                {renderSideBarLinks(userType)}
            </Drawer>
            
            {/* Alerts Drawer (Right) */}
            <Drawer anchor="right" open={rightDrawerOpen} onClose={toggleRightDrawer(false)}>
                {alertsContent}
            </Drawer>
                {/* <p>Menu</p>
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
                )} */}

        </header>
    );
};

export default SideBar;
