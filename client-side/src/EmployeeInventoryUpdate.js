import React, { useState } from 'react';
import './EmployeeInventoryUpdate.css';
import Header from './header';
import EmployeeSideBar from './EmployeeSideBar';

const EmployeeInventoryUpdate = () => {
    const [items, setItems] = useState([{
        item: 'item1',
        action: 'update',
        date: '',
        priority: 'low'
    }]);

    const handleAddRow = () => {
        const newRow = { item: 'item1', action: 'update', date: '', priority: 'low' };
        setItems([...items, newRow]);
    };

    const handleInputChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
                                    <select name="item" value={item.item} onChange={e => handleInputChange(index, 'item', e.target.value)}>
                                        <option value="item1">Pencils</option>
                                        <option value="item2">Pens</option>
                                        <option value="item3">Computer screens</option>
                                        <option value="item4">Printer toner</option>
                                        <option value="item5">A4 pages</option>
                                        <option value="item6">Writing blocks</option>
                                        <option value="item7">Notebooks</option>
                                        <option value="item8">Network cable</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="action" value={item.action} onChange={e => handleInputChange(index, 'action', e.target.value)}>
                                        <option value="update">Update on exploitation</option>
                                        <option value="armor">Request to armor</option>
                                        <option value="out of stock">Product out of stock</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="date" name="date" value={item.date} onChange={e => handleInputChange(index, 'date', e.target.value)} />
                                </td>
                                <td>
                                    <input type="number" name="quantity" value={item.quantity} onChange={e => handleInputChange(index, 'quantity', e.target.value)} />
                                </td>
                                <td>
                                    <select name="priority" value={item.priority} onChange={e => handleInputChange(index, 'priority', e.target.value)}>
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
