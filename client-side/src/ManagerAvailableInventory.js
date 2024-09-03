import React , { useState,useEffect }from 'react';
import Header from './header'; // Adjust the import path as needed
import ManagerSideBar from './ManagerSideBar'; // Adjust the import path as needed
import './ManagerAvailableInventory.css'; // Import the CSS file
import OfficeDepot from './photos/OfficeDepot.png';
import axios from 'axios';

// Sample inventory items

const ManagerAvailableInventory = () => {
    const [amounts, setAmounts] = useState({});
    const [message, setMessage]=useState('')

    const [inventoryItems,setInventoryItems] = useState([
        //   { name: 'Desktop Computer', quantity: 10, unitPrice: '$1,000', totalCost: '$10,000' },
        //   { name: 'Mouse', quantity: 20, unitPrice: '$10', totalCost: '$200' },
        //   { name: 'Pencils', quantity: 50, unitPrice: '$1', totalCost: '$50' },
        //   { name: 'Pens', quantity: 30, unitPrice: '$2', totalCost: '$60' },
        //   { name: 'Computer Monitors', quantity: 5, unitPrice: '$200', totalCost: '$1,000' },
        //   { name: 'Printer Toner', quantity: 10, unitPrice: '$50', totalCost: '$500' },
        //   { name: 'Printer', quantity: 2, unitPrice: '$150', totalCost: '$300' },
        //   { name: 'A4 Paper', quantity: 50, unitPrice: '$5', totalCost: '$250' },
        //   { name: 'Notepads', quantity: 15, unitPrice: '$3', totalCost: '$45' },
        //   { name: 'Highlighters', quantity: 20, unitPrice: '$2', totalCost: '$40' },
        //   { name: 'Ethernet Cables', quantity: 10, unitPrice: '$7', totalCost: '$70' }
        ]);
        useEffect(() => {
            console.log("I am in inventory");
            console.log(`http://localhost:3001/items/`);
            
            const fetchItems = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/items/`);
                    console.log(response.data.items);
        
                    setInventoryItems(response.data.items);
        
                    // Log the filtered alerts
        
                    console.log(inventoryItems)
                } catch (error) {
                    console.error('Error fetching assets:', error);
                }
            };
            fetchItems();
        
        }, []);
  // Function to handle button click, which uses the item name
  const handleButtonClick = (item) => {
    const amount = amounts[item.item_name] || 0;
    setInventoryItems(prevItems =>
        prevItems.map(upitem =>
            upitem.item_id === item.item_id
                ? { ...upitem, item_amount: parseInt(amount)+item.item_amount    }
                : upitem
        )
    );
    alert(`Ordering ${amount} of ${item.item_name}`); 
    const orderItems = async (e) => {
        console.log("i am in orderItems func")
        const updateRow = {
            item_id:item.item_id,
            item_name: item.item_name,
            item_amount: parseInt(amount)+item.item_amount,
            item_cost: item.item_cost
            // manager_id: manager_id
        };
        try {
            console.log(`http://localhost:3001/order-items/`)
            const response = await axios.put(`http://localhost:3001/order-items/`, updateRow, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("item amount added successfuly")
            const { message } = response.data;
            setMessage(message);
            // setError('')
        } catch (error) {
            console.error('Error during update:', error);
            // setError('Server error');
        }
    };
    orderItems();
  };
// Handle input change
    const handleInputChange = (itemName, event) => {
        console.log("input changed to:",event.target.value)
        setAmounts(prevAmounts => ({
            ...prevAmounts,
            [itemName]: event.target.value
        }));
    };
    
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
            <th>Action</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item, index) => (
            <tr key={index}>
              <td>{item.item_name}</td>
              <td>{item.item_amount}</td>
              <td>{item.item_cost}$</td>
              <td>{item.item_amount*item.item_cost}$</td>
              <td>
                    <input
                        type="number"
                        min="0"
                        onChange={(event) => handleInputChange(item.item_name, event)}
                        placeholder="Amount"
                    />
                    <button onClick={() => handleButtonClick(item)}>Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text">
        <p>
          Please note,<br />
          The supplier from which we order stock is "Office Depot".<br />
          For your convenience, below is a link to the company's website:<br />
          <a
            href="https://www.officedepot.co.il/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="OfficeDepot" src={OfficeDepot} alt="Office Depot" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default ManagerAvailableInventory;
