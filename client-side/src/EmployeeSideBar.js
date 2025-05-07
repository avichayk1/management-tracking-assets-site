import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
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
import Bell from './photos/bell.png';
import LOGO from './photos/Logo.jpeg';
import './EmployeeSideBar.css';
import Header from './header';

const EmployeeSideBar = () => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false); // State for the navigation drawer
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false); // State for the alerts drawer
  const theme = useTheme(); // Access the theme object

  const { id } = useParams(); // Get parameters from the URL
  const location = useLocation(); // Access the current location object

  // Parse the query parameters to get employee_id
  const queryParams = new URLSearchParams(location.search);
  const employee_id = queryParams.get('employee_id');

  // Sample alerts to display
  const alerts = ['You have a new message.'];

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
  // const HeaderNavigationLinks = (
  //   <Box
  //   sx={{
  //   display: 'flex',         // Use flexbox for layout
  //   alignItems: 'center',    // Center items vertically
  //   justifyContent: 'space-between', // Distribute space between items
  //   width: '100%',           // Full width of the container
  //   padding: 1,              // Add padding if needed
  //   }}
  //   >
  //       <Link
  //       to="/"
  //       className="link"
  //       style={{
  //           textDecoration: 'none',    // Remove underline
  //           color: '#fff',             // White color to match Typography
  //           fontSize: '2rem',          // Adjust font size
  //           marginRight: '4px',       // Space between links
  //       }}
  //       >
  //       Home
  //       </Link>
  //       <Link
  //       to="/contact"
  //       className="link"
  //       style={{
  //           textDecoration: 'none',    // Remove underline
  //           color: '#fff',             // White color to match Typography
  //           fontSize: '2rem',          // Adjust font size
  //       }}
  //       >
  //       Contact
  //       </Link>
  //       <Link
  //       to="/qa"
  //       className="link"
  //       style={{
  //           textDecoration: 'none',    // Remove underline
  //           color: '#fff',             // White color to match Typography
  //           fontSize: '2rem',          // Adjust font size
  //       }}
  //       >
  //       Q&A
  //       </Link>
  //       <Link
  //       to="/Login"
  //       className="link"
  //       style={{
  //           textDecoration: 'none',    // Remove underline
  //           color: '#fff',             // White color to match Typography
  //           fontSize: '2rem',          // Adjust font size
  //       }}
  //       >
  //       Logout
  //       </Link>
  // </Box>
  // );
  // Drawer content displaying navigation links
  const SideBarnavigationLinks = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleLeftDrawer(false)}
      onKeyDown={toggleLeftDrawer(false)}
    >
      <List>
        <ListItem>
          <Link to={`/EmployeeArea/${id}?employee_id=${employee_id}`}
          className="link"
          style={{
              textDecoration: 'none',    // Remove underline
              color: '#fff',             // White color to match Typography
              fontSize: '2rem',          // Adjust font size
              marginBottom: '2rem'
            }}>Personal Area</Link>
        </ListItem>
        <Divider sx={{ borderColor: '#fff', borderBottomWidth: 1 }} /> {/* Divider with white color */}
        <ListItem>
          <Link to={`/EmployeePersonalDetails/${id}?employee_id=${employee_id}`}
          className="link"
          style={{
              textDecoration: 'none',    // Remove underline
              color: '#fff',             // White color to match Typography
              fontSize: '2rem',          // Adjust font size
              marginBottom: '2rem'

            }}>Personal Details</Link>
        </ListItem>
        <Divider sx={{ borderColor: '#fff', borderBottomWidth: 1 }} /> {/* Divider with white color */}
        <ListItem>
          <Link to={`/AddingNewCustomer/${id}?employee_id=${employee_id}`} 
          style={{
            textDecoration: 'none',    // Remove underline
            color: '#fff',             // White color to match Typography
            fontSize: '2rem',          // Adjust font size
            marginBottom: '2rem'

          }}>Add New Customer</Link>
        </ListItem>
        <Divider sx={{ borderColor: '#fff', borderBottomWidth: 1 }} /> {/* Divider with white color */}
        <ListItem>
          <Link to={`/EmployeeInventoryUpdate/${id}?employee_id=${employee_id}`}
          style={{
            textDecoration: 'none',    // Remove underline
            color: '#fff',             // White color to match Typography
            fontSize: '2rem',          // Adjust font size
            marginBottom: '2rem'

          }}>Inventory</Link>
        </ListItem>
        <Divider sx={{ borderColor: '#fff', borderBottomWidth: 1 }} /> {/* Divider with white color */}
        <ListItem>
          <Link to={`/EmployeeCalendar/${id}?employee_id=${employee_id}`}
          style={{
            textDecoration: 'none',    // Remove underline
            color: '#fff',             // White color to match Typography
            fontSize: '2rem',          // Adjust font size
            marginBottom: '2rem'

          }}>
          Calendar</Link>
        </ListItem>
        <Divider sx={{ borderColor: '#fff', borderBottomWidth: 1 }} /> {/* Divider with white color */}
        <ListItem>
          <Link to={`/EmployeeContact/${id}?employee_id=${employee_id}`}
          style={{
            textDecoration: 'none',    // Remove underline
            color: '#fff',             // White color to match Typography
            fontSize: '2rem',          // Adjust font size
          }}>
          Contact Info</Link>
        </ListItem>
      </List>
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
      {/* AppBar with Toolbar */}
      
      <AppBar position="static">
        <Toolbar>
          {/* IconButton with Menu Icon that opens the Navigation Drawer */}
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
            Employee Menu
          </Typography>
          <Header/>
          {/* IconButton with Bell Icon that opens the Alerts Drawer */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="alerts"
            onClick={toggleRightDrawer(true)} // Opens the right drawer on click
          >
            <img src={Bell} alt="Bell" style={{ width: '72px', height: '72px' }} />
          </IconButton>
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
        {SideBarnavigationLinks}
      </Drawer>
      
      {/* Alerts Drawer (Right) */}
      <Drawer anchor="right" open={rightDrawerOpen} onClose={toggleRightDrawer(false)}>
        {alertsContent}
      </Drawer>
    </header>
  );
};

export default EmployeeSideBar;
