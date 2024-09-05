import React, { useState } from 'react';
import './EmployeeInventoryUpdate.css';
import Header from './header';
import EmployeeSideBar from './EmployeeSideBar';
import { useParams ,useLocation} from 'react-router-dom';
import axios from 'axios';
const EmployeeInventoryUpdate = () => {
    const today = new Date();
    console.log(today)
    const formattedDate = today.toISOString().split('T')[0];
    console.log(formattedDate)
    const {id}=useParams();
    const location = useLocation(); // Access the location object
    const [message, setMessage] = useState('');

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const employee_id = queryParams.get('employee_id'); 
    const [items, setItems] = useState([{
        item_name: 'Pencils',
        action_type: 'Update on exploitation',
        urgency: 'Low',
        amount: 0,
        date: formattedDate,
        employee_id: employee_id
    }]);

    const handleAddRow = () => {
        const newRow = {      
            item_name: 'Pencils',
            action_type: 'Update on exploitation',
            urgency: 'Low',
            amount: 0,
            date: formattedDate,
            employee_id: employee_id
        };
        setItems([...items, newRow]);
    };

    // const handleInputChange = (index, field, value) => {
    //     const newItems = [...items];
    //     newItems[index][field] = value;
    //     setItems(newItems);
    // };

    const handleSubmit =async (event) => {
        event.preventDefault();
        try {
            console.log("items list: ",items)
            console.log(`http://localhost:3001/EmployeeInventoryUpdate/${employee_id}`)
            const response = await axios.put(`http://localhost:3001/EmployeeInventoryUpdate/${employee_id}`, items, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Employee Inventory Update")
            const { message } = response.data;
            setMessage(message);
            // setError('')
        } catch (error) {
            console.error('Error during update:', error);
            // setError('Server error');
        }
        try {
            console.log("items order: ",items)
            console.log(`http://localhost:3001/order/`)
            const response = await axios.put(`http://localhost:3001/order/`, items, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("order sent")
            const { message } = response.data;
            setMessage(message);
            // setError('')
        } catch (error) {
            console.error('Error during update:', error);
            // setError('Server error');
        }
        alert('Form submitted');
    };

    return (
        <div className="EmployeeInventoryUpdate2">
            <Header />
            <EmployeeSideBar />
            <div className="InventoryForm2">
                <h90>Inventory Update Request Form</h90>
                <form onSubmit={handleSubmit} className="form2">
                    <table className="styled-table2">
                        <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Action Type</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Urgency</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <select name="item" value={item.item_name} onChange={(e) => 
                                            setItems(
                                                items.map((itm, idx) => 
                                                    idx === index 
                                                        ? { ...itm, item_name: e.target.value } 
                                                        : itm
                                                )
                                            )
                                        }>
                                        <option value="Desktop Computer">Desktop Computer</option>
                                        <option value="Mouse">Mouse</option>    
                                        <option value="Pencils">Pencils</option>
                                        <option value="Pens">Pens</option>
                                        <option value="Computer Monitors">Computer Monitors</option>
                                        <option value="Printer Toner">Printer Toner</option>
                                        <option value="Printer">Printer</option>
                                        <option value="A4 paper">A4 paper</option>
                                        <option value="Notepads">Notepads</option>
                                        <option value="Ethernet Cables">Ethernet Cables</option>
                                        <option value="Highlighters">Highlighters</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="action" value={item.action_type} onChange={(e) => 
                                            setItems(
                                                items.map((itm, idx) => 
                                                    idx === index 
                                                        ? { ...itm, action_type: e.target.value } 
                                                        : itm
                                                )
                                            )
                                        }>
                                        <option value="update">Update on exploitation</option>
                                        <option value="armor">Request to armor</option>
                                        <option value="out of stock">Product out of stock</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="date" name="date" value={item.date} onChange={(e) => 
                                            setItems(
                                                items.map((itm, idx) => 
                                                    idx === index 
                                                        ? { ...itm, date: e.target.value } 
                                                        : itm
                                                )
                                            )
                                        }/>
                                </td>
                                <td>
                                    <input type="number" name="quantity" value={item.amount}onChange={(e) => 
                                            setItems(
                                                items.map((itm, idx) => 
                                                    idx === index 
                                                        ? { ...itm, amount: e.target.value } 
                                                        : itm
                                                )
                                            )
                                        }/>
                                </td>
                                <td>
                                    <select name="priority" value={item.urgency} onChange={(e) => 
                                            setItems(
                                                items.map((itm, idx) => 
                                                    idx === index 
                                                        ? { ...itm, urgency: e.target.value } 
                                                        : itm
                                                )
                                            )
                                        }>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button  className={"AddRowBtn"} type="button" onClick={handleAddRow}>Add Another Row</button>
                    <input  className={"AddRowBtn"} type="submit" value="Submit Request" />
                </form>
            </div>
        </div>
    );
};

export default EmployeeInventoryUpdate;
