import React from 'react';
import Header from './header'; // Adjust the import path as needed
import ManagerSideBar from './ManagerSideBar'; // Adjust the import path as needed
import './ManagerAvailableInventory.css'; // Import the CSS file
import OfficeDepot from "./photos/OfficeDepot.png";

const inventoryItems = [
    { name: 'Desktop Computer', quantity: 10, unitPrice: '$1,000', totalCost: '$10,000' },
    { name: 'Mouse', quantity: 20, unitPrice: '$10', totalCost: '$200' },
    { name: 'Pencils', quantity: 50, unitPrice: '$1', totalCost: '$50' },
    { name: 'Pens', quantity: 30, unitPrice: '$2', totalCost: '$60' },
    { name: 'Computer Monitors', quantity: 5, unitPrice: '$200', totalCost: '$1,000' },
    { name: 'Printer Toner', quantity: 10, unitPrice: '$50', totalCost: '$500' },
    { name: 'Printer', quantity: 2, unitPrice: '$150', totalCost: '$300' },
    { name: 'A4 Paper', quantity: 50, unitPrice: '$5', totalCost: '$250' },
    { name: 'Notepads', quantity: 15, unitPrice: '$3', totalCost: '$45' },
    { name: 'Highlighters', quantity: 20, unitPrice: '$2', totalCost: '$40' },
    { name: 'Ethernet Cables', quantity: 10, unitPrice: '$7', totalCost: '$70' }
];

const ManagerAvailableInventory = () => {
    return (
        <div className="managerInventory">
            <Header />
            <ManagerSideBar />
            <h2>Available Inventory Report:</h2>
            <table>
                <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Cost</th>
                </tr>
                </thead>
                <tbody>
                {inventoryItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.totalCost}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="text">
                <p>Please note,<br />
                    The supplier from which we order stock is "Office Depot".<br />
                    For your convenience, below is a link to the company's website:<br />
                    <a href="https://www.officedepot.co.il/" target="_blank" rel="noopener noreferrer">
                        <img className="OfficeDepot" src={OfficeDepot} alt="Office Depot"/>
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ManagerAvailableInventory;
