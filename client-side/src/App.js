import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Qa from './qa';
import Login from './Login';
import CustomerArea from "./CustomerArea";
import CustomerContact from "./CustomerContact";
import CustomerAssetsDetails from "./CustomerAssetsDetails";
import Contact from "./Contact";
import ManagerArea from "./ManagerArea";
import EmployeeArea from "./EmployeeArea";
import EmployeeInventoryUpdate from "./EmployeeInventoryUpdate";
import CustomerPersonalDetails from "./CustomerPersonalDetails";
import CustomerReports from "./CustomerReports";
import EmployeePersonalDetails from "./EmployeePersonalDetails";
import EmployeeContact from "./EmployeeContact";
import EmployeeCalendar from "./EmployeeCalendar";
import ManagerCalendar from "./ManagerCalendar";
import ManagerAvailableInventory from "./ManagerAvailableInventory";
import ManagerSurveyDistribution from "./ManagerSurveyDistribution";
import CustomerSurvey from "./CustomerSurvey";
import AddingNewCustomer from "./AddingNewCustomer";
import Stam from "./stam";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/qa" element={<Qa />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/CustomerArea/:id" element={<CustomerArea />} />
                <Route path="/CustomerPersonalDetails/:id" element={<CustomerPersonalDetails />} />
                <Route path="/CustomerAssetsDetails/:id" element={<CustomerAssetsDetails />} />
                <Route path="/CustomerContact/:id" element={<CustomerContact />} />
                <Route path="/CustomerReports/:id" element={<CustomerReports />} />
                <Route path="/EmployeeArea/:id" element={<EmployeeArea />} />
                <Route path="/EmployeePersonalDetails/:id" element={<EmployeePersonalDetails />} />
                <Route path="/EmployeeInventoryUpdate/:id" element={<EmployeeInventoryUpdate />} />
                <Route path="/EmployeeCalendar/:id" element={<EmployeeCalendar />} />
                <Route path="/EmployeeContact/:id" element={<EmployeeContact />} />
                <Route path="/ManagerArea/:id" element={<ManagerArea />} />
                <Route path="/ManagerCalendar/:id" element={<ManagerCalendar />} />
                <Route path="/ManagerAvailableInventory/:id" element={<ManagerAvailableInventory />} />
                <Route path="/ManagerSurveyDistribution/:id" element={<ManagerSurveyDistribution />} />
                <Route path="/CustomerSurvey/:id" element={<CustomerSurvey />} />
                <Route path="/AddingNewCustomer/:id" element={<AddingNewCustomer />} />
                <Route path="/stam/:id" element={<Stam />} />
            </Routes>
        </Router>
    );
};

export default App;
