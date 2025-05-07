import React ,{useState} from 'react';
import { Link } from "react-router-dom";
import "./ManagerSideBar.css";
import { useParams ,useLocation} from 'react-router-dom';
import LOGO from './photos/Logo.jpeg';

import axios from 'axios';
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
const ManagerSideBar = () => {
    const {id}=useParams();
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(false); // State for the navigation drawer
    const theme = useTheme(); // Access the theme object

    const location = useLocation(); // Access the location object
    
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const manager_id = queryParams.get('manager_id');
    
        // Function to toggle the alerts drawer's open state
    // Function to toggle the navigation drawer's open state
    const toggleLeftDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        setLeftDrawerOpen(open);
    };

    const HeaderNavigationLinks = (
        <Box
        sx={{
        display: 'flex',         // Use flexbox for layout
        alignItems: 'center',    // Center items vertically
        justifyContent: 'space-between', // Distribute space between items
        width: '100%',           // Full width of the container
        padding: 1,              // Add padding if needed
        }}
        >
            <Link
            to="/"
            className="link"
            style={{
                textDecoration: 'none',    // Remove underline
                color: '#fff',             // White color to match Typography
                fontSize: '2rem',          // Adjust font size
                marginRight: '4px',       // Space between links
            }}
            >
            Home
            </Link>
            <Link
            to="/contact"
            className="link"
            style={{
                textDecoration: 'none',    // Remove underline
                color: '#fff',             // White color to match Typography
                fontSize: '2rem',          // Adjust font size
            }}
            >
            Contact
            </Link>
            <Link
            to="/qa"
            className="link"
            style={{
                textDecoration: 'none',    // Remove underline
                color: '#fff',             // White color to match Typography
                fontSize: '2rem',          // Adjust font size
            }}
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
            >
            Logout
            </Link>
      </Box>
      );
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
              <Link to={`/ManagerArea/${id}?manager_id=${manager_id}`}
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
              <Link to={`/ManagerAvailableInventory/${id}?manager_id=${manager_id}`}
              style={{
                textDecoration: 'none',    // Remove underline
                color: '#fff',             // White color to match Typography
                fontSize: '2rem',          // Adjust font size
                marginBottom: '2rem'
    
              }}>Inventory: Available & Order</Link>
            </ListItem>
            <Divider sx={{ borderColor: '#fff', borderBottomWidth: 1 }} /> {/* Divider with white color */}
            <ListItem>
              <Link to={`/ManagerCalendar/${id}?manager_id=${manager_id}`}
              style={{
                textDecoration: 'none',    // Remove underline
                color: '#fff',             // White color to match Typography
                fontSize: '2rem',          // Adjust font size
                marginBottom: '2rem'
    
              }}>
              Tasks & Calendar</Link>
            </ListItem>
            <Divider sx={{ borderColor: '#fff', borderBottomWidth: 1 }} /> {/* Divider with white color */}
            <ListItem>
              <Link to={`/ManagerSurveyDistribution/${id}?manager_id=${manager_id}`}
              style={{
                textDecoration: 'none',    // Remove underline
                color: '#fff',             // White color to match Typography
                fontSize: '2rem',          // Adjust font size
              }}>
              Survey distribution</Link>
            </ListItem>
          </List>
        </Box>
      );

    return (
        <header>
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
                    Manager Menu
                </Typography>
                {HeaderNavigationLinks}
                
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
        </header>
    );
};
export default ManagerSideBar;