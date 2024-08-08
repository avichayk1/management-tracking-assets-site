import React, { useState } from 'react';
import './EmployeeInventoryUpdate.css';
import Header from './header';
import EmployeeSideBar from './EmployeeSideBar';

const Stam = () => {
    const [items, setItems] = useState([{
        item: 'item1',
        action: 'update',
        date: '',
        priority: 'low'
    }]);

    const handleAddRow2 = () => {
        const newRow = { item: 'item1', action: 'update', date: '', priority: 'low' };
        setItems([...items, newRow]);
    };

    const handleInputChange2 = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        alert('Form submitted');
    };

    return (
        <div className="EmployeeInventoryUpdate2">
            <Header />
            <EmployeeSideBar />
            <div className="InventoryForm2">  {/* Corrected class name */}
                <h90>Inventory update request form</h90> {/* Corrected tag name from h12 to h1 */}
                <form onSubmit={handleSubmit2}>
                    <table className="styled-table2">
                        <thead>
                        <tr>
                            <th>Item name</th>
                            <th>Action type</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Urgency</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <select name="item" value={item.item} onChange={e => handleInputChange2(index, 'item', e.target.value)}>
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
                                    <select name="action" value={item.action} onChange={e => handleInputChange2(index, 'action', e.target.value)}>
                                        <option value="update">Update on exploitation</option>
                                        <option value="armor">Request to armor</option>
                                        <option value="out of stock">Product out of stock</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="date" name="date" value={item.date} onChange={e => handleInputChange2(index, 'date', e.target.value)} />
                                </td>
                                <td>
                                    <input type="number" name="quantity" value={item.quantity} onChange={e => handleInputChange2(index, 'quantity', e.target.value)} />
                                </td>
                                <td>
                                    <input type="radio" id={`lowPriority-${index}`} name={`priority-${index}`} value="low" checked={item.priority === 'low'} onChange={e => handleInputChange2(index, 'priority', e.target.value)} />
                                    <label htmlFor={`lowPriority-${index}`}>Low</label>
                                    <input type="radio" id={`mediumPriority-${index}`} name={`priority-${index}`} value="medium" checked={item.priority === 'medium'} onChange={e => handleInputChange2(index, 'priority', e.target.value)} />
                                    <label htmlFor={`mediumPriority-${index}`}>Medium</label>
                                    <input type="radio" id={`highPriority-${index}`} name={`priority-${index}`} value="high" checked={item.priority === 'high'} onChange={e => handleInputChange2(index, 'priority', e.target.value)} />
                                    <label htmlFor={`highPriority-${index}`}>High</label>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button type="button" onClick={handleAddRow2}>Add another row</button>
                    <input type="submit" value="Submit Invitation" />
                </form>
            </div>
        </div>
    );
};

export default Stam;
